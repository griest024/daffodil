import {
  Inject,
  Injectable,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import {
  EMPTY,
  Observable,
  of,
} from 'rxjs';
import {
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import { DaffCartStorageService } from '@daffodil/cart';
import {
  DaffCartShippingAddressDriver,
  DaffCartShippingAddressServiceInterface,
  daffCartDriverHandleCartNotFound,
} from '@daffodil/cart/driver';
import { DaffCartOrderActionTypes } from '@daffodil/cart/state';
import { catchAndArrayifyErrors } from '@daffodil/core';

import {
  DemoCheckoutStepActionTypes,
  DemoCheckoutStepActions,
  DemoCompleteAddressStepFailure,
  DemoCompleteAddressStepSuccess,
} from '../actions/checkout-step.actions';
import { ShowReviewView } from '../actions/checkout.actions';
import { PaymentActionTypes } from '../actions/payment.actions';
import {
  DemoCheckoutStep,
  DemoCheckoutStepService,
} from '../step/public_api';

@Injectable()
export class CheckoutEffects {
  constructor(
    private actions$: Actions<DemoCheckoutStepActions>,
    private router: Router,
    private stepService: DemoCheckoutStepService,
    private storage: DaffCartStorageService,
    @Inject(DaffCartShippingAddressDriver) private shippingAddressDriver: DaffCartShippingAddressServiceInterface,
  ) {}

  completeAddressStep$ = createEffect(() => this.actions$.pipe(
    ofType(DemoCheckoutStepActionTypes.CompleteAddressStepAction),
    switchMap((action) =>
      this.shippingAddressDriver.update(this.storage.getCartId(), action.payload).pipe(
        map((resp) => new DemoCompleteAddressStepSuccess(resp)),
        daffCartDriverHandleCartNotFound(this.storage),
        catchAndArrayifyErrors((errors) => of(new DemoCompleteAddressStepFailure(errors))),
      ),
    ),
  ));

  onCompleteAddressStep$ = createEffect(() => this.actions$.pipe(
    ofType(DemoCheckoutStepActionTypes.CompleteAddressStepSuccessAction),
    tap(() => this.stepService.goToStep(DemoCheckoutStep.SHIPPING)),
    switchMap(() => EMPTY),
  ), {
    dispatch: false,
  });

  onToggleShowPaymentForm$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(PaymentActionTypes.ToggleShowPaymentFormAction),
    map(() => new ShowReviewView()),
  ));


  onPlaceOrder$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(DaffCartOrderActionTypes.CartPlaceOrderAction),
    tap(() => {
      this.router.navigateByUrl('/checkout/thank-you');
    }),
  ), { dispatch: false });
}
