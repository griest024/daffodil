import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  DaffCartBillingAddressActionTypes,
  DaffCartBillingAddressLoad,
  DaffCartBillingAddressLoadSuccess,
  DaffCartBillingAddressLoadFailure,
  DaffCartBillingAddressUpdate,
  DaffCartBillingAddressUpdateSuccess,
  DaffCartBillingAddressUpdateFailure,
} from '../actions';
import { DaffCart } from '../models/cart';
import { DaffCartAddress } from '../models/cart-address';
import { DaffCartBillingAddressServiceInterface, DaffCartBillingAddressDriver } from '../drivers/interfaces/cart-billing-address-service.interface';
import { DaffCartStorageService } from '../storage/cart-storage.service';

@Injectable()
export class DaffCartBillingAddressEffects<T extends DaffCartAddress, V extends DaffCart> {
  isPlatformBrowser: boolean;

  constructor(
    private actions$: Actions,
    @Inject(DaffCartBillingAddressDriver) private driver: DaffCartBillingAddressServiceInterface<T, V>,
    private storage: DaffCartStorageService,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.isPlatformBrowser = isPlatformBrowser(platformId);
  }

  @Effect()
  get$ = this.actions$.pipe(
    ofType(DaffCartBillingAddressActionTypes.CartBillingAddressLoadAction),
    switchMap((action: DaffCartBillingAddressLoad) => this.isPlatformBrowser
      ? this.driver.get(this.storage.getCartId()).pipe(
        map((resp: T) => new DaffCartBillingAddressLoadSuccess(resp)),
        catchError(error => of(new DaffCartBillingAddressLoadFailure('Failed to load cart billing address')))
      )
      : EMPTY
    )
  )

  @Effect()
  update$ = this.actions$.pipe(
    ofType(DaffCartBillingAddressActionTypes.CartBillingAddressUpdateAction),
    switchMap((action: DaffCartBillingAddressUpdate<T>) => this.isPlatformBrowser
      ? this.driver.update(this.storage.getCartId(), action.payload).pipe(
        map((resp: V) => new DaffCartBillingAddressUpdateSuccess(resp)),
        catchError(error => of(new DaffCartBillingAddressUpdateFailure('Failed to update cart billing address')))
      )
      : EMPTY
    )
  )
}
