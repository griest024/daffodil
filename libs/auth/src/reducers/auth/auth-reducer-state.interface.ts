import { DaffAuthToken } from '../../models/auth-token';

export interface AuthReducerState<T extends DaffAuthToken> {
  auth: T,
  loading: boolean,
  errors: string[]
}
