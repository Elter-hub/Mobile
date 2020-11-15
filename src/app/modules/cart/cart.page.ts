import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {Item} from '../../models/cart';
import {StorageService} from '../shared/services/storage.service';
import {isEmpty} from 'rxjs/operators';

@Component({
    selector: 'app-tab2',
    templateUrl: 'cart.page.html',
    styleUrls: ['cart.page.scss']
})
export class CartPage implements OnInit {
    cart: Item[];
    sum = 0;

    constructor(private userService: UserService,
                private storageService: StorageService ) {
    }

    ngOnInit(): void {
        this.userService.currentUser.subscribe(user => {
            if (user){
                console.log('🥰');
                this.storageService.getUser().then(data => {
                    console.log(data);
                    this.cart = data.cart.items
                    this.cart.forEach(item => this.sum += item.price * item.addedToCart)
                })
            }else {
                console.log(user);
                this.cart = user.cart.items;
                user.cart.items.forEach(item => this.sum += item.price * item.addedToCart)
            }
        });
    }

    remove(item: Item) {
        
    }
}
