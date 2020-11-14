import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import {SignUpComponent} from '../modules/auth/components/signup/sign-up.component';
import {UserChangePasswordComponent} from '../modules/auth/components/user-change-password/user-change-password.component';
import {ChangeImageComponent} from '../modules/auth/components/change-image/change-image.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage, SignUpComponent, UserChangePasswordComponent,  ChangeImageComponent]
})
export class TabsPageModule {}
