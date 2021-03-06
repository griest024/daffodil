import { Observable } from 'rxjs';
import { DaffLoginInfo } from '../../models/login-info';
import { DaffAuthToken } from '../../models/auth-token';

export interface DaffLoginServiceInterface<
  TRequest extends DaffLoginInfo,
  TResponse extends DaffAuthToken
> {
  /**
   * Logs the user in.
   *
   * @param {string} username
   * @param {string} password
   * @returns {Observable<string>} An access token.
   * @memberof DaffLoginServiceInterface
   */
  login(loginInfo: TRequest): Observable<TResponse>;
}
