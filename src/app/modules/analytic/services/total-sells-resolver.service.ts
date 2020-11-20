import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TotalSells} from '../../../models/totalSells';
import {Observable} from 'rxjs';
import {AnalyticService} from './analytic.service';

@Injectable({
  providedIn: 'root'
})
export class TotalSellsResolverService implements Resolve<TotalSells>{

  constructor(private analyticService: AnalyticService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TotalSells> | Promise<TotalSells> | TotalSells {
    return this.analyticService.getTotalSells();
  }
}
