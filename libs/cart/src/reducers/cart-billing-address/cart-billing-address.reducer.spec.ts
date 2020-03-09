import { DaffCart } from '@daffodil/cart';
import { DaffCartFactory } from '@daffodil/cart/testing';

import { initialState } from '../cart-initial-state';
import { DaffCartReducerState } from '../cart-state.interface';
import {
  DaffCartBillingAddressLoad,
  DaffCartBillingAddressLoadSuccess,
  DaffCartBillingAddressLoadFailure,
  DaffCartBillingAddressUpdate,
  DaffCartBillingAddressUpdateSuccess,
  DaffCartBillingAddressUpdateFailure,
} from '../../actions';
import { reducer } from './cart-billing-address.reducer';
import { DaffCartErrorType } from '../cart-error-type.enum';

describe('Cart | Reducer | Cart Billing Address', () => {
  let cartFactory: DaffCartFactory;
  let cart: DaffCart;

  beforeEach(() => {
    cartFactory = new DaffCartFactory();

    cart = cartFactory.create();
  });

  describe('when an unknown action is triggered', () => {
    it('should return the current state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('when CartBillingAddressLoadAction is triggered', () => {
    it('should set loading state to true', () => {
      const cartListLoadAction = new DaffCartBillingAddressLoad();

      const result = reducer(initialState, cartListLoadAction);

      expect(result.loading).toEqual(true);
    });
  });

  describe('when CartBillingAddressLoadSuccessAction is triggered', () => {
    let result;
    let state: DaffCartReducerState;

    beforeEach(() => {
      state = {
        ...initialState,
        loading: true
      }

      const cartListLoadSuccess = new DaffCartBillingAddressLoadSuccess(cart.billing_address);

      result = reducer(state, cartListLoadSuccess);
    });

    it('should indicate that the cart is not loading', () => {
      expect(result.loading).toEqual(false);
    });

    it('should set billing_address from action.payload', () => {
      expect(result.cart.billing_address).toEqual(cart.billing_address)
    });
  });

  describe('when CartBillingAddressLoadFailureAction is triggered', () => {
    const error = 'error message';
    let result;
    let state: DaffCartReducerState;

    beforeEach(() => {
      state = {
        ...initialState,
        loading: true,
        errors: {
          ...initialState.errors,
          [DaffCartErrorType.BillingAddress]: new Array('firstError')
        }
      }

      const cartListLoadFailure = new DaffCartBillingAddressLoadFailure(error);

      result = reducer(state, cartListLoadFailure);
    });

    it('should indicate that the cart is not loading', () => {
      expect(result.loading).toEqual(false);
    });

    it('adds an error to the billing address section of state.errors', () => {
      expect(result.errors[DaffCartErrorType.BillingAddress].length).toEqual(2);
    });
  });

  describe('when CartBillingAddressUpdateAction is triggered', () => {
    it('should set loading state to true', () => {
      const cartBillingAddressUpdateAction = new DaffCartBillingAddressUpdate(cart.billing_address);

      const result = reducer(initialState, cartBillingAddressUpdateAction);

      expect(result.loading).toEqual(true);
    });
  });

  describe('when CartBillingAddressUpdateActionSuccess is triggered', () => {
    let result;
    let state: DaffCartReducerState;

    beforeEach(() => {
      const cartBillingAddressUpdateActionSuccess = new DaffCartBillingAddressUpdateSuccess(cart);
      state = {
        ...initialState,
        loading: true
      }

      result = reducer(state, cartBillingAddressUpdateActionSuccess);
    });

    it('should set cart from action.payload', () => {
      expect(result.cart).toEqual(cart)
    });

    it('should indicate that the cart is not loading', () => {
      expect(result.loading).toEqual(false);
    });
  });

  describe('when CartBillingAddressUpdateFailureAction is triggered', () => {
    let error: string;
    let result;
    let state: DaffCartReducerState;

    beforeEach(() => {
      state = {
        ...initialState,
        loading: true,
        errors: {
          ...initialState.errors,
          [DaffCartErrorType.BillingAddress]: new Array('firstError')
        }
      }

      error = 'error';

      const cartBillingAddressUpdateFailure = new DaffCartBillingAddressUpdateFailure(error);

      result = reducer(state, cartBillingAddressUpdateFailure);
    });

    it('should indicate that the cart is not loading', () => {
      expect(result.loading).toEqual(false);
    });

    it('adds an error to the billing address section of state.errors', () => {
      expect(result.errors[DaffCartErrorType.BillingAddress].length).toEqual(2);
    });
  });
});
