import { Location } from '@angular/common';
import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable ,  of, EMPTY } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

import {
  DaffAuthLoginSuccess,
  DaffAuthRegisterSuccess,
  DaffAuthToken,
  DaffLoginInfo,
  DaffAccountRegistration,
  DaffCustomerRegistration,
} from '@daffodil/auth';
import {
  DaffAccountRegistrationFactory,
  DaffAuthTokenFactory
} from '@daffodil/auth/testing';

import { DemoAuthEffects } from './auth.effects';

describe('DemoAuthEffects', () => {
  let actions$: Observable<any>;
  let effects: DemoAuthEffects;
  let router: Router;
  let location: Location;

  const registrationFactory: DaffAccountRegistrationFactory = new DaffAccountRegistrationFactory();
  const authFactory: DaffAuthTokenFactory = new DaffAuthTokenFactory();

  const homepageUrl = '/';

  let mockAuthToken: DaffAuthToken;
  let mockLoginInfo: DaffLoginInfo;
  let token: string;
  let email: string;
  let password: string;
  let firstName: string;
  let lastName: string;
  let mockRegistration: DaffAccountRegistration<DaffCustomerRegistration>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        DemoAuthEffects,
        provideMockActions(() => actions$),
      ]
    });

    effects = TestBed.get(DemoAuthEffects);
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    mockRegistration = registrationFactory.create();
    mockAuthToken = authFactory.create();

    token = mockAuthToken.token;
    firstName = mockRegistration.customer.firstName;
    lastName = mockRegistration.customer.lastName;
    email = mockRegistration.customer.email;
    password = mockRegistration.password;
    mockLoginInfo = {email, password};

    router.initialNavigation();
  }));

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('when AuthLoginSuccessAction is triggered', () => {
    let navigateSpy;
    let expected;

    const mockAuthLoginSuccessAction = new DaffAuthLoginSuccess(mockAuthToken);

    beforeEach(() => {
      navigateSpy = spyOn(router, 'navigateByUrl');
      actions$ = hot('--a', { a: mockAuthLoginSuccessAction });
      expected = cold('---');
    });

    it('should navigate to the homepage', () => {
      expect(effects.authSuccess$).toBeObservable(expected);
      expect(navigateSpy).toHaveBeenCalledWith(homepageUrl);
    });
  });

  describe('when AuthRegisterSuccessAction is triggered', () => {
    let navigateSpy;
    let expected;

    const mockAuthRegisterSuccessAction = new DaffAuthRegisterSuccess(mockAuthToken);

    beforeEach(() => {
      navigateSpy = spyOn(router, 'navigateByUrl');
      actions$ = hot('--a', { a: mockAuthRegisterSuccessAction });
      expected = cold('---');
    });

    it('should navigate to the homepage', () => {
      expect(effects.authSuccess$).toBeObservable(expected);
      expect(navigateSpy).toHaveBeenCalledWith(homepageUrl);
    });
  });
});
