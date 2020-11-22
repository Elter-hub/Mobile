import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../../../../models/cart';
import {MenuController, ModalController, NavParams, PopoverController, ToastController} from '@ionic/angular';
import {UserService} from '../../../shared/services/user.service';
import {StorageService} from '../../../shared/services/storage.service';
import {User} from '../../../../models/user';
import {CartService} from '../../services/cart.service';
import {AddItemPopOverComponent} from '../add-item-pop-over/add-item-pop-over.component';
import {ItemService} from '../../services/item.service';

@Component({
    selector: 'app-one-item',
    templateUrl: './one-item.component.html',
    styleUrls: ['./one-item.component.scss'],
})
export class OneItemComponent implements OnInit {
    @Input() item: Item;
    user: User;
    isAdmin: boolean;
    displayMenu = false;

    constructor(private router: Router,
                private navsParam: NavParams,
                private userService: UserService,
                private menu: MenuController,
                private cartService: CartService,
                private popoverController: PopoverController,
                private itemService: ItemService,
                private storageService: StorageService,
                public toastController: ToastController,
                public modalController: ModalController) {
    }

    ngOnInit() {
        this.item = this.navsParam.get('item');
        this.userService.currentUser.subscribe(user => {
            this.user = user;
            if (this.user.roles.includes('ROLE_ADMIN')) {
                this.isAdmin = true;
            }
        });
        console.log(this.user);

    }

    dismiss() {
        this.modalController.dismiss({
            'dismissed': true
        });
    }

    addToCard(item: Item) {
        this.cartService.addItemToCart(this.user.userEmail, item.itemId, true).subscribe(data => {
            this.presentToast('Item was successively added to your cart🛒');
            this.user.cart.items = data.items.sort((first, second) => first.itemId > second.itemId ? 1 : -1);
            this.storageService.saveUser(this.user);
            this.userService.userSubject.next(this.user);
        }, error => {
            console.log(error);
        });
    }

    async presentToast(message: string, isDanger?: boolean) {
        const toast = await this.toastController.create({
            message: message,
            duration: 500,
            color: !isDanger ? 'success' : 'danger'
        });
        toast.present();
    }

    async showPopOver(item: Item, message: string, buttonName: string) {
        const popover = await this.popoverController.create({
            component: AddItemPopOverComponent,
            cssClass: 'my-custom-class',
            translucent: true,
            componentProps: {
                item: item,
                message: message,
                buttonName: buttonName
            }
        });
        return await popover.present();
    }

    showItemOption() {
        if (!this.displayMenu) {
            this.displayMenu = !this.displayMenu;
            this.menu.enable(true, 'itemMenu');
            this.menu.open('itemMenu');
        } else {
            this.displayMenu = !this.displayMenu;
            this.menu.close();
        }

    }

    addItems(item: Item) {
        this.showPopOver(item, 'How much?', 'Add');
    }

    promote(item: Item) {
        this.showPopOver(item, 'New Price', 'Confirm');
    }

    cancelPromotion(item: Item) {
        this.itemService.cancelPromotion(item).subscribe(data => {
            this.item.price = data.price;
            this.item.discount = null;
            this.presentToast('Promotion is canceled');
        });
    }

    async deleteItem(item: Item) {
        await this.dismiss();
        await this.presentToast('Item is deleted', true);
        await this.router.navigateByUrl('tabs/profile')
        await this.itemService.deleteItem(item).subscribe(data => {
            this.item = data;
        });
    }
}
