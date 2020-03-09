import {
  DaffCartShippingMethodsActionTypes,
} from '../../actions';
import { initialState } from '../cart-initial-state';
import { DaffCartReducerState } from '../cart-state.interface';
import { ActionTypes } from '../action-types.type';
import { DaffCartErrorType } from '../cart-error-type.enum';

export function reducer(
  state = initialState,
  action: ActionTypes
): DaffCartReducerState {
  switch (action.type) {
    case DaffCartShippingMethodsActionTypes.CartShippingMethodsLoadAction:
      return {...state, loading: true};

    case DaffCartShippingMethodsActionTypes.CartShippingMethodsLoadSuccessAction:
      return {
        ...state,
        cart: {
          ...state.cart,
          available_shipping_methods: action.payload
        },
        loading: false,
        errors: {
          ...state.errors,
          [DaffCartErrorType.ShippingMethods]: []
        }
      };

    case DaffCartShippingMethodsActionTypes.CartShippingMethodsLoadFailureAction:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          [DaffCartErrorType.ShippingMethods]: state.errors[DaffCartErrorType.ShippingMethods].concat(new Array(action.payload))
        }
      };

    default:
      return state;
  }
}
