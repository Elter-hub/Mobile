import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {Item} from '../../models/cart';
import {StorageService} from '../shared/services/storage.service';
import {CartService} from '../products/services/cart.service';
import {User} from '../../models/user';
import {ModalController} from '@ionic/angular';
import {PaymentFormComponent} from './components/payment-form/payment-form.component';

declare var Stripe

@Component({
    selector: 'app-tab2',
    templateUrl: 'cart.page.html',
    styleUrls: ['cart.page.scss']
})
export class CartPage implements OnInit {
    cart: Item[];
    user: User;
    sum = 0;
    userEmail: string;

    constructor(private userService: UserService,
                private itemService: CartService,
                public modalController: ModalController,
                private storageService: StorageService ) {
    }

    ngOnInit(): void {
        this.userService.currentUser.subscribe(userSubject => {
            if (Object.keys(this.userService.userSubject.getValue()).length !== 0){
                this.user = userSubject;
                this.userEmail = userSubject.userEmail;
                this.cart = userSubject.cart.items.sort((first, second) => first.itemId > second.itemId ? 1 : -1);
                this.sum = 0;
                this.countSum();
            }else {
                this.storageService.getUser().then(userFromStorage => {
                    this.cart = userFromStorage.cart.items.sort((first, second) => first.itemId > second.itemId ? 1 : -1)
                    this.userEmail = userFromStorage.userEmail;
                    this.user = userFromStorage;
                    this.userService.userSubject.next(this.user);
                    this.sum = 0;
                    this.countSum();
                })
            }
        });
    }

    oneMoreItem(item: Item, addOrRemove: boolean) {
        this.itemService.addItemToCart(this.userEmail, item.itemId, addOrRemove).subscribe(data => {
            this.cart = data.items.sort((first, second) => first.itemId > second.itemId ? 1 : -1)
            this.user.cart.items = this.cart
            this.storageService.saveUser(this.user)
            this.userService.userSubject.next(this.user);
            this.sum = 0;
            this.countSum();
        }, error => {
            console.log(error);
        })
    }

    removeItemFromCart(itemId: number){
        this.itemService.removeItemFromCart(this.userEmail, itemId).subscribe(data => {
            this.cart = data.items.sort((first, second) => first.itemId > second.itemId ? 1 : -1)
            this.user.cart.items = this.cart
            this.storageService.saveUser(this.user)
            this.userService.userSubject.next(this.user);
            this.sum = 0;
            this.countSum();
        }, error => {
            console.log(error);
        })
    }

    async buyItems() {
        const modal = await this.modalController.create({
            component: PaymentFormComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                'amount': this.sum
            }
        });
        return await modal.present();
    }

    countSum() {
        this.cart.forEach(item => {
            if (!item.discount){
                this.sum += item.price * item.addedToCart
            }
            if (item.discount){
                this.sum += item.newPrice * item.addedToCart
            }
        })
    }
}
