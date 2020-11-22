import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AddItemResponse} from '../../../models/addItemResponse';
import {Item} from '../../../models/cart';

const CONTENT_API = 'http://localhost:8082/cart/';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addItemToCart(userEmail: string, itemId, addOrRemove: boolean): Observable<AddItemResponse> {
    return this.http.patch<AddItemResponse>(CONTENT_API + 'add-item', {
      userEmail: userEmail,
      itemId: itemId,
      addOrRemove: addOrRemove
    })
  }

  removeItemFromCart(userEmail: string, itemId: number): Observable<AddItemResponse>{
    return this.http.patch<AddItemResponse>(CONTENT_API + 'remove-item', {
      userEmail: userEmail,
      itemId: itemId,
    })
  }


}
