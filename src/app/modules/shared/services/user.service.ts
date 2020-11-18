import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {User} from '../../../models/user';
import {BehaviorSubject} from 'rxjs';
import {Cart} from '../../../models/cart';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  constructor(private storageService: StorageService) { }

  isLoggedSubject = new BehaviorSubject<boolean>(false);
  isLogged = this.isLoggedSubject.asObservable();

  changeIsLogged() {
    let value = !this.isLoggedSubject.getValue();
    this.isLoggedSubject.next(value);
  }

  userSubject = new BehaviorSubject<User>({});

  currentUser = this.userSubject.asObservable();

  changeUser(user: User): void {
    this.userSubject.next(user);
  }

  async getUser() {
    return await this.storageService.getUser();
  }

  loggedIn(){
    let user = this.userSubject.getValue();
    this.userSubject.next(user);
  }

  createUser(id: number, imageUrl: string, cart: Cart, roles: string[], userAge: number, userEmail: string,
    userLastName: string, userName: string, userNickName: string, isEnabled: boolean): User {
      this.user = {
        cart: cart,
        imageUrl: imageUrl,
        userAge: userAge,
        userEmail: userEmail,
        userLastName: userLastName,
        userName: userName,
        userNickName: userNickName,
        userSex: '',
        id: id,
        isEnabled: isEnabled
      }
      this.userSubject.next(this.user);
      return this.user;
  }
}
