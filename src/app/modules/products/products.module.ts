import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsPage } from './products.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ProductsRoutingModule } from './products-routing.module'
import {AllItemsComponent} from './components/all-items/all-items.component';
import {ItemComponent} from './components/item/item.component';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  providers: [],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ProductsRoutingModule
  ],
  declarations: [ProductsPage, AllItemsComponent, ItemComponent]
})
export class ProductsModule {}
