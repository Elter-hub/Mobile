import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CartPage } from './cart.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { CartRoutingModule } from './cart-routing.module';
import {ProductsModule} from '../products/products.module';
import {PaymentFormComponent} from './components/payment-form/payment-form.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        CartRoutingModule,
        ProductsModule,
        ReactiveFormsModule,
    ],
  declarations: [CartPage, PaymentFormComponent]
})
export class CartModule {}
