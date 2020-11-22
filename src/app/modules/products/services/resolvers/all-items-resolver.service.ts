import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Item} from '../../../../models/cart';
import {Observable} from 'rxjs';
import {ItemService} from '../item.service';

@Injectable({
  providedIn: 'root'
})
export class AllItemsResolverService implements Resolve<Item[]>{

  constructor(private getItemsService: ItemService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item[]> | Promise<Item[]> | Item[] {
    return this.getItemsService.getAllItems();
  }
}
