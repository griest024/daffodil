import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  DaffCartShippingMethodsActionTypes,
  DaffCartShippingMethodsLoad,
  DaffCartShippingMethodsLoadSuccess,
  DaffCartShippingMethodsLoadFailure,
} from '../actions';
import { DaffCartShippingMethodsServiceInterface, DaffCartShippingMethodsDriver } from '../drivers/interfaces/cart-shipping-methods-service.interface';
import { DaffCartShippingRate } from '../models/cart-shipping-rate';
import { DaffCartStorageService } from '../storage/cart-storage.service';

@Injectable()
export class DaffCartShippingMethodsEffects<T extends DaffCartShippingRate> {
  isPlatformBrowser: boolean;

  constructor(
    private actions$: Actions,
    @Inject(DaffCartShippingMethodsDriver) private driver: DaffCartShippingMethodsServiceInterface<T>,
    private storage: DaffCartStorageService,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.isPlatformBrowser = isPlatformBrowser(platformId);
  }

  @Effect()
  list$ = this.actions$.pipe(
    ofType(DaffCartShippingMethodsActionTypes.CartShippingMethodsLoadAction),
    switchMap((action: DaffCartShippingMethodsLoad) => this.isPlatformBrowser
      ? this.driver.list(this.storage.getCartId()).pipe(
        map((resp: T[]) => new DaffCartShippingMethodsLoadSuccess(resp)),
        catchError(error => of(new DaffCartShippingMethodsLoadFailure('Failed to list cart shipping methods')))
      )
      : EMPTY
    )
  )
}
