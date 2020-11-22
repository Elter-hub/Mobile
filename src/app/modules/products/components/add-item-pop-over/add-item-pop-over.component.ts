import { Component, OnInit } from '@angular/core';
import {MenuController, NavParams, PopoverController, ToastController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ItemService} from '../../services/item.service';
import {Item} from '../../../../models/cart';

@Component({
  selector: 'app-add-item-pop-over',
  templateUrl: './add-item-pop-over.component.html',
  styleUrls: ['./add-item-pop-over.component.scss'],
})
export class AddItemPopOverComponent implements OnInit {
  addItemForm: FormGroup;
  item: Item;
  newPrice: number;
  message: string;
  buttonName: string;
  
  constructor(private navParams: NavParams,
              private itemService: ItemService,
              private menu: MenuController,
              private toastController: ToastController,
              private popoverCtrl: PopoverController,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addItemForm = this.formBuilder.group({
      quantity: ['', Validators.required]
    })
    this.message = this.navParams.get('message')
    this.buttonName = this.navParams.get('buttonName')
  }

  onSubmit(quantity: any) {
    if (this.buttonName === 'Add') {
      this.itemService.changeQuantity(this.navParams.get('item'), quantity).subscribe(data => {
        this.item.quantity = data.quantity
        this.closeControllers('Item was successively added to store!')
      })
    }
      if (this.buttonName === 'Confirm') {
        this.itemService.promote(this.item, quantity).subscribe(data => {
          this.item.discount = data.discount
          this.item.newPrice = data.newPrice
          this.closeControllers('New price is successively set!')
        })
      }
  }

  closeControllers(message: string) {
    this.popoverCtrl.dismiss();
    this.menu.close()
    this.presentToast(message);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: 'success'
    });
    toast.present();
  }
}
