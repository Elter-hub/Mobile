import {Cart} from './cart';

export interface LoginResponse {
    accessToken: string;
    cart: Cart;
    id: number;
    imageUrl: string;
    refreshToken: string;
    roles: string[];
    userAge: number;
    userEmail: string;
    userLastName: string;
    userName: string;
    userNickName: string;
    isEnabled: boolean
}
