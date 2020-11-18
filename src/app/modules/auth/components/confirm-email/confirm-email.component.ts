import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../../shared/services/user.service';
import {StorageService} from '../../../shared/services/storage.service';
import {PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
})
export class ConfirmEmailComponent implements OnInit {
  private confirmEmailForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private popoverCtrl: PopoverController,
              private storageService: StorageService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.confirmEmailForm = this.formBuilder.group({
      token: ['', [Validators.required]],
    });
  }

  async confirmEmail(value: any) {
    await this.authService.confirmEmail(value.token).subscribe(data => {
      let user = this.userService.userSubject.getValue();
      user.isEnabled = true;
      this.storageService.saveUser(user);
      this.userService.userSubject.next(user);
      this.dismissPopOver();
      this.router.navigateByUrl('tabs/profile')

    }, error => {
      console.log(error);
    })
  }

  async dismissPopOver() {
    await this.popoverCtrl.dismiss();
  }
}
