import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import {
  DaffAuthActionTypes,
  DaffAuthLogin,
  DaffAuthLoginSuccess,
  DaffAuthLoginFailure,
  DaffAuthRegister,
  DaffAuthRegisterSuccess,
  DaffAuthRegisterFailure
} from '../actions/auth.actions';
import { DaffRegisterDriver } from '../drivers/injection-tokens/register-driver.token';
import { DaffRegisterServiceInterface } from '../drivers/interfaces/register-service.interface';
import { DaffLoginDriver } from '../drivers/injection-tokens/login-driver.token';
import { DaffLoginServiceInterface } from '../drivers/interfaces/login-service.interface';
import { DaffCustomerRegistration } from '../models/customer-registration';
import { DaffAuthToken } from '../models/auth-token';
import { DaffAccountRegistration } from '../models/account-registration';
import { DaffLoginInfo } from '../models/login-info';

@Injectable()
export class DaffAuthEffects<
  T extends DaffLoginInfo,
  U extends DaffAuthToken,
  S extends DaffAccountRegistration<ST>,
  ST extends DaffCustomerRegistration
> {
  constructor(
    private actions$: Actions,
    @Inject(DaffRegisterDriver) private registerDriver: DaffRegisterServiceInterface<S, ST, T>,
    @Inject(DaffLoginDriver) private loginDriver: DaffLoginServiceInterface<T, U>,
  ) {}

  @Effect()
  login$ : Observable<DaffAuthLoginSuccess<U> | DaffAuthLoginFailure> = this.actions$.pipe(
    ofType(DaffAuthActionTypes.AuthLoginAction),
    switchMap((action: DaffAuthLogin<T>) =>
      this.loginDriver.login(action.loginInfo).pipe(
        map((resp) =>
          new DaffAuthLoginSuccess<U>(resp)
        ),
        catchError(error =>
          // TODO: find out if we should be passing along the captured error
          of(new DaffAuthLoginFailure('Failed to log in'))
        )
      )
    )
  )

  @Effect()
  loginAfterRegister$: Observable<DaffAuthLogin<T>> = this.actions$.pipe(
    ofType(DaffAuthActionTypes.AuthRegisterSuccessAction),
    map((action: DaffAuthRegisterSuccess<T>) => new DaffAuthLogin(action.loginInfo))
  )

  @Effect()
  register$ : Observable<any> = this.actions$.pipe(
    ofType(DaffAuthActionTypes.AuthRegisterAction),
    switchMap((action: DaffAuthRegister<S, ST>) =>
      this.registerDriver.register(action.registration).pipe(
        map((resp) =>
          new DaffAuthRegisterSuccess<T>(resp)
        ),
        catchError(error =>
          of(new DaffAuthRegisterFailure('Failed to register a new user'))
        )
      )
    )
  )
}
