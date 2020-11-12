import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit{

  user: User;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      console.log(user);
      this.user = user;
    })
  }

}
