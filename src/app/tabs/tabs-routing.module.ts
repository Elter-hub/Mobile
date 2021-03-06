import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {SignUpComponent} from '../modules/auth/components/signup/sign-up.component';
import {TotalSellsResolverService} from '../modules/analytic/services/total-sells-resolver.service';
import {EachItemResolverService} from '../modules/analytic/services/each-item-resolver.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../modules/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'analytic',
        loadChildren: () => import('../modules/analytic/analytic.module').then(m => m.AnalyticPageModule),
        resolve: {totalSells: TotalSellsResolverService, eachItem: EachItemResolverService}
      },
      {
        path: 'cart',
        loadChildren: () => import('../modules/cart/cart.module').then(m => m.CartModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../modules/products/products.module').then(m => m.ProductsModule)
      },

      {path: '', redirectTo: '/tabs/products', pathMatch: 'full'}]},
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
