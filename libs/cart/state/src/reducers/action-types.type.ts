import {
  DaffCart,
  DaffCartAddress,
  DaffCartCoupon,
  DaffCartItemInput,
  DaffCartPaymentMethod,
  DaffCartShippingRate,
} from '@daffodil/cart';

import {
  DaffCartActions,
  DaffCartItemActions,
  DaffCartBillingAddressActions,
  DaffCartShippingAddressActions,
  DaffCartShippingMethodsActions,
  DaffCartShippingInformationActions,
  DaffCartPaymentActions,
  DaffCartPaymentMethodsActions,
  DaffCartCouponActions,
  DaffCartAddressActions,
} from '../actions/public_api';
import { DaffStatefulCartItem } from '../models/public_api';

export type ActionTypes<
	T extends DaffCart = DaffCart,
	V extends DaffStatefulCartItem = DaffStatefulCartItem,
	U extends DaffCartItemInput = DaffCartItemInput,
	W extends DaffCartAddress = DaffCartAddress,
	X extends DaffCartShippingRate = DaffCartShippingRate,
  Y extends DaffCartPaymentMethod = DaffCartPaymentMethod,
  Z extends DaffCartCoupon = DaffCartCoupon
> = DaffCartActions<T>
  | DaffCartItemActions<V, U, T>
  | DaffCartBillingAddressActions<W, T>
  | DaffCartShippingAddressActions<W, T>
  | DaffCartAddressActions<W, T>
  | DaffCartShippingMethodsActions<X>
  | DaffCartShippingInformationActions<X, T>
  | DaffCartPaymentActions<Y, T, W>
  | DaffCartPaymentMethodsActions<Y>
  | DaffCartCouponActions<T, Z>;
