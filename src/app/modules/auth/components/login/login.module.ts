import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import {ConfirmEmailComponent} from '../confirm-email/confirm-email.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  declarations: [LoginPage, ConfirmEmailComponent]
})
export class LoginPageModule {}
