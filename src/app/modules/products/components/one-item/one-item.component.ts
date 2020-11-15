import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../../../../models/cart';
import {ModalController, NavParams} from '@ionic/angular';
import {UserService} from '../../../shared/services/user.service';
import {StorageService} from '../../../shared/services/storage.service';
import {User} from '../../../../models/user';
import {ItemService} from '../../services/item.service';

@Component({
  selector: 'app-one-item',
  templateUrl: './one-item.component.html',
  styleUrls: ['./one-item.component.scss'],
})
export class OneItemComponent implements OnInit {
  @Input() item: Item;
  user: User;
  constructor(private router: Router,
              private navsParam: NavParams,
              private userService: UserService,
              private itemService: ItemService,
              private storageService: StorageService,

              public modalController: ModalController,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.item = this.navsParam.get('item');
    this.userService.currentUser.subscribe(user => this.user = user)
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  addToCard(item: Item) {
    this.itemService.addItemToCart(this.user.userEmail, item.itemId, true).subscribe(data => {
      console.log(data);
      this.user.cart.items = data.items.sort((first, second) => first.itemId > second.itemId ? 1 : -1)
    }, error => {
      console.log(error);
    })
    this.storageService.saveUser(this.user)
    this.userService.userSubject.next(this.user);
  }
}
