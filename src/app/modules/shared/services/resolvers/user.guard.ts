import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginResponse} from '../../../../models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements Resolve<LoginResponse> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LoginResponse> | Promise<LoginResponse> | LoginResponse {
    return undefined;
  }
}
