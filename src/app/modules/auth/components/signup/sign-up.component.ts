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
            userName: ['', [Validators.required]],
            userLastName: ['', [Validators.required]],
            userNickName: ['', [/*Validators.required*/]],
            userEmail: ['', [Validators.required]],
            userPassword: ['', [Validators.required]],
            userConfirmPassword: ['', [/*Validators.required*/]],
            userAge: ['', [Validators.min(16)]],
        });
    }

    onSubmit(formValue: any) {
      this.presentLoading();
        this.authService.register(formValue).subscribe(data => {
          this.loadingController.dismiss();
          this.presentAlert();
                console.log(data);
            },
            error => {
          console.log(error)
              this.loadingController.dismiss();

            });
    }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'User was successfully registered',
    });
    await alert.present();
    setTimeout(() => {
      this.dismissAlert();
    }, 1500);
  }

  async dismissAlert() {
    await this.alertCtrl.dismiss();
    await this.router.navigateByUrl('login')
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
