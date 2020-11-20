import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../../../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';
import {AlertController, ModalController, NavParams} from '@ionic/angular';
import {StorageService} from '../../../shared/services/storage.service';
import {Router} from '@angular/router';

declare var Stripe;

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  cardForm: FormGroup;
  user: User;
  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private navParams: NavParams,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => this.user = user);

    this.cardForm = this.formBuilder.group({
      cardNumber: ['4242424242424242', [Validators.required]],
      cardExpMonth: ['11', [Validators.required]],
      cardExpYear: ['2022', [Validators.required]],
      cardCvc: ['255', [Validators.required]],
    });
  }

  chargeCreditCard() {
    (<any>window).Stripe.card.createToken({
      number: this.cardNumber.value,
      exp_month: this.cardExpMonth.value,
      exp_year: this.cardExpYear.value,
      cvc: this.cardCvc.value
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        this.chargeCard(token);
      } else {
        console.log(response.error);
      }
    });
  }

  chargeCard(token: string) {
    const headers = new HttpHeaders({'token': token, 'amount': this.navParams.get('amount').toString()});
    this.http.post('http://localhost:8082/payment/charge', {
      items: this.user.cart.items
    }, {headers: headers})
        .subscribe(resp => {
          console.log(resp);
          this.user.cart.items = [];
          this.user.cart.quantities = [];
          this.userService.changeUser(this.user)
          this.presentAlert();

        },error => console.log(error))
  }

  get cardNumber() {
    return this.cardForm.get('cardNumber')
  }

  get cardExpMonth() {
    return this.cardForm.get('cardExpMonth')
  }
  get cardExpYear() {
    return this.cardForm.get('cardExpYear')
  }
  get cardCvc() {
    return this.cardForm.get('cardCvc')
  }

  onSubmit(value: any) {
    return false;
  }

  back() {
    this.modalCtrl.dismiss()
  }

  async dismissAlert() {
    await this.alertCtrl.dismiss();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Success!!',
      buttons: ['OK'],
      cssClass: 'myAlertSuccess'
    });
    await alert.present();
    await setTimeout(() => {
      this.dismissAlert()
      this.back()
    }, 1500)

  }
}
