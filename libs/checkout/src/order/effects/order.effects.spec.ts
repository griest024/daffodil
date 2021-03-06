import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

import { DaffCart, DaffCartDriver, DaffCartServiceInterface } from '@daffodil/cart';
import { DaffTestingCartService, DaffCartFactory } from '@daffodil/cart/testing';
import { DaffTestingCheckoutService, DaffOrderFactory } from '@daffodil/checkout/testing';

import { OrderEffects } from './order.effects';
import { DaffPlaceOrder, DaffPlaceOrderSuccess, DaffPlaceOrderFailure } from '../actions/order.actions';
import { DaffCheckoutServiceInterface } from '../../drivers/interfaces/checkout-service.interface';
import { DaffCheckoutDriver } from '../../drivers/injection-tokens/driver-checkout.token';
import { Order } from '../../models/order/order';

describe('Daffodil | State | Order | OrderEffects', () => {
  let actions$: Observable<any>;
  let effects: OrderEffects<DaffCart>;
  let daffCheckoutDriver: DaffCheckoutServiceInterface;
  let daffCartDriver: DaffCartServiceInterface<DaffCart>;
  let stubOrder: Order;
  let orderFactory: DaffOrderFactory;
  let stubCart: DaffCart;
  let cartFactory: DaffCartFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderEffects,
        provideMockActions(() => actions$),
        {
          provide: DaffCheckoutDriver,
          useExisting: DaffTestingCheckoutService
        },
        {
          provide: DaffCartDriver,
          useExisting: DaffTestingCartService
        }
      ]
    });

    effects = TestBed.get(OrderEffects);
    orderFactory = TestBed.get(DaffOrderFactory);
    cartFactory = TestBed.get(DaffCartFactory);
    daffCartDriver = TestBed.get(DaffCartDriver);
    daffCheckoutDriver = TestBed.get(DaffCheckoutDriver);

    stubCart = cartFactory.create();
    stubOrder = orderFactory.create();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('when PlaceOrderAction is triggered', () => {
    let expected;

    describe('and the call to CartService is successful', () => {
      
      beforeEach(() => {
        spyOn(daffCheckoutDriver, 'placeOrder').and.returnValue(of(stubOrder));
        const placeOrderAction = new DaffPlaceOrder(stubCart);
        const placeOrderSuccessAction = new DaffPlaceOrderSuccess(stubOrder);
        actions$ = hot('--a', { a: placeOrderAction });
        expected = cold('--b', { b: placeOrderSuccessAction });
      });
      
      it('should dispatch a DaffPlaceOrderSuccess action', () => {
        expect(effects.onPlaceOrder$).toBeObservable(expected);
      });
    });
    
    describe('and the call to CartService fails', () => {
      
      beforeEach(() => {
        const error = 'Failed to place order';
        const response = cold('#', {}, error);
        spyOn(daffCheckoutDriver, 'placeOrder').and.returnValue(response);
        const placeOrderAction = new DaffPlaceOrder(stubCart);
        const placeOrderFailureAction = new DaffPlaceOrderFailure(error);
        actions$ = hot('--a', { a: placeOrderAction });
        expected = cold('--b', { b: placeOrderFailureAction });
      });
      
      it('should dispatch a DaffPlaceOrderFailure action', () => {
        expect(effects.onPlaceOrder$).toBeObservable(expected);
      });
    });
  });

  describe('when PlaceOrderSuccessAction is triggered', () => {
    
    let expected;
    const placeOrderSuccessAction = new DaffPlaceOrderSuccess(stubOrder);

    beforeEach(() => {
      spyOn(daffCartDriver, 'clear').and.returnValue(of());
      actions$ = hot('--a', { a: placeOrderSuccessAction });
      expected = cold('--b', { b: placeOrderSuccessAction });
    });
    
    it('should call driver.cartService.clear', () => {
      expect(effects.onPlaceOrderSuccess$).toBeObservable(expected);

      expect(daffCartDriver.clear).toHaveBeenCalled();
    });
  });
});
