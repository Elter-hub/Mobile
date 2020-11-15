import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartPage } from './cart.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './cart-routing.module';
import {ProductsModule} from '../products/products.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab2PageRoutingModule,
        ProductsModule
    ],
  declarations: [CartPage]
})
export class CartModule {}
