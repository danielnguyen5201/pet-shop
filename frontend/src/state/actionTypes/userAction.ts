import {UserInfo, UserRegister} from "../../models/user";

export enum userActionTypes {
    USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
    USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
    USER_LOGIN_ERROR = 'USER_LOGIN_ERROR',
    USER_LOGOUT = 'USER_LOGOUT',
    USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST',
    USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS',
    USER_REGISTER_ERROR = 'USER_REGISTER_ERROR',
}

interface Login {
    type: userActionTypes.USER_LOGIN_REQUEST
}

interface LoginSuccess {
    type: userActionTypes.USER_LOGIN_SUCCESS,
    payload: UserInfo
}

interface LoginError {
    type: userActionTypes.USER_LOGIN_ERROR,
    payload: string
}

interface Logout {
    type: userActionTypes.USER_LOGOUT
}

interface Register {
    type: userActionTypes.USER_REGISTER_REQUEST,
    payload: UserRegister
}

interface RegisterSuccess {
    type: userActionTypes.USER_REGISTER_SUCCESS,
    payload: UserInfo
}

interface RegisterError {
    type: userActionTypes.USER_REGISTER_ERROR,
    payload: string
}

export type UserAction = Login | LoginSuccess | LoginError | Logout
    | Register | RegisterSuccess | RegisterError