import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../models/cart';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {OneItemComponent} from '../one-item/one-item.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  @Input() quantityInCart: any;
  constructor(private router: Router,
              public modalController: ModalController) { }

  ngOnInit() {}

  async presentModal(item) {
    const modal = await this.modalController.create({
      component: OneItemComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        item: item
      }
    });
    return await modal.present();
  }

  addItemToCart(item: Item) {
    
  }
}
