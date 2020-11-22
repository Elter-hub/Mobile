import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductsPage } from './products.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ProductsRoutingModule } from './products-routing.module'
import {AllItemsComponent} from './components/all-items/all-items.component';
import {ItemComponent} from './components/item/item.component';
import {OneItemComponent} from './components/one-item/one-item.component';
import {AddItemPopOverComponent} from './components/add-item-pop-over/add-item-pop-over.component';
import {NewItemComponent} from './components/new-item/new-item.component';

@NgModule({
    providers: [],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        ProductsRoutingModule,
        ReactiveFormsModule
    ],
    exports: [
        ItemComponent
    ],
    declarations: [ProductsPage, AllItemsComponent, ItemComponent, OneItemComponent, AddItemPopOverComponent, NewItemComponent]
})
export class ProductsModule {}
