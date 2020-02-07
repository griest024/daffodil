import { TestBed } from '@angular/core/testing';
import { StoreModule, combineReducers, Store, select } from '@ngrx/store';
import { cold } from 'jasmine-marbles';

import {
  DaffAuthTokenFactory
} from '@daffodil/auth/testing';

import { DaffAuthLoginSuccess } from '../actions/auth.actions';
import {
  selectAuthToken,
  selectAuthTokenValue,
  selectAuthLoading,
  selectAuthErrors
} from './auth.selector';
import { AuthReducersState } from '../reducers/auth-reducers.interface';
import { authReducers } from '../reducers/auth-reducers';
import { DaffAuthToken } from '../models/auth-token';

describe('DaffAuthSelectors', () => {
  let store: Store<AuthReducersState<DaffAuthToken>>;

  const authTokenFactory: DaffAuthTokenFactory = new DaffAuthTokenFactory();

  let loading: boolean;
  let errors: string[];
  let token: string;
  let mockAuthToken: DaffAuthToken;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          auth: combineReducers(authReducers),
        })
      ]
    });

    store = TestBed.get(Store);

    mockAuthToken = authTokenFactory.create();

    loading = false;
    errors = [];
    token = mockAuthToken.token;

    // init store to desired state
    store.dispatch(new DaffAuthLoginSuccess(mockAuthToken));
  });

  describe('selectAuthToken', () => {
    it('selects the auth token', () => {
      const selector = store.pipe(select(selectAuthToken));
      const expected = cold('a', { a: mockAuthToken });
      expect(selector).toBeObservable(expected);
    });
  });

  describe('selectAuthTokenValue', () => {
    it('selects the auth token value', () => {
      const selector = store.pipe(select(selectAuthTokenValue));
      const expected = cold('a', { a: token });
      expect(selector).toBeObservable(expected);
    });
  });

  describe('selectAuthLoading', () => {
    it('selects the loading state of the auth', () => {
      const selector = store.pipe(select(selectAuthLoading));
      const expected = cold('a', { a: loading });
      expect(selector).toBeObservable(expected);
    });
  });

  describe('selectAuthErrors', () => {
    it('returns the selected auth errors', () => {
      const selector = store.pipe(select(selectAuthErrors));
      const expected = cold('a', { a: errors });
      expect(selector).toBeObservable(expected);
    });
  });
});
