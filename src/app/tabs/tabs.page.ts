import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '../modules/shared/services/token.service';
import {UserService} from '../modules/shared/services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  isLogin: boolean;
  constructor(private router: Router,
              private userService: UserService,
              private tokenService: TokenService) {}

    login() {
      if (this.isLogin) {
        this.tokenService.removeTokens();
        this.router.navigateByUrl('tabs/login').then(() => window.location.reload());
      }
      this.router.navigateByUrl('tabs/login');
    }
  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      console.log(user);
      this.isLogin = user.isLogged;
    })
  }
}
