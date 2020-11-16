import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {Item} from '../../models/cart';
import {StorageService} from '../shared/services/storage.service';
import {isEmpty} from 'rxjs/operators';
import {ItemService} from '../products/services/item.service';
import {User} from '../../models/user';

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
                private itemService: ItemService,
                private storageService: StorageService ) {
    }

    ngOnInit(): void {
        this.userService.currentUser.subscribe(userSubject => {
            if (userSubject == {}){
                console.log('IF INIT FROM STORAGE');
                this.user = userSubject;
                console.log(userSubject);
                this.userEmail = userSubject.userEmail;
                console.log(this.user.cart.items);
                this.cart = userSubject.cart.items.sort((first, second) => first.itemId > second.itemId ? 1 : -1);
                this.sum = 0;
                userSubject.cart.items.forEach(item => this.sum += item.price * item.addedToCart)
            }else {
                console.log('ELSE INIT ');
                this.storageService.getUser().then(userFromStorage => {
                    this.cart = userFromStorage.cart.items.sort((first, second) => first.itemId > second.itemId ? 1 : -1)
                    this.userEmail = userFromStorage.userEmail;
                    this.user = userFromStorage;
                    this.sum = 0;
                    this.cart.forEach(item => this.sum += item.price * item.addedToCart)
                })
            }
        });
    }

    remove(item: Item) {

    }

    oneMoreItem(item: Item, addOrRemove: boolean) {
        this.itemService.addItemToCart(this.userEmail, item.itemId, addOrRemove).subscribe(data => {
            console.log(data);
            console.log('🥰');
            this.cart = data.items.sort((first, second) => first.itemId > second.itemId ? 1 : -1)
            console.log('🥰🥰');

            this.user.cart.items = this.cart
            console.log('🥰🥰🥰');
            this.userService.userSubject.next(this.user);

            this.storageService.saveUser(this.user)
            this.sum = 0;
            this.cart.forEach(item => this.sum += item.price * item.addedToCart)

        }, error => {
            console.log(error);
        })
    }

    removeItemFromCart(itemId: number){
        this.itemService.removeItemFromCart(this.userEmail, itemId).subscribe(data => {
            console.log(data);
            this.cart = data.items.sort((first, second) => first.itemId > second.itemId ? 1 : -1)
            this.user.cart.items = this.cart
            this.userService.userSubject.next(this.user);

            this.storageService.saveUser(this.user)

            this.sum = 0;
            this.cart.forEach(item => this.sum += item.price * item.addedToCart)
        }, error => {
            console.log(error);
        })
    }
}
