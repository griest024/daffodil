import { AuthReducerState } from '../reducers/auth/auth-reducer-state.interface';
import { DaffAuthToken } from '../models/auth-token';

export interface AuthReducersState<T extends DaffAuthToken> {
  auth: AuthReducerState<T>;
}
