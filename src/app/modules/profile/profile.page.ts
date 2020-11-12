import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../shared/services/user.service';
import {StorageService} from '../shared/services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit{
  user: User;
  isLogged: boolean;
  constructor(private userService: UserService,
              private storageService: StorageService) {}

  ngOnInit(): void {
    this.userService.isLogged.subscribe(data => this.isLogged = data)
    this.userService.currentUser.subscribe(user => {
      console.log(user);
      if (!this.isLogged){
        this.storageService.getUser().then(data => {
          this.user = data
          this.userService.changeIsLogged();
          console.log(data);
        })
      }else {
        this.user = user;
      }
    })
  }

}
