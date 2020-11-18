import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {StorageService} from '../../../shared/services/storage.service';
import {UserService} from '../../../shared/services/user.service';
import {log} from 'util';
import {AlertController, LoadingController, PopoverController, ToastController} from '@ionic/angular';
import {User} from '../../../../models/user';
import {ConfirmEmailComponent} from '../confirm-email/confirm-email.component';
import set = Reflect.set;


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginForm: FormGroup;
    newPasswordForm: FormGroup;
    userForgotPasswordForm: FormGroup;

    isLoggedIn = false;
    isLoginFailed: boolean;
    errorMessage = '';
    roles: string[] = [];
    showFields: boolean;
    showTokenConfirmation: boolean;
    successMessage: string;
    user: User;
    showTokenEmail: boolean;
    showSuccessMessage:boolean;
    showFailureMessage:boolean;
    showEmailForm = true;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private popoverController: PopoverController,
                private toastController: ToastController,
                private authService: AuthService,
                private userService: UserService,
                private storageService: StorageService,
                private loginService: AuthService) {
    }

    get userPassword() {
        return this.loginForm.get('userPassword');
    }

    get userEmail() {
        return this.loginForm.get('userEmail');
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            userEmail: ['ihor04@gmail.com', [Validators.required]],
            userPassword: ['Superuser123', [Validators.required]],
        });

        this.userForgotPasswordForm = this.formBuilder.group({
            userEmail: ['ihor04@gmail.com', [Validators.required]],
        });

        this.newPasswordForm = this.formBuilder.group({
            token: ['', [Validators.required]],
            newPassword: ['Qaz12345', [Validators.required]],
            confirmNewPassword: ['Qaz12345', [Validators.required]],
        });
    }

    onSubmit() {
        this.presentLoading();
        this.loginService.login(this.loginForm.value).subscribe(
            data => {
                this.loadingCtrl.dismiss();
                this.storageService.saveTokens(data.accessToken, data.refreshToken);
                this.user = this.userService.createUser(data.id, data.imageUrl, data.cart,
                    data.roles, data.userAge, data.userEmail, data.userLastName, data.userName, data.userNickName, data.isEnabled);
                this.userService.userSubject.next(this.user)
                this.storageService.saveUser(this.user);
                setTimeout(() => {
                    if (!data.isEnabled) {
                        this.showPopOver()
                    }else {
                        this.router.navigate(['tabs/profile']);
                    }
                }, 1000);
            },
            error => {
                this.isLoginFailed = true;
                this.loadingCtrl.dismiss();
                this.presentAlert()
                this.errorMessage = error.error.message;
                this.isLoginFailed = true;
            }
        );
    }

    forgotPassword(value: any) {
        this.presentLoading();
        this.authService.forgotPassword(value.userEmail).subscribe(data => {
                this.loadingCtrl.dismiss();
                this.successMessage = data.message;
                this.showTokenEmail = true;
                this.showSuccessMessage = true;
                this.showEmailForm = false;

                setTimeout(() => {
                    this.showSuccessMessage = false;
                }, 3000)
            },
            error => {
                this.loadingCtrl.dismiss();
                this.errorMessage = error.error.message;
                this.showFailureMessage = true;
                setTimeout(() => {
                    this.showFailureMessage = false;
                }, 3000)
                console.log(error.error.message);
            });
    }

    async presentLoading() {
        const loading = await this.loadingCtrl.create({
            cssClass: 'my-custom-class',
            message: 'Please wait...',
            spinner: 'bubbles',
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
    }

    async dismissAlert() {
        await this.alertCtrl.dismiss();
    }

    async presentAlert() {
        const alert = await this.alertCtrl.create({
            header: 'Failure!! \nYour email or password is incorrect',
            buttons: ['OK'],
            cssClass: 'myAlertFailure'
        });
        await alert.present();
        setTimeout(() => {
            this.dismissAlert()
        }, 1500)
    }

    async showPopOver() {
        const popover = await this.popoverController.create({
            component: ConfirmEmailComponent,
        });
        return await popover.present();
    }

    setNewPassword(value: any) {
        this.presentLoading()
        this.authService.changePassword(value.newPassword, value.token, this.userForgotPasswordForm.get('userEmail').value).subscribe(data => {
            this.loadingCtrl.dismiss();
            this.presentToast()
            setTimeout(() => {
                this.showTokenEmail = false;
                this.showFields = false;
            }, 2000)

        }, error => {
            console.log(error);
            this.loadingCtrl.dismiss();
        })
        return false;
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Password was successively changed',
            duration: 1500,
            color: 'success'
        });
        toast.present();
    }
}
