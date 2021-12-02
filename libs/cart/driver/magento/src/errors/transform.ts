import { ApolloError } from '@apollo/client/core';

import {
  DaffCartCoupon,
  DaffCartItem,
} from '@daffodil/cart';
import {
  DaffCartDriverErrorMap,
  DaffCartItemExceedsMaxQtyError,
  DaffInvalidCouponCodeError,
  DaffProductOutOfStockError,
} from '@daffodil/cart/driver';
import { daffTransformMagentoError } from '@daffodil/driver/magento';

import {
  DaffCartMagentoErrorMap,
  DaffCartMagentoErrorMessageRegexMap,
} from './map';


function transformMagentoCartGraphQlError(error: ApolloError, requestPayload?: unknown): Error {
  // TODO: readdress this when we move to eslint
  // eslint-disable-next-line
  for (const code in DaffCartMagentoErrorMessageRegexMap) {
    const matchIndex = error.graphQLErrors[0].message.search(DaffCartMagentoErrorMessageRegexMap[code]);

    if (matchIndex > -1 && DaffCartDriverErrorMap[code]) {
      const errObj = new DaffCartDriverErrorMap[code](error.message);

      if (errObj instanceof DaffInvalidCouponCodeError) {
        (<DaffInvalidCouponCodeError>errObj).coupon = (<DaffCartCoupon>requestPayload)?.code;
      } else if (errObj instanceof DaffProductOutOfStockError) {
        (<DaffProductOutOfStockError>errObj).itemId = <DaffCartItem['id']>requestPayload;
      } else if (errObj instanceof DaffCartItemExceedsMaxQtyError) {
        (<DaffCartItemExceedsMaxQtyError>errObj).itemId = <DaffCartItem['id']>requestPayload;
      }

      return errObj;
    }
  }

  return daffTransformMagentoError(error, DaffCartMagentoErrorMap);
};

export function transformCartMagentoError(error, requestPayload?: unknown) {
  if (error.graphQLErrors?.length) {
    return transformMagentoCartGraphQlError(error, requestPayload);
  } else {
    return daffTransformMagentoError(error, DaffCartMagentoErrorMap);
  }
}
