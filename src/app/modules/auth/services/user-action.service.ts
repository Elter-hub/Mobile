import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const API_URL = 'http://localhost:8082/';


@Injectable({
  providedIn: 'root'
})
export class UserActionService {

  constructor(private http: HttpClient) { }

  changeImageUrl(imageUrl: string, userEmail: string){
    return this.http.put(API_URL + "user/change-image", {
      imageUrl: imageUrl,
      userEmail: userEmail
    })
  }

  //Cause it should also validate old password
  userChangePassword(userEmail: string, oldPassword: string, newPassword: string) {
    return this.http.post('http://localhost:8082/user/change-password' , {
      userEmail: userEmail,
      oldPassword: oldPassword,
      newPassword: newPassword
    })
  }

  userConfirmPasswordChanges(email: string, emailConfirmationToken: string){
    return this.http.post('http://localhost:8082/user/confirm-password', {
      emailForRecoveringPassword: email,
      tokenForRecoveringPassword: emailConfirmationToken
    })
  }

}
