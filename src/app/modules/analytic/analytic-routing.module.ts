import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyticPage } from './analytic.page';
import {TotalSellsResolverService} from './services/total-sells-resolver.service';
import {EachItemResolverService} from './services/each-item-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: AnalyticPage,
    resolve: {totalSells: TotalSellsResolverService, eachItem: EachItemResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticPageRoutingModule {}
