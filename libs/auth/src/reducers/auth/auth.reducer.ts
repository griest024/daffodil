import { DaffAuthActionTypes, DaffAuthActions } from '../../actions/auth.actions';
import { AuthReducerState } from './auth-reducer-state.interface';
import { DaffCustomerRegistration } from '../../models/customer-registration';
import { DaffAuthToken } from '../../models/auth-token';
import { DaffLoginInfo } from '../../models/login-info';
import { DaffAccountRegistration } from '../../models/account-registration';

const initialState = {
  auth: null,
  loading: false,
  errors: []
};

export function reducer<
  T extends DaffLoginInfo,
  U extends DaffAuthToken,
  S extends DaffAccountRegistration<ST>,
  ST extends DaffCustomerRegistration
>(
  state = initialState,
  action: DaffAuthActions<
    T,
    U,
    S,
    ST
  >
): AuthReducerState<U> {
  switch (action.type) {
    case DaffAuthActionTypes.AuthLoginAction:
    case DaffAuthActionTypes.AuthRegisterAction:
      return {...state, loading: true};
    case DaffAuthActionTypes.AuthRegisterSuccessAction:
      return {
        ...state,
        loading: false
      };
    case DaffAuthActionTypes.AuthLoginSuccessAction:
      return {
        ...state,
        loading: false,
        auth: action.auth
      };
    case DaffAuthActionTypes.AuthLoginFailureAction:
    case DaffAuthActionTypes.AuthRegisterFailureAction:
      return {
        ...state,
        loading: false,
        errors: [action.errorMessage]
      };
    case DaffAuthActionTypes.AuthLogoutAction:
      return {
        ...state,
        auth: null,
      };
    default:
      return state;
  }
}
