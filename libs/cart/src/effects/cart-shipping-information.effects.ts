import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  DaffCartShippingInformationActionTypes,
  DaffCartShippingInformationLoad,
  DaffCartShippingInformationLoadSuccess,
  DaffCartShippingInformationLoadFailure,
  DaffCartShippingInformationDelete,
  DaffCartShippingInformationDeleteSuccess,
  DaffCartShippingInformationDeleteFailure,
  DaffCartShippingInformationUpdate,
  DaffCartShippingInformationUpdateSuccess,
  DaffCartShippingInformationUpdateFailure,
} from '../actions';
import { DaffCart } from '../models/cart';
import { DaffCartShippingInformation } from '../models/cart-shipping-info';
import { DaffCartShippingInformationServiceInterface, DaffCartShippingInformationDriver } from '../drivers/interfaces/cart-shipping-information-service.interface';
import { DaffCartStorageService } from '../storage/cart-storage.service';
import { DaffCartShippingRate } from '../models/cart-shipping-rate';

@Injectable()
export class DaffCartShippingInformationEffects<T extends DaffCartShippingInformation, V extends DaffCart> {
  isPlatformBrowser: boolean;

  constructor(
    private actions$: Actions,
    @Inject(DaffCartShippingInformationDriver) private driver: DaffCartShippingInformationServiceInterface<T, V>,
    private storage: DaffCartStorageService,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.isPlatformBrowser = isPlatformBrowser(platformId);
  }

  @Effect()
  get$ = this.actions$.pipe(
    ofType(DaffCartShippingInformationActionTypes.CartShippingInformationLoadAction),
    switchMap((action: DaffCartShippingInformationLoad) => this.isPlatformBrowser
      ? this.driver.get(this.storage.getCartId()).pipe(
        map((resp: T) => new DaffCartShippingInformationLoadSuccess(resp)),
        catchError(error => of(new DaffCartShippingInformationLoadFailure('Failed to load cart shipping information')))
      )
      : EMPTY
    )
  )

  @Effect()
  update$ = this.actions$.pipe(
    ofType(DaffCartShippingInformationActionTypes.CartShippingInformationUpdateAction),
    switchMap((action: DaffCartShippingInformationUpdate<T>) => this.isPlatformBrowser
      ? this.driver.update(this.storage.getCartId(), action.payload).pipe(
        map((resp: V) => new DaffCartShippingInformationUpdateSuccess(resp)),
        catchError(error => of(new DaffCartShippingInformationUpdateFailure('Failed to update cart shipping information')))
      )
      : EMPTY
    )
  )

  @Effect()
  delete$ = this.actions$.pipe(
    ofType(DaffCartShippingInformationActionTypes.CartShippingInformationDeleteAction),
    switchMap((action: DaffCartShippingInformationDelete<V['shipping_information']>) => this.isPlatformBrowser
      ? this.driver.delete(this.storage.getCartId()).pipe(
        map((resp: V) => new DaffCartShippingInformationDeleteSuccess(resp)),
        catchError(error => of(new DaffCartShippingInformationDeleteFailure('Failed to delete the cart shipping information')))
      )
      : EMPTY
    )
  )
}
