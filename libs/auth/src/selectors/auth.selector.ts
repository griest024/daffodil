import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthReducersState } from '../reducers/auth-reducers.interface';
import { DaffAuthToken } from '../models/auth-token';

/**
 * Feature State Selector
 */
export const selectAuthFeatureState = createFeatureSelector<AuthReducersState<DaffAuthToken>>('auth');

export const selectAuthState = createSelector(
  selectAuthFeatureState,
  state => state.auth
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  state => state.loading
);

export const selectAuthErrors = createSelector(
  selectAuthState,
  state => state.errors
);

export const selectAuthToken = createSelector(
  selectAuthState,
  state => state.auth
)

export const selectAuthTokenValue = createSelector(
  selectAuthToken,
  state => state ? state.token : null
)
