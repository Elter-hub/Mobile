import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {StorageService} from '../../../shared/services/storage.service';
import {UserService} from '../../../shared/services/user.service';
import {log} from 'util';
import {AlertController, LoadingController} from '@ionic/angular';
import {User} from '../../../../models/user';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginForm: FormGroup;
    isLoggedIn = false;
    isLoginFailed: boolean;
    errorMessage = '';
    roles: string[] = [];
    showFields: boolean;
    showTokenConfirmation: boolean;
    userForgotPasswordForm: FormGroup;
    successMessage: string;
    user: User;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
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
            userEmail: ['', [Validators.required]],
            // userPassword: ['', [Validators.required]],
            // userConfirmPassword: ['', [Validators.required]],
        });
    }

    onSubmit() {
        this.presentLoading();
        this.loginService.login(this.loginForm.value).subscribe(
            data => {
                console.log("SUBSCRIBE");
                this.loadingCtrl.dismiss();
                console.log(data);
                this.storageService.saveTokens(data.accessToken, data.refreshToken);
                this.user = this.userService.createUser(data.id, data.imageUrl, data.cart,
                    data.roles, data.userAge, data.userEmail, data.userLastName, data.userName, data.userNickName);
                console.log(this.user);
                this.userService.userSubject.next(this.user)
                this.storageService.saveUser(this.user);
                setTimeout(() => {
                    this.router.navigate(['tabs/profile']);
                }, 1000);
            },
            error => {
                console.log("ERROR");
                console.log(error);
                this.isLoginFailed = true;
                this.loadingCtrl.dismiss();
                this.presentAlert()
                this.errorMessage = error.error.message;
                this.isLoginFailed = true;
            }
        );
    }

    forgotPassword(value: any) {
        this.authService.forgotPassword(value.userEmail).subscribe(data => {
                this.successMessage = data.message;
                console.log(data);
            },
            error => {

                this.errorMessage = error.error.message;
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
        console.log('Loading dismissed!');
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
}
