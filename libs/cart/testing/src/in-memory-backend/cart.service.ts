import { Injectable } from '@angular/core';
import { STATUS, InMemoryDbService } from 'angular-in-memory-web-api';

import { DaffProductImageFactory } from '@daffodil/product/testing';
import { DaffCartItem, DaffCart } from '@daffodil/cart';

import { DaffCartFactory } from '../factories/cart.factory';
import { DaffCartItemFactory } from '../factories/cart-item.factory';
import { DaffCartShippingRateFactory } from '../factories/cart-shipping-rate.factory';
import { DaffCartPaymentFactory } from '../factories/cart-payment.factory';

@Injectable({
  providedIn: 'root'
})
export class DaffInMemoryBackendCartService implements InMemoryDbService {
  public carts: DaffCart[] = [];

  constructor(
    private cartFactory: DaffCartFactory,
    private cartItemFactory: DaffCartItemFactory,
    private productImageFactory: DaffProductImageFactory,
    private cartShippingRateFactory: DaffCartShippingRateFactory,
    private cartPaymentMethodFactory: DaffCartPaymentFactory
  ) {}

  createDb() {
    return {
      cart: this.carts
    };
  }

  // gets the discrete sections of the route
  // needed because in mem api does not support nested routes
  getRouteEndpoints(reqInfo: any): string[] {
    // get discrete sections of the base and request urls
    // annoying but still better than trying to deal with them as strings
    const baseEndpoints = reqInfo.resourceUrl.split('/').filter(e => e);
    const requestEndpoints = reqInfo.url.split('/').filter(e => e);

    // remove the base url parts
    return requestEndpoints.filter((e, i) => baseEndpoints[i] !== e)
  }

  get(reqInfo: any) {
    return reqInfo.utils.createResponse$(() => {
      const endpoints = this.getRouteEndpoints(reqInfo);
      let body = reqInfo.collection[0];

      if (endpoints.length === 3) {
        if (endpoints[1] === 'items') {
          body = this.getItem(reqInfo);
        }
      } else if (endpoints.length === 2) {
        if (endpoints[1] === 'paymentMethods') {
          body = this.listPaymentMethods(reqInfo);
        } else if (endpoints[1] === 'shippingAddress') {
          body = this.getShippingAddress(reqInfo);
        } else if (endpoints[1] === 'billingAddress') {
          body = this.getBillingAddress(reqInfo);
        } else if (endpoints[1] === 'shippingInfo') {
          body = this.getShippingInfo(reqInfo);
        } else if (endpoints[1] === 'items') {
          body = this.listItems(reqInfo);
        } else if (endpoints[1] === 'payment') {
          body = this.getPayment(reqInfo);
        } else if (endpoints[1] === 'shippingMethods') {
          body = this.listShippingMethods(reqInfo);
        }
      }

      return {
        body,
        status: STATUS.OK
      }
    })
  }

  private listItems(reqInfo) {
    return reqInfo.collection[0].items;
  }

  private getItem(reqInfo: any): any {
    const cart = reqInfo.collection[0];
    const endpoints = this.getRouteEndpoints(reqInfo);
    const itemId = endpoints[2];

    return cart.items.find(({item_id}) => String(item_id) === String(itemId))
  }

  private listPaymentMethods(reqInfo: any): any {
    return this.cartPaymentMethodFactory.createMany(3);
  }

  private getShippingAddress(reqInfo: any): any {
    const cart = reqInfo.collection[0];

    return cart.shipping_address
  }

  private getBillingAddress(reqInfo: any): any {
    const cart = reqInfo.collection[0];

    return cart.billing_address;
  }

  private getShippingInfo(reqInfo: any): any {
    const cart = reqInfo.collection[0];

    return cart.shipping_information;
  }

  private getPayment(reqInfo: any): any {
    const cart = reqInfo.collection[0];

    return cart.payment;
  }

  private listShippingMethods(reqInfo: any): any {
    return this.cartShippingRateFactory.createMany(3);
  }

  put(reqInfo: any) {
    return reqInfo.utils.createResponse$(() => {
      const endpoints = this.getRouteEndpoints(reqInfo);
      let body = reqInfo.collection[0];

      if (endpoints.length === 2) {
        if (endpoints[1] === 'shippingInfo') {
          body = this.updateShippingInfo(reqInfo);
        } else if (endpoints[1] === 'shippingAddress') {
          body = this.updateShippingAddress(reqInfo);
        } else if (endpoints[1] === 'billingAddress') {
          body = this.updateBillingAddress(reqInfo);
        } else if (endpoints[1] === 'payment') {
          body = this.updatePayment(reqInfo);
        }
      } else if (endpoints.length === 3) {
        if (endpoints[1] === 'items') {
          body = this.updateItem(reqInfo);
        }
      }

      return {
        body,
        status: STATUS.OK
      }
    })
  }

  private updateShippingInfo(reqInfo: any): any {
    const cart = reqInfo.collection[0];
    const shippingInfo = reqInfo.req.body;

    cart.shipping_information = {
      ...cart.shipping_information,
      ...shippingInfo
    };

    return cart
  }

  private updatePayment(reqInfo: any): any {
    const cart = reqInfo.collection[0];
    const payment = reqInfo.req.body;

    cart.payment = {
      ...cart.payment,
      ...payment
    };

    return cart
  }

  private updateShippingAddress(reqInfo: any): any {
    const cart = reqInfo.collection[0];
    const shippingAddress = reqInfo.req.body;

    cart.shipping_address = {
      ...cart.shipping_address,
      ...shippingAddress
    };

    return cart
  }

  private updateBillingAddress(reqInfo: any): any {
    const cart = reqInfo.collection[0];
    const billingAddress = reqInfo.req.body;

    cart.billing_address = {
      ...cart.billing_address,
      ...billingAddress
    };

    return cart
  }

  private updateItem(reqInfo: any): any {
    const cart = reqInfo.collection[0];
    const item = reqInfo.req.body;
    const endpoints = this.getRouteEndpoints(reqInfo);
    const itemId = endpoints[2];
    const itemIndex = cart.items.findIndex(({item_id}) => item_id === itemId)

    cart.items[itemIndex] = {
      ...cart.items[itemIndex],
      ...this.transformItem(item)
    };

    return cart
  }

  post(reqInfo: any) {
    return reqInfo.utils.createResponse$(() => {
      const endpoints = this.getRouteEndpoints(reqInfo);
      let body = reqInfo.collection[0];

      // deprecated
      if (reqInfo.id === 'addToCart') {
        const matchedProductIndex = this.getMatchedProductIndex(
          reqInfo.req.body.productId
        );
        if (matchedProductIndex > -1) {
          this.addQtyToCartProduct(
            reqInfo.req.body.qty,
            matchedProductIndex
          );
        } else {
          this.addProductToCart(
            reqInfo.req.body
          );
        }
        body = this.carts[0];
      }

      if (endpoints.length === 0) {
        // create cart
        body = this.create();
      } else if (endpoints.length === 2) {
        if (endpoints[1] === 'clear') {
          body = this.clearCart(reqInfo);
        } else if (endpoints[1] === 'items') {
          body = this.addItem(reqInfo);
        }
      }

      return {
        body,
        status: STATUS.OK
      };
    });
  }

  private clearCart(reqInfo: any): void {
    const cart = reqInfo.collection[0];

    cart.items = [];

    return cart
  }

  private create(): Partial<DaffCart> {
    const cart = this.cartFactory.create();

    this.carts.push(cart);

    return {
      id: cart.id
    };
  }

  private addItem(reqInfo: any): any {
    const cart = reqInfo.collection[0];
    const item = reqInfo.req.body;

    cart.items.push(this.transformItem(item));

    return cart;
  }

  delete(reqInfo: any) {
    return reqInfo.utils.createResponse$(() => {
      const endpoints = this.getRouteEndpoints(reqInfo);
      let body = reqInfo.collection[0];

      if (endpoints.length === 2) {
        if (endpoints[1] === 'payment') {
          body = this.deletePayment(reqInfo);
        } else if (endpoints[1] === 'shippingInfo') {
          body = this.deleteShippingInfo(reqInfo);
        }
      } else if (endpoints.length === 3) {
        if (endpoints[1] === 'items') {
          body = this.deleteItem(reqInfo);
        }
      }

      return {
        body,
        status: STATUS.OK
      }
    })
  }

  private deletePayment(reqInfo: any): any {
    const cart = reqInfo.collection[0];

    cart.payment = null;

    return cart;
  }

  private deleteShippingInfo(reqInfo: any): any {
    const cart = reqInfo.collection[0];

    cart.shipping_information = null;

    return cart;
  }

  private deleteItem(reqInfo: any): any {
    const cart = reqInfo.collection[0];
    const endpoints = this.getRouteEndpoints(reqInfo);
    const itemId = endpoints[2];
    const itemIndex = cart.items.findIndex(({item_id}) => item_id === itemId);

    cart.items.splice(itemIndex, 1);

    return cart;
  }

  private transformItem(item) {
    return {
      ...this.cartItemFactory.create(),
      ...item,
      product_id: item.productId
    }
  }

  private getMatchedProductIndex(productId: string) {
    const cart = this.carts[0];
    for (let i = 0; i < cart.items.length; i++) {
      if (productId === cart.items[i].product_id.toString()) {
        return i;
      }
    }

    return -1;
  }

  private addQtyToCartProduct(qty: number, matchedProductIndex: number) {
    this.carts[0].items[matchedProductIndex].qty += qty;
  }

  private addProductToCart(reqBody) {
    const cartItem: DaffCartItem = this.cartItemFactory.create({image: this.productImageFactory.create()});
    cartItem.product_id = reqBody.productId;
    cartItem.qty = reqBody.qty;
    this.carts[0].items.push(cartItem);
  }
}
