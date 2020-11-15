import {Component, ComponentRef, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../shared/services/user.service';
import {StorageService} from '../shared/services/storage.service';
import {MenuController, PopoverController} from '@ionic/angular';
import {ChangeImageComponent} from '../auth/components/change-image/change-image.component';
import {UserChangePasswordComponent} from '../auth/components/user-change-password/user-change-password.component';
import {NgClass} from '@angular/common';

@Component({
    selector: 'app-tab1',
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {
    user: User;
    isLogged: boolean;

    constructor(private userService: UserService,
                private menu: MenuController,
                public popoverController: PopoverController,
                private storageService: StorageService) {
    }

    ngOnInit(): void {
        this.userService.isLogged.subscribe(data => this.isLogged = data);
        this.userService.currentUser.subscribe(user => {
            console.log(user);
            if (!this.isLogged) {
                this.storageService.getUser().then(data => {
                    this.user = data;
                    this.userService.changeIsLogged();
                });
            } else {
                this.user = user;
            }
        });
    }

    openFirst() {
        this.menu.enable(true, 'first');
        this.menu.open('first');
    }

    async changeImage() {
        await this.showPopOver(ChangeImageComponent);
    }

    async changePassword() {
        await this.showPopOver(UserChangePasswordComponent);

    }

    async showPopOver(component) {
        const popover = await this.popoverController.create({
            component: component,
            cssClass: 'my-custom-class',
            translucent: true,
            componentProps: {
                email: this.user.userEmail
            }
        });
        return await popover.present();
    }
}
