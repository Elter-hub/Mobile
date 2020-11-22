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
      itemName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.pattern('[0-9]+')]],
      quantity: ['', [Validators.required]],
      type: ['', [Validators.required]],
      itemImageUrl: ['', [Validators.required]],
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
