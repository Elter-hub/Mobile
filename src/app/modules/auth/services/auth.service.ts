import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {LoginResponse} from '../../../models/loginResponse';
import {StorageService} from '../../shared/services/storage.service';
import {ForgotPasswordResponse, Tokens} from '../../../models/user';
import {catchError, tap} from 'rxjs/operators';

const AUTH_API = 'http://localhost:8082/api/';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
                private storageService: StorageService,
                private router: Router) {
    }

    login(form): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(AUTH_API + 'auth/signin', {
            email: form.userEmail,
            password: form.userPassword
        });
    }

    register(form): Observable<any> {
        return this.http.post(AUTH_API + 'auth/signup', {
            userName: form.userName,
            email: form.userEmail,
            password: form.userPassword,
            age: form.userAge,
            userLastName: form.userLastName,
            userNickName: form.userNickName,
            sex: form.userSex
        });
    }

    forgotPassword(email: string): Observable<ForgotPasswordResponse> {
        console.log(AUTH_API + 'forgot-password');
        return this.http.post<ForgotPasswordResponse>(AUTH_API + 'forgot-password', {
            emailForRecoveringPassword: email
        });
    }

    changePassword(password: string, tokenForRecoveringPassword: string, emailForRecoveringPassword: string) {
        return this.http.post(AUTH_API + 'reset-password', {
            password: password,
            tokenForRecoveringPassword: tokenForRecoveringPassword,
            emailForRecoveringPassword: emailForRecoveringPassword
        });
    }

    refreshToken() {
        let userEmail;
        let refreshToken;
        let accessToken;
        this.storageService.getUser().then(user => userEmail = user.userEmail);
        this.storageService.getRefreshToken().then(token => refreshToken = token);
        this.storageService.getAccessToken().then(token => accessToken = token);
        return this.http.post(AUTH_API + 'auth/refresh-token', {
            userEmail: userEmail,
            refreshToken: refreshToken,
            accessToken: accessToken
    }).
        pipe(tap((tokens: Tokens) => {
            this.storageService.saveTokens(tokens.accessToken, tokens.refreshToken);
        }), catchError(error => {
            console.log(error);
            this.storageService.removeTokens();
            return throwError(error);
        }));
    }

    confirmEmail(emailConfirmationToken: string) {
        console.log(emailConfirmationToken);
        return this.http.post(AUTH_API + 'auth/confirm',
            {
                emailConfirmationToken: emailConfirmationToken
            })
    }
}
