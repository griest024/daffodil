import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  DaffCartItemActionTypes,
  DaffCartItemLoad,
  DaffCartItemLoadSuccess,
  DaffCartItemLoadFailure,
  DaffCartItemDelete,
  DaffCartItemDeleteSuccess,
  DaffCartItemDeleteFailure,
  DaffCartItemUpdate,
  DaffCartItemUpdateSuccess,
  DaffCartItemUpdateFailure,
  DaffCartItemList,
  DaffCartItemListSuccess,
  DaffCartItemListFailure,
  DaffCartItemAdd,
  DaffCartItemAddSuccess,
  DaffCartItemAddFailure,
} from '../actions';
import { DaffCart } from '../models/cart';
import { DaffCartItem } from '../models/cart-item';
import { DaffCartItemServiceInterface, DaffCartItemDriver } from '../drivers/interfaces/cart-item-service.interface';
import { DaffCartStorageService } from '../storage/cart-storage.service';
import { DaffCartItemInput } from '../models/cart-item-input';

@Injectable()
export class DaffCartItemEffects<
  T extends DaffCartItem,
  U extends DaffCartItemInput,
  V extends DaffCart
> {
  isPlatformBrowser: boolean;

  constructor(
    private actions$: Actions,
    @Inject(DaffCartItemDriver) private driver: DaffCartItemServiceInterface<T, U, V>,
    private storage: DaffCartStorageService,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.isPlatformBrowser = isPlatformBrowser(platformId);
  }

  @Effect()
  list$ = this.actions$.pipe(
    ofType(DaffCartItemActionTypes.CartItemListAction),
    switchMap((action: DaffCartItemList) => this.isPlatformBrowser
      ? this.driver.list(this.storage.getCartId()).pipe(
        map((resp: T[]) => new DaffCartItemListSuccess(resp)),
        catchError(error => of(new DaffCartItemListFailure('Failed to list cart items')))
      )
      : EMPTY
    )
  )

  @Effect()
  get$ = this.actions$.pipe(
    ofType(DaffCartItemActionTypes.CartItemLoadAction),
    switchMap((action: DaffCartItemLoad<T>) => this.isPlatformBrowser
      ? this.driver.get(this.storage.getCartId(), action.itemId).pipe(
        map((resp: T) => new DaffCartItemLoadSuccess(resp)),
        catchError(error => of(new DaffCartItemLoadFailure('Failed to load cart item')))
      )
      : EMPTY
    )
  )

  @Effect()
  add$ = this.actions$.pipe(
    ofType(DaffCartItemActionTypes.CartItemAddAction),
    switchMap((action: DaffCartItemAdd<U>) => this.isPlatformBrowser
      ? this.driver.add(
        this.storage.getCartId(),
        action.input
      ).pipe(
        map((resp: V) => new DaffCartItemAddSuccess(resp)),
        catchError(error => of(new DaffCartItemAddFailure('Failed to add cart item')))
      )
      : EMPTY
    )
  )

  @Effect()
  update$ = this.actions$.pipe(
    ofType(DaffCartItemActionTypes.CartItemUpdateAction),
    switchMap((action: DaffCartItemUpdate<T>) => this.isPlatformBrowser
      ? this.driver.update(
        this.storage.getCartId(),
        action.itemId,
        action.changes
      ).pipe(
        map((resp: V) => new DaffCartItemUpdateSuccess(resp)),
        catchError(error => of(new DaffCartItemUpdateFailure('Failed to update cart item')))
      )
      : EMPTY
    )
  )

  @Effect()
  delete$ = this.actions$.pipe(
    ofType(DaffCartItemActionTypes.CartItemDeleteAction),
    switchMap((action: DaffCartItemDelete<T>) => this.isPlatformBrowser
      ? this.driver.delete(this.storage.getCartId(), action.itemId).pipe(
        map((resp: V) => new DaffCartItemDeleteSuccess(resp)),
        catchError(error => of(new DaffCartItemDeleteFailure('Failed to remove the cart item')))
      )
      : EMPTY
    )
  )
}
