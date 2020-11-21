import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TotalSells} from '../../../models/totalSells';
import {AnalyticService} from './analytic.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EachItemResolverService implements Resolve<any>{

  constructor(private analyticService: AnalyticService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    console.log('Each Item Resolver');
    return this.analyticService.getEachItemSells();
  }
}
