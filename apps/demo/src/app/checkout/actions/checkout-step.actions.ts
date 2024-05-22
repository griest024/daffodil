import { Action } from '@ngrx/store';

import { DaffCart } from '@daffodil/cart';
import {
  DaffCartPaymentUpdate,
  DaffCartPaymentUpdateFailure,
  DaffCartPaymentUpdateSuccess,
  DaffCartShippingAddressUpdate,
  DaffCartShippingAddressUpdateFailure,
  DaffCartShippingAddressUpdateSuccess,
  DaffCartShippingInformationUpdate,
  DaffCartShippingInformationUpdateFailure,
  DaffCartShippingInformationUpdateSuccess,
} from '@daffodil/cart/state';
import { DaffStateError } from '@daffodil/core/state';

export enum DemoCheckoutStepActionTypes {
  CompleteAddressStepAction = '[@daffodil/demo] Checkout Complete Address Step Action',
  CompleteAddressStepSuccessAction = '[@daffodil/demo] Checkout Complete Address Step Success Action',
  CompleteAddressStepFailureAction = '[@daffodil/demo] Checkout Complete Address Step Failure Action',

  CompleteShippingStepAction = '[@daffodil/demo] Checkout Complete Shipping Step Action',
  CompleteShippingStepSuccessAction = '[@daffodil/demo] Checkout Complete Shipping Step Success Action',
  CompleteShippingStepFailureAction = '[@daffodil/demo] Checkout Complete Shipping Step Failure Action',

  CompletePaymentStepAction = '[@daffodil/demo] Checkout Complete Payment Step Action',
  CompletePaymentStepSuccessAction = '[@daffodil/demo] Checkout Complete Payment Step Success Action',
  CompletePaymentStepFailureAction = '[@daffodil/demo] Checkout Complete Payment Step Failure Action',
}

export class DemoCompleteAddressStep implements Action, Omit<DaffCartShippingAddressUpdate, keyof Action> {
  readonly type = DemoCheckoutStepActionTypes.CompleteAddressStepAction;

  constructor(public payload: DaffCart['shipping_address']) {}
}

export class DemoCompleteAddressStepSuccess implements Action, Omit<DaffCartShippingAddressUpdateSuccess, keyof Action> {
  readonly type = DemoCheckoutStepActionTypes.CompleteAddressStepSuccessAction;

  constructor(public payload: Partial<DaffCart>) {}
}

export class DemoCompleteAddressStepFailure implements Action, Omit<DaffCartShippingAddressUpdateFailure, keyof Action> {
  readonly type = DemoCheckoutStepActionTypes.CompleteAddressStepFailureAction;

  constructor(public payload: Array<DaffStateError>) {}
}

export class DemoCompleteShippingStep implements Action, Omit<DaffCartShippingInformationUpdate, keyof Action> {
  readonly type = DemoCheckoutStepActionTypes.CompleteShippingStepAction;

  constructor(public payload: DaffCart['shipping_information']) {}
}

export class DemoCompleteShippingStepSuccess implements Action, Omit<DaffCartShippingInformationUpdateSuccess, keyof Action> {
  readonly type = DemoCheckoutStepActionTypes.CompleteShippingStepSuccessAction;

  constructor(public payload: Partial<DaffCart>) {}
}

export class DemoCompleteShippingStepFailure implements Action, Omit<DaffCartShippingInformationUpdateFailure, keyof Action> {
  readonly type = DemoCheckoutStepActionTypes.CompleteShippingStepFailureAction;

  constructor(public payload: Array<DaffStateError>) {}
}

export class DemoCompletePaymentStep implements Action, Omit<DaffCartPaymentUpdate, keyof Action> {
  readonly type = DemoCheckoutStepActionTypes.CompletePaymentStepAction;

  constructor(public payload: DaffCart['payment']) {}
}

export class DemoCompletePaymentStepSuccess implements Action, Omit<DaffCartPaymentUpdateSuccess, keyof Action> {
  readonly type = DemoCheckoutStepActionTypes.CompletePaymentStepSuccessAction;

  constructor(public payload: Partial<DaffCart>) {}
}

export class DemoCompletePaymentStepFailure implements Action, Omit<DaffCartPaymentUpdateFailure, keyof Action> {
  readonly type = DemoCheckoutStepActionTypes.CompletePaymentStepFailureAction;

  constructor(public payload: Array<DaffStateError>) {}
}

export type DemoCheckoutStepActions =
  | DemoCompleteAddressStep
  | DemoCompleteAddressStepSuccess
  | DemoCompleteAddressStepFailure
  | DemoCompleteShippingStep
  | DemoCompleteShippingStepSuccess
  | DemoCompleteShippingStepFailure
  | DemoCompletePaymentStep
  | DemoCompletePaymentStepSuccess
  | DemoCompletePaymentStepFailure;
