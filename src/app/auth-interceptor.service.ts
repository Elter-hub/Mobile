import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {BehaviorSubject, from, Observable, throwError} from 'rxjs';
import {StorageService} from './modules/shared/services/storage.service';
import {AuthService} from './modules/auth/services/auth.service';
import {UserService} from './modules/shared/services/user.service';


@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    refreshData: any;

    constructor(public authService: AuthService,
                private userService: UserService,
                private storageService: StorageService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.storageService.getAccessToken()).pipe(switchMap(token => {
            if (token) {
                request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
            }
            return next.handle(request).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401 && this.userService.userSubject.getValue()) {
                    return this.handle401Error(request, next);
                } else {
                    return throwError(error);
                }
            }))
        }));
    }

    private addToken(request: HttpRequest<any>, token: Promise<void>) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (Object.keys(this.userService.userSubject.getValue()).length !== 0){
            if (!this.isRefreshing) {
                this.isRefreshing = true;
                this.refreshTokenSubject.next(null);

               return from(this.storageService.getDataForRefresh()).pipe(switchMap(data => {
                   this.refreshData = data
                   return this.authService.refreshToken(this.refreshData[0], this.refreshData[1], this.refreshData[2].userEmail).pipe(
                       switchMap((token: any) => {
                           console.log("🆕 Access: " + token.accessToken);
                           console.log("🆕 Refresh token: " + token.refreshToken);
                           this.isRefreshing = false;
                           this.refreshTokenSubject.next(token.jwt);
                           return next.handle(this.addToken(request, token.accessToken));
                       }));
               }))
            } else {
                return this.refreshTokenSubject.pipe(
                    filter(token => token != null),
                    take(1),
                    switchMap(jwt => {
                        return next.handle(this.addToken(request, jwt));
                    }));
            }
        }
    }
}
