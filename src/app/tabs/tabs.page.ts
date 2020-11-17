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

    constructor(private router: Router,
                private userService: UserService,
                private storageService: StorageService,
                private tokenService: StorageService) {
    }

    ngOnInit(): void {
        this.userService.userSubject.subscribe(user => {
            console.log(user);
            if (user !== {}) {
                console.log('🥰');
                this.user = user;
                this.isLogin = true;
                this.showTabsIcons = true;
                this.storageService.saveUser(user)
            } else {
                console.log('🥶');
                this.storageService.getUser().then(userFromStorage => {
                    console.log('Tabs INIT FROM STORAGE');
                    console.log(userFromStorage);
                    this.user = userFromStorage;
                    if (userFromStorage.userEmail) {
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

    //TODO fix authentication squirell

}
