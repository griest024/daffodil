import { Action } from '@ngrx/store';

import { DaffCustomerRegistration } from '../models/customer-registration';
import { DaffLoginInfo } from '../models/login-info';
import { DaffAuthToken } from '../models/auth-token';
import { DaffAccountRegistration } from '../models/account-registration';

export enum DaffAuthActionTypes {
  AuthLoginAction = '[Daff-Auth] Auth Login Action',
  AuthLoginSuccessAction = '[Daff-Auth] Auth Login Success Action',
  AuthLoginFailureAction = '[Daff-Auth] Auth Login Failure Action',
  AuthRegisterAction = '[Daff-Auth] Auth Register Action',
  AuthRegisterSuccessAction = '[Daff-Auth] Auth Register Success Action',
  AuthRegisterFailureAction = '[Daff-Auth] Auth Register Failure Action',
  AuthLogoutAction = '[Daff-Auth] Auth Logout Action',
}

/**
 * An action triggered to initialize a auth login request.
 */
export class DaffAuthLogin<T extends DaffLoginInfo> implements Action {
  readonly type = DaffAuthActionTypes.AuthLoginAction;

  constructor(public loginInfo: T) { }
}

/**
 * An action triggered upon a successful auth login.
 *
 * @param token - the customer access token
 */
export class DaffAuthLoginSuccess<T extends DaffAuthToken> implements Action {
  readonly type = DaffAuthActionTypes.AuthLoginSuccessAction;

  constructor(public auth: T) { }
}

/**
 * An action triggered upon a failed auth login request.
 *
 * @param errorMessage - an error message
 */
export class DaffAuthLoginFailure implements Action {
  readonly type = DaffAuthActionTypes.AuthLoginFailureAction;

  constructor(public errorMessage: string) { }
}

/**
 * An action triggered to initialize a auth register request.
 *
 * @param registration
 */
export class DaffAuthRegister<T extends DaffAccountRegistration<TT>, TT extends DaffCustomerRegistration> implements Action {
  readonly type = DaffAuthActionTypes.AuthRegisterAction;

  constructor(public registration: T) { }
}

/**
 * An action triggered upon a successful auth register request.
 *
 * @param token - the customer access token
 */
export class DaffAuthRegisterSuccess<T extends DaffLoginInfo> implements Action {
  readonly type = DaffAuthActionTypes.AuthRegisterSuccessAction;

  constructor(public loginInfo: T) { }
}

/**
 * An action triggered upon a failed auth request.
 *
 * @param errorMessage - an error message
 */
export class DaffAuthRegisterFailure implements Action {
  readonly type = DaffAuthActionTypes.AuthRegisterFailureAction;

  constructor(public errorMessage: string) { }
}

/**
 * An action triggered to initialize a auth login request.
 */
export class DaffAuthLogout implements Action {
  readonly type = DaffAuthActionTypes.AuthLogoutAction;
}

export type DaffAuthActions<
  T extends DaffLoginInfo,
  U extends DaffAuthToken,
  S extends DaffAccountRegistration<ST>,
  ST extends DaffCustomerRegistration
> =
  | DaffAuthLogin<T>
  | DaffAuthLoginSuccess<U>
  | DaffAuthLoginFailure
  | DaffAuthRegister<S, ST>
  | DaffAuthRegisterSuccess<T>
  | DaffAuthRegisterFailure
  | DaffAuthLogout
