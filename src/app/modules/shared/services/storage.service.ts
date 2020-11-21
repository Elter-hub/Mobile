import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import {User} from '../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage,
  ) { }

  saveTokens(accessToken: string, refreshToken: string){
    this.storage.set('AccessToken', accessToken);
    this.storage.set('RefreshToken', refreshToken);

  }

  saveUser(user: User){
    this.storage.set('User', user);
  }

  async getUser(): Promise<User>{
    try {
      return await this.storage.get('User');
    }
   catch (e) {
     console.log(e);
   }
  }

  removeTokens() {
    this.storage.clear();
  }

  getAccessToken(){
    return this.storage.get('AccessToken')
  }

  getRefreshToken(){
    return this.storage.get('RefreshToken');
  }

  async getDataForRefresh() {
    let accessToken;
    let refreshToken;
    let user;

    await this.storage.get('AccessToken').then(data => accessToken = data)
    await this.storage.get('RefreshToken').then(data => refreshToken = data)
    await this.storage.get('User').then(data => user = data)

    return [accessToken, refreshToken, user];
  }


}
