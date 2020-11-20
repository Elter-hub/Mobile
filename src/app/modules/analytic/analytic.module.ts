import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalyticPageRoutingModule } from './analytic-routing.module';

import { AnalyticPage } from './analytic.page';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartsModule,
    AnalyticPageRoutingModule
  ],
  declarations: [AnalyticPage]
})
export class AnalyticPageModule {}
