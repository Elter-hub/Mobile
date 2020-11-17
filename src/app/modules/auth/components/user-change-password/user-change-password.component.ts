import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserActionService} from '../../services/user-action.service';
import {AlertController, NavParams, PopoverController} from '@ionic/angular';
import {UserService} from '../../../shared/services/user.service';

@Component({
    selector: 'app-user-change-password',
    templateUrl: './user-change-password.component.html',
    styleUrls: ['./user-change-password.component.scss'],
})
export class UserChangePasswordComponent implements OnInit {
    changePasswordForm: FormGroup;
    confirmationForm: FormGroup;
    userEmail: string;
    showConfirmationForm: boolean;
    showSpinner: boolean;

    constructor(private formBuilder: FormBuilder,
                private userActionService: UserActionService,
                private popoverCtrl: PopoverController,
                private alertCtrl: AlertController,
                private userService: UserService,
                private navParams: NavParams) {
    }

    ngOnInit() {
        this.changePasswordForm = this.formBuilder.group({
            oldPassword: ['', [Validators.required]],
            newPassword: ['', [Validators.required]],
            confirmNewPassword: ['', [Validators.required]],
        });
        this.confirmationForm = this.formBuilder.group({
            confirm: ['', [Validators.required]],
        });
    }

    userChangePassword() {
        this.showSpinner = true;
        this.userActionService.userChangePassword(this.navParams.get('email'),
            this.changePasswordForm.value.oldPassword,
            this.changePasswordForm.value.newPassword)
            .subscribe(data => {
                    this.showSpinner = false;
                    this.showConfirmationForm = true;
                    console.log(data);
                    console.log('🥰');
                },
                error => {
                    this.showSpinner = false;
                    this.presentAlert(error.error.message, true)
                    console.log('🥶');
                    console.log(error);
                });
        return false;
    }

    confirmPasswordChange() {
        this.userActionService.userConfirmPasswordChanges(this.navParams.get('email'),
            this.confirmationForm.value.confirm)
            .subscribe(data => {
                console.log(data);
                this.dismissPopOver();
                this.presentAlert('Password was successfully changed', true);
            }, error => {
                console.log(error);
                this.dismissPopOver();
                this.presentAlert(error.error.message, false);
            });
    }

    async dismissPopOver() {
        await this.popoverCtrl.dismiss();
    }

    async dismissAlert() {
        await this.alertCtrl.dismiss();
    }

    async presentAlert(message: string, success?: boolean) {
        const alert = await this.alertCtrl.create({
            header: message,
            buttons: ['OK'],
            cssClass: success ? 'myAlertSuccess': 'myAlertFailure'
        });
        await alert.present();
        setTimeout(() => {
            this.dismissAlert();
        }, 1500);
    }
}
