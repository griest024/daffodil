import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select, Action } from '@ngrx/store';

import { DaffAuthModule } from '../auth.module';
import {
  selectAuthToken,
  selectAuthLoading,
  selectAuthErrors,
  selectAuthTokenValue
} from '../selectors/auth.selector';
import { AuthReducersState } from '../reducers/auth-reducers.interface';
import { DaffAuthFacadeInterface } from '../interfaces/auth-facade.interface';
import { DaffAuthToken } from '../models/auth-token';

@Injectable({
  providedIn: DaffAuthModule
})
export class DaffAuthFacadeService implements DaffAuthFacadeInterface<DaffAuthToken> {
  /**
   * The auth token object retrieved in a single auth call.
   */
  auth$: Observable<DaffAuthToken>
  /**
   * The auth token value retrieved in a single auth call.
   */
  token$: Observable<string>;
  /**
   * The loading state for performing auth operations.
   */
  loading$: Observable<boolean>;
  /**
   * Errors associated with auth operations.
   */
  errors$: Observable<string[]>;

  constructor(private store: Store<AuthReducersState<DaffAuthToken>>) {
    this.auth$ = this.store.pipe(select(selectAuthToken));
    this.token$ = this.store.pipe(select(selectAuthTokenValue));
    this.loading$ = this.store.pipe(select(selectAuthLoading));
    this.errors$ = this.store.pipe(select(selectAuthErrors));
  }

  /**
   * Dispatches the given action.
   * @param action action to dispatch.
   */
  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
