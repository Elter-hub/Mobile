import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../../../../models/cart';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
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
              public toastController: ToastController,
              public modalController: ModalController) { }

  ngOnInit() {
    this.item = this.navsParam.get('item');
    this.userService.currentUser.subscribe(user => this.user = user)
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  addToCard(item: Item) {
    this.itemService.addItemToCart(this.user.userEmail, item.itemId, true).subscribe(data => {
      console.log(data);
      this.presentToast();
      this.user.cart.items = data.items.sort((first, second) => first.itemId > second.itemId ? 1 : -1)
      this.storageService.saveUser(this.user)
      this.userService.userSubject.next(this.user);
    }, error => {
      console.log(error);
    })

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Item was successively added to your cart🛒',
      duration: 1000,
      color: 'success'
    });
    toast.present();
  }
}
