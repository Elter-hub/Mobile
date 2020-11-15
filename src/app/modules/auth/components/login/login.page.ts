import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {StorageService} from '../../../shared/services/storage.service';
import {UserService} from '../../../shared/services/user.service';
import {log} from 'util';
import {LoadingController} from '@ionic/angular';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginForm: FormGroup;
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
    showFields: boolean;
    showTokenConfirmation: boolean;
    userForgotPasswordForm: FormGroup;
    successMessage: string;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private loadingController: LoadingController,
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
            userEmail: ['', [Validators.required]],
            userPassword: ['', [Validators.required]],
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
                this.loadingController.dismiss();

                console.log(data);
                this.isLoginFailed = false;
                this.storageService.saveTokens(data.accessToken, data.refreshToken);
                let user = this.userService.createUser(data.id, data.imageUrl, data.cart,
                    data.roles, data.userAge, data.userEmail, data.userLastName, data.userName, data.userNickName);
                this.storageService.saveUser(user);
                this.userService.changeIsLogged();
                setTimeout(() => {
                    this.router.navigate(['tabs/profile']);
                }, 1000);
            },
            error => {
                console.log(error);
                this.loadingController.dismiss();

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
        const loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Please wait...',
            spinner: 'bubbles',
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
        console.log('Loading dismissed!');
    }
}
