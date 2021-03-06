import { TestBed } from '@angular/core/testing';

import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';

import { DaffCartLoad, DaffCartLoadSuccess } from '@daffodil/cart';

import { DaffCartFacade } from './cart.facade';
import { State, reducers } from '../../reducers';
import { DaffCartFactory } from '@daffodil/cart/testing';

describe('DaffCartFacade', () => {
  let store: MockStore<{ product: Partial<State> }>;
  let facade: DaffCartFacade;
  let cartFactory: DaffCartFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          cart: combineReducers(reducers),
        })
      ],
      providers: [
        DaffCartFacade,
      ]
    })

    store = TestBed.get(Store);
    facade = TestBed.get(DaffCartFacade);
    cartFactory = TestBed.get(DaffCartFactory);
  });

  it('should be created', () => {
    const service: DaffCartFacade = TestBed.get(DaffCartFacade);
    expect(service).toBeTruthy();
  });

  it('should be able to dispatch an action to the store', () => {
    spyOn(store, 'dispatch');
    const action = { type: 'SOME_TYPE' };

    facade.dispatch(action);
    expect(store.dispatch).toHaveBeenCalledWith(action);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  describe('loading$', () => {
    it('should be false if the cart is not loading', () => {
      const expected = cold('a', { a: false });
      expect(facade.loading$).toBeObservable(expected);
    });

    it('should be true if the cart is loading', () => {
      const expected = cold('a', { a: true });
      store.dispatch(new DaffCartLoad());
      expect(facade.loading$).toBeObservable(expected);
    });
  });

  describe('cart$', () => {
    it('should initially be null', () => {
      const expected = cold('a', { a: null});
      expect(facade.cart$).toBeObservable(expected);
    });

    it('should be the cart upon a successful load', () => {
      const cart = cartFactory.create();
      const expected = cold('a', { a: cart});
      store.dispatch(new DaffCartLoadSuccess(cart));
      expect(facade.cart$).toBeObservable(expected);
    });
  })
});
