import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ItemService} from '../../services/item.service';
import {ModalController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent implements OnInit {
  addItemForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private toastController: ToastController,
              private modalController: ModalController,
              private itemService: ItemService) { }

  ngOnInit() {
    this.addItemForm = this.formBuilder.group({
      itemName: ['REVO', [Validators.required]],
      description: ['Revo', [Validators.required]],
      price: ['2', [Validators.pattern('[0-9]+')]],
      quantity: ['50', [Validators.required]],
      type: ['Shitty drink', [Validators.required]],
      itemImageUrl: ['https://newproducts.ua/wp-content/uploads/2018/03/revo.png', [Validators.required]],
    })
  }

  onSubmit(form: any) {
    console.log(form);
    this.itemService.postItem(form).subscribe(() => {
          this.presentToast('Successfully added!')
          this.addItemForm.reset();
        },
        error => console.log(error))
        this.presentToast('Something went wrong!', true)
  }

  async presentToast(message: string, isDanger?: boolean) {
    const toast = await this.toastController.create({
      message: message,
      duration: 500,
      color: !isDanger ? 'success' : 'danger'
    });
    toast.present();
  }

  back() {
    this.modalController.dismiss()
  }
}
