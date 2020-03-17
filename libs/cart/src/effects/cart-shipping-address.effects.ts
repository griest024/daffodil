import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  DaffCartShippingAddressActionTypes,
  DaffCartShippingAddressLoad,
  DaffCartShippingAddressLoadSuccess,
  DaffCartShippingAddressLoadFailure,
  DaffCartShippingAddressUpdate,
  DaffCartShippingAddressUpdateSuccess,
  DaffCartShippingAddressUpdateFailure,
} from '../actions';
import { DaffCart } from '../models/cart';
import { DaffCartAddress } from '../models/cart-address';
import { DaffCartShippingAddressServiceInterface, DaffCartShippingAddressDriver } from '../drivers/interfaces/cart-shipping-address-service.interface';
import { DaffCartStorageService } from '../storage/cart-storage.service';

@Injectable()
export class DaffCartShippingAddressEffects<T extends DaffCartAddress, V extends DaffCart> {
  isPlatformBrowser: boolean;

  constructor(
    private actions$: Actions,
    @Inject(DaffCartShippingAddressDriver) private driver: DaffCartShippingAddressServiceInterface<T, V>,
    private storage: DaffCartStorageService,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.isPlatformBrowser = isPlatformBrowser(platformId);
  }

  @Effect()
  get$ = this.actions$.pipe(
    ofType(DaffCartShippingAddressActionTypes.CartShippingAddressLoadAction),
    switchMap((action: DaffCartShippingAddressLoad) => this.isPlatformBrowser
      ? this.driver.get(this.storage.getCartId()).pipe(
        map((resp: T) => new DaffCartShippingAddressLoadSuccess(resp)),
        catchError(error => of(new DaffCartShippingAddressLoadFailure('Failed to load cart shipping address')))
      )
      : EMPTY
    )
  )

  @Effect()
  update$ = this.actions$.pipe(
    ofType(DaffCartShippingAddressActionTypes.CartShippingAddressUpdateAction),
    switchMap((action: DaffCartShippingAddressUpdate<T>) => this.isPlatformBrowser
      ? this.driver.update(this.storage.getCartId(), action.payload).pipe(
        map((resp: V) => new DaffCartShippingAddressUpdateSuccess(resp)),
        catchError(error => of(new DaffCartShippingAddressUpdateFailure('Failed to update cart shipping address')))
      )
      : EMPTY
    )
  )
}
