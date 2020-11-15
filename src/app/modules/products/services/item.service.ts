import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AddItemResponse} from '../../../models/addItemResponse';

const CONTENT_API = 'http://localhost:8082/cart/';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  addItemToCart(userEmail: string, itemId): Observable<AddItemResponse> {
    return this.http.patch<AddItemResponse>(CONTENT_API + 'add-item', {
      userEmail: userEmail,
      itemId: itemId
    })
  }
}
