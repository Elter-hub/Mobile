import { Component } from '@angular/core';
import {User} from '../../models/user';

@Component({
  selector: 'app-tab1',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  user: User;
  constructor() {}

}
