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
    isEnabled?: boolean;
}

export interface ForgotPasswordResponse {
    message: string;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}
