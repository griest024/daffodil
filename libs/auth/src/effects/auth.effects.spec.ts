import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable ,  of } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

import {
  DaffAuthTestingDriverModule,
  DaffAccountRegistrationFactory,
  DaffAuthTokenFactory
} from '../../testing/src';

import { DaffAuthEffects } from './auth.effects';
import {
  DaffAuthLogin,
  DaffAuthLoginSuccess,
  DaffAuthLoginFailure,
  DaffAuthRegister,
  DaffAuthRegisterSuccess,
  DaffAuthRegisterFailure
} from '../actions/auth.actions';
import { DaffRegisterDriver } from '../drivers/injection-tokens/register-driver.token';
import { DaffLoginDriver } from '../drivers/injection-tokens/login-driver.token';
import { DaffAccountRegistration } from '../models/account-registration';
import { DaffAuthToken } from '../models/auth-token';
import { DaffCustomerRegistration } from '../models/customer-registration';
import { DaffLoginInfo } from '../models/login-info';

describe('DaffAuthEffects', () => {
  let actions$: Observable<any>;
  let effects: DaffAuthEffects<
    DaffLoginInfo,
    DaffAuthToken,
    DaffAccountRegistration<DaffCustomerRegistration>,
    DaffCustomerRegistration
  >;

  let daffLoginDriver;
  let daffRegisterDriver;

  const registrationFactory: DaffAccountRegistrationFactory = new DaffAccountRegistrationFactory();
  const authFactory: DaffAuthTokenFactory = new DaffAuthTokenFactory();

  const loginDriverSpy = jasmine.createSpyObj('DaffLoginTestingService', ['login']);
  const registerDriverSpy = jasmine.createSpyObj('DaffRegisterTestingService', ['register']);

  let mockAuth: DaffAuthToken;
  let mockLoginInfo: DaffLoginInfo;
  let token: string;
  let email: string;
  let password: string;
  let firstName: string;
  let lastName: string;
  let mockRegistration: DaffAccountRegistration<DaffCustomerRegistration>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // TODO: figure out why this isn't providing the testing services
      // imports: [
      //   DaffAuthTestingDriverModule.forRoot()
      // ],
      providers: [
        DaffAuthEffects,
        provideMockActions(() => actions$),
        {
          provide: DaffLoginDriver,
          useValue: loginDriverSpy
        },
        {
          provide: DaffRegisterDriver,
          useValue: registerDriverSpy
        }
      ]
    });

    effects = TestBed.get(DaffAuthEffects);

    daffLoginDriver = TestBed.get(DaffLoginDriver);
    daffRegisterDriver = TestBed.get(DaffRegisterDriver);

    mockRegistration = registrationFactory.create();
    mockAuth = authFactory.create();

    token = mockAuth.token;
    firstName = mockRegistration.customer.firstName;
    lastName = mockRegistration.customer.lastName;
    email = mockRegistration.customer.email;
    password = mockRegistration.password;
    mockLoginInfo = {email, password};
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('when AuthLoginAction is triggered', () => {
    let expected;

    const mockAuthLoginAction = new DaffAuthLogin(mockLoginInfo);

    describe('and the call to AuthService is successful', () => {

      beforeEach(() => {
        daffLoginDriver.login.and.returnValue(of(mockAuth));
        const mockAuthLoadSuccessAction = new DaffAuthLoginSuccess(mockAuth);

        actions$ = hot('--a', { a: mockAuthLoginAction });
        expected = cold('--b', { b: mockAuthLoadSuccessAction });
      });

      it('should dispatch a AuthLoginSuccess action', () => {
        expect(effects.login$).toBeObservable(expected);
      });
    });

    describe('and the call to AuthService fails', () => {

      beforeEach(() => {
        const error = 'Failed to log in';
        const response = cold('#', {}, error);
        daffLoginDriver.login.and.returnValue(response);
        const mockAuthLoadFailureAction = new DaffAuthLoginFailure(error);

        actions$ = hot('--a', { a: mockAuthLoginAction });
        expected = cold('--b', { b: mockAuthLoadFailureAction });
      });

      it('should dispatch a AuthLoginFailure action', () => {
        expect(effects.login$).toBeObservable(expected);
      });
    });
  });

  describe('when AuthRegisterAction is triggered', () => {
    let expected;

    const mockAuthRegisterAction = new DaffAuthRegister(mockRegistration);

    describe('and the call to AuthService is successful', () => {
      beforeEach(() => {
        daffRegisterDriver.register.and.returnValue(of(mockLoginInfo));
        const mockAuthRegisterSuccessAction = new DaffAuthRegisterSuccess(mockLoginInfo);

        actions$ = hot('--a', { a: mockAuthRegisterAction });
        expected = cold('--b', { b: mockAuthRegisterSuccessAction });
      });

      it('should dispatch a AuthRegisterSuccess action', () => {
        expect(effects.register$).toBeObservable(expected);
      });
    });

    describe('and the call to AuthService fails', () => {
      beforeEach(() => {
        const error = 'Failed to register a new user';
        const response = cold('#', {}, error);
        daffRegisterDriver.register.and.returnValue(response);
        const mockAuthLoadFailureAction = new DaffAuthRegisterFailure(error);

        actions$ = hot('--a', { a: mockAuthRegisterAction });
        expected = cold('--b', { b: mockAuthLoadFailureAction });
      });

      it('should dispatch a AuthRegisterFailure action', () => {
        expect(effects.register$).toBeObservable(expected);
      });
    });
  });

  describe('when DaffAuthRegisterSuccess is triggered', () => {
    let expected;

    const mockAuthLoginAction = new DaffAuthLogin(mockLoginInfo);
    const mockAuthRegisterSuccessAction = new DaffAuthRegisterSuccess(mockLoginInfo);

    beforeEach(() => {
      actions$ = hot('--a', { a: mockAuthRegisterSuccessAction });
      expected = cold('--b', { b: mockAuthLoginAction });
    });

    it('should dispatch a AuthRegisterSuccess action', () => {
      expect(effects.loginAfterRegister$).toBeObservable(expected);
    });
  });
});
