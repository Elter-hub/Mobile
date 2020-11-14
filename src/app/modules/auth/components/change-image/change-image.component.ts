import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, NavParams, PopoverController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {UserActionService} from '../../services/user-action.service';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-change-image',
  templateUrl: './change-image.component.html',
  styleUrls: ['./change-image.component.scss'],
})
export class ChangeImageComponent implements OnInit {
  changeImageForm: FormGroup;
  userEmail: string;
  constructor(private formBuilder: FormBuilder,
              private userActionService: UserActionService,
              private popoverCtrl: PopoverController,
              private alertCtrl: AlertController,
              private userService: UserService,
              private navParams: NavParams) { }

  ngOnInit() {
    this.changeImageForm = this.formBuilder.group({
      url: ['', [Validators.required]],
    });
  }

  onSubmit(value: any) {
    this.userActionService.changeImageUrl(value.url, this.navParams.get('email')).subscribe(data => {
      let user = this.userService.userSubject.getValue();
      user.imageUrl = value.url;
      this.userService.userSubject.next(user);
      console.log(data);
    }, error => console.log(error))
    this.dismissPopOver();
    this.presentAlert();
  }

  async dismissPopOver() {
    await this.popoverCtrl.dismiss();
  }

  async dismissAlert() {
    await this.alertCtrl.dismiss();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Image was successfully changed',
      buttons: ['OK']
    });
    await alert.present();
    setTimeout(() => {
      this.dismissAlert()
    }, 1500)
  }

}
