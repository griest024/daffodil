import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  DaffCartPaymentMethodsActionTypes,
  DaffCartPaymentMethodsLoad,
  DaffCartPaymentMethodsLoadSuccess,
  DaffCartPaymentMethodsLoadFailure,
} from '../actions';
import { DaffCartPaymentMethodsServiceInterface, DaffCartPaymentMethodsDriver } from '../drivers/interfaces/cart-payment-methods-service.interface';
import { DaffCartStorageService } from '../storage/cart-storage.service';
import { DaffCartPaymentMethod } from '../models/cart-payment';

@Injectable()
export class DaffCartPaymentMethodsEffects<T extends DaffCartPaymentMethod> {
  isPlatformBrowser: boolean;

  constructor(
    private actions$: Actions,
    @Inject(DaffCartPaymentMethodsDriver) private driver: DaffCartPaymentMethodsServiceInterface<T>,
    private storage: DaffCartStorageService,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.isPlatformBrowser = isPlatformBrowser(platformId);
  }

  @Effect()
  list$ = this.actions$.pipe(
    ofType(DaffCartPaymentMethodsActionTypes.CartPaymentMethodsLoadAction),
    switchMap((action: DaffCartPaymentMethodsLoad) => this.isPlatformBrowser
      ? this.driver.list(this.storage.getCartId()).pipe(
        map((resp: T[]) => new DaffCartPaymentMethodsLoadSuccess(resp)),
        catchError(error => of(new DaffCartPaymentMethodsLoadFailure('Failed to list cart payment methods')))
      )
      : EMPTY
    )
  )
}
