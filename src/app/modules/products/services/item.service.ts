import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../../../models/cart';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const CONTENT_API = 'http://localhost:8082/content/';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(CONTENT_API + 'all-items')
  }

  promote(item: Item, newPrice: number): Observable<Item>{
    return this.http.patch<Item>(CONTENT_API + 'promote-item', {
      item: item,
      newPrice: newPrice
    })
  }

  cancelPromotion(item: Item) {
    return this.http.patch<Item>(CONTENT_API + 'cancel-promote-item', {
      item: item
    })
  }
//    const headers = new HttpHeaders({'token': token, 'amount': this.navParams.get('amount').toString(),
  deleteItem(item: Item) {
    const headers = new HttpHeaders({'itemId': item.itemId.toString()})
    return this.http.delete<Item>(CONTENT_API + 'delete-item', {
      headers: headers
    })
  }

  changeQuantity(item: Item, quantity: number) {
    return this.http.patch<Item>(CONTENT_API + 'change-quantity-item', {
      item: item,
      newQuantity: quantity
    })
  }

  postItem(value: any){
    return this.http.post(CONTENT_API + 'add-item', {
      price: value.price,
      quantity: value.quantity,
      itemName: value.itemName,
      type: value.type,
      itemImageUrl: value.itemImageUrl,
      description: value.description
    })
  }
}
