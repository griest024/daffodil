import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { switchMap, map, catchError, switchMapTo, tap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  DaffCartActionTypes,
  DaffCartLoad,
  DaffCartLoadSuccess,
  DaffCartLoadFailure,
  DaffAddToCartSuccess,
  DaffAddToCartFailure,
  DaffAddToCart,
  DaffCartClear,
  DaffCartClearSuccess,
  DaffCartClearFailure,
  DaffCartCreate,
  DaffCartCreateSuccess,
  DaffCartCreateFailure,
} from '../actions';
import { DaffCart } from '../models/cart';
import { DaffCartServiceInterface, DaffCartDriver } from '../drivers/interfaces/cart-service.interface';
import { DaffCartStorageService } from '../storage/cart-storage.service';

@Injectable()
export class DaffCartEffects<T extends DaffCart> {
  isPlatformBrowser: boolean;

  constructor(
    private actions$: Actions,
    @Inject(DaffCartDriver) private driver: DaffCartServiceInterface<T>,
    private storage: DaffCartStorageService,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.isPlatformBrowser = isPlatformBrowser(platformId);
  }

  @Effect()
  create$ = this.actions$.pipe(
    ofType(DaffCartActionTypes.CartCreateAction),
    switchMap((action: DaffCartCreate) =>
      this.driver.create().pipe(
        map((resp: {id: T['id']}) => new DaffCartCreateSuccess(resp)),
        catchError(error => of(new DaffCartCreateFailure('Failed to create cart')))
      )
    )
  )

  @Effect({
    dispatch: false
  })
  storeId$ = this.actions$.pipe(
    ofType(DaffCartActionTypes.CartCreateSuccessAction),
    tap((action: DaffCartCreateSuccess<DaffCart>) => {
      if (this.isPlatformBrowser) this.storage.setCartId(String(action.payload.id))
    }),
    switchMapTo(EMPTY)
  )

  @Effect()
  get$ = this.actions$.pipe(
    ofType(DaffCartActionTypes.CartLoadAction),
    switchMap((action: DaffCartLoad) => this.isPlatformBrowser
      ? this.driver.get(this.storage.getCartId()).pipe(
        map((resp: T) => new DaffCartLoadSuccess(resp)),
        catchError(error => of(new DaffCartLoadFailure('Failed to load cart')))
      )
      : EMPTY
    )
  )

  @Effect()
  addToCart$ = this.actions$.pipe(
    ofType(DaffCartActionTypes.AddToCartAction),
    switchMap((action: DaffAddToCart) =>
      this.driver.addToCart(action.payload.productId, action.payload.qty).pipe(
        map((resp: T) => new DaffAddToCartSuccess(resp)),
        catchError(error => of(new DaffAddToCartFailure('Failed to add item to cart')))
      )
    )
  )

  @Effect()
  clear$ = this.actions$.pipe(
    ofType(DaffCartActionTypes.CartClearAction),
    switchMap((action: DaffCartClear) => this.isPlatformBrowser
      ? this.driver.clear(this.storage.getCartId()).pipe(
        map((resp: T) => new DaffCartClearSuccess(resp)),
        catchError(error => of(new DaffCartClearFailure('Failed to clear the cart.')))
      )
      : EMPTY
    )
  )
}
