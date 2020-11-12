import {Cart} from './cart';

export interface User {
    id?: number;
    userName?: string;
    userLastName?: string;
    userNickName?: string;
    userEmail?: string;
    userAge?: number;
    userSex?: string;
    imageUrl?: string;
    cart?: Cart;
    isLogged?: boolean;
}
