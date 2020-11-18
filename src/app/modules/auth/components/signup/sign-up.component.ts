import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {AlertController, LoadingController, PopoverController} from '@ionic/angular';
import {UserChangePasswordComponent} from '../user-change-password/user-change-password.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
    signUpForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private alertCtrl: AlertController,
                public loadingController: LoadingController,
                private router: Router,
                private authService: AuthService) {
    }



    ngOnInit() {
        this.signUpForm = this.formBuilder.group({
            userName: ['Ihor', [Validators.required]],
            userLastName: ['Denys', [Validators.required]],
            userNickName: ['Pifon', [/*Validators.required*/]],
            userEmail: ['ihor04@gmail.com', [Validators.required]],
            userPassword: ['Superuser123', [Validators.required]],
            userConfirmPassword: ['Superuser123', [/*Validators.required*/]],
            userAge: ['22', /*[Validators.min(16)]*/],
        });
    }

    onSubmit(formValue: any) {
      this.presentLoading();
        this.authService.register(formValue).subscribe(data => {
          this.loadingController.dismiss();
          this.presentAlert('User was successfully registered', true);
                setTimeout(() => {
                    this.alertCtrl.dismiss();
                }, 2000)
                this.router.navigateByUrl('login')
            },
            error => {
              this.loadingController.dismiss();
                this.presentAlert(error.error.errors[0].defaultMessage, false);
                setTimeout(() => {
                    this.alertCtrl.dismiss();
                }, 2000)
            });
    }

  async presentAlert(message: string, success: boolean) {
    const alert = await this.alertCtrl.create({
      header: message,
        cssClass: success ? 'myAlertSuccess' : 'myAlertFailure'
    });
    await alert.present();
    setTimeout(() => {
      this.dismissAlert();
    }, 1500);
  }

  async dismissAlert() {

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner: 'bubbles',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  //  GETTERS
  get userName() {
    return this.signUpForm.get('userName');
  }

  get userLastName() {
    return this.signUpForm.get('userLastName');
  }

  get userNickName() {
    return this.signUpForm.get('userNickName');
  }

  get userEmail() {
    return this.signUpForm.get('userEmail');
  }

  get userPassword() {
    return this.signUpForm.get('userPassword');
  }

  get userConfirmPassword() {
    return this.signUpForm.get('userConfirmPassword');
  }

  get userAge() {
    return this.signUpForm.get('userAge');
  }
}
