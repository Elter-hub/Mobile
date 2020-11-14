import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {SignUpComponent} from '../modules/auth/components/signup/sign-up.component';

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
        path: 'cart',
        loadChildren: () => import('../modules/cart/cart.module').then(m => m.CartModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../modules/products/products.module').then(m => m.ProductsModule)
      },

      {path: '', redirectTo: '/tabs/products', pathMatch: 'full'}]},
  {
    path: 'login',
    loadChildren: () => import('../modules/auth/components/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: '',
    redirectTo: '/tabs/products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
