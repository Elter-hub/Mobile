import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../../../models/cart';
import {HttpClient} from '@angular/common/http';

const CONTENT_API = 'http://localhost:8082/content/';


@Injectable({
  providedIn: 'root'
})
export class GetItemsService {

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(CONTENT_API + 'all-items')
  }
}
