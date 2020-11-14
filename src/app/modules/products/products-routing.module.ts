import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllItemsComponent} from './components/all-items/all-items.component';
import {OneItemComponent} from './components/one-item/one-item.component';

const routes: Routes = [
  { path: '', component: AllItemsComponent  },
  {path: 'item/:id', component: OneItemComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
