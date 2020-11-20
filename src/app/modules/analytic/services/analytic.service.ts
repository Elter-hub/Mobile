import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TotalSells} from '../../../models/totalSells';

const API_ADMIN = 'http://localhost:8082/admin/';

@Injectable({
  providedIn: 'root'
})
export class AnalyticService {

  constructor(private http: HttpClient) { }

  getTotalSells(): Observable<TotalSells> {
    return this.http.get<TotalSells>(API_ADMIN + 'total');
  }

  getEachItemSells() {
    return this.http.get(API_ADMIN + 'each-item');
  }
}
