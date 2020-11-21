import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllItemsComponent} from './components/all-items/all-items.component';
import {OneItemComponent} from './components/one-item/one-item.component';
import {AllItemsResolverService} from './services/resolvers/all-items-resolver.service';

const routes: Routes = [
  { path: '', component: AllItemsComponent, resolve: {allItems: AllItemsResolverService}  },
  {path: 'item/:id', component: OneItemComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
