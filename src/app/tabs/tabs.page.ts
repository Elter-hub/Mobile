import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '../modules/shared/services/storage.service';
import {UserService} from '../modules/shared/services/user.service';
import {User} from '../models/user';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
    isLogin: boolean;
    showTabsIcons: boolean;
    user: User;
    isAdmin: boolean;

    constructor(private router: Router,
                private userService: UserService,
                private storageService: StorageService,
                private tokenService: StorageService) {
    }

    ngOnInit(): void {

        this.userService.userSubject.subscribe(user => {
            if (Object.keys(this.userService.userSubject.getValue()).length !== 0) {
                this.user = user;
                if(user.roles.includes('ROLE_ADMIN')){
                    this.isAdmin = true;
                }
                this.isLogin = true;
                this.showTabsIcons = true;
                this.storageService.saveUser(user)
            } else {
                this.storageService.getUser().then(userFromStorage => {
                    this.user = userFromStorage;
                    if (userFromStorage.userEmail) {
                        if(userFromStorage.roles.includes('ROLE_ADMIN')){
                            this.isAdmin = true;
                        }
                        this.isLogin = true;
                        this.showTabsIcons = true;
                        this.user = userFromStorage;
                        this.storageService.saveUser(userFromStorage)
                    } else {
                        this.isLogin = false;
                        this.showTabsIcons = false;
                    }
                });
            }
        }, error => {
            this.isLogin = false;
            this.showTabsIcons = false;
        });
    }

    login() {
        if (this.isLogin) {
            this.tokenService.removeTokens();
            this.userService.changeIsLogged();
            this.router.navigateByUrl('login').then(() => window.location.reload());
        } else {
            this.userService.changeIsLogged();
            this.router.navigateByUrl('login');
        }

    }

    showAnalytic() {
        console.log(this.user);
    }
}
