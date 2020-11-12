import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '../modules/shared/services/storage.service';
import {UserService} from '../modules/shared/services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  isLogin: boolean;
  showTabsIcons: boolean;
  constructor(private router: Router,
              private userService: UserService,
              private storageService: StorageService,
              private tokenService: StorageService) {}

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
  ngOnInit(): void {
    this.userService.isLogged.subscribe(data => {
      console.log(data);
      this.isLogin = data;
      this.showTabsIcons = data;
    })
  }
}
