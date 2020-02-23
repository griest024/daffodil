import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { switchMap, tap } from 'rxjs/operators';

import {
  DaffCartAddress,
  DaffCartPaymentMethod,
  DaffCartShippingRate
} from '@daffodil/cart';
import {
  DaffCartAddressFactory,
  DaffCartPaymentFactory,
  DaffCartShippingRateFactory
} from '@daffodil/cart/testing';

import { DaffInMemoryBackendCartService } from './cart.service';

describe('DaffInMemoryBackendCartService | Integration', () => {
  let httpClient: HttpClient;

  let addressFactory: DaffCartAddressFactory;
  let paymentFactory: DaffCartPaymentFactory;
  let shippingRateFactory: DaffCartShippingRateFactory;

  let cartId;
  let mockAddress: DaffCartAddress;
  let mockPayment: DaffCartPaymentMethod;
  let mockShippingRate: DaffCartShippingRate;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(DaffInMemoryBackendCartService)
      ],
    });

    httpClient = TestBed.get(HttpClient);

    addressFactory = TestBed.get(DaffCartAddressFactory);
    paymentFactory = TestBed.get(DaffCartPaymentFactory);
    shippingRateFactory = TestBed.get(DaffCartShippingRateFactory);

    mockAddress = addressFactory.create();
    mockPayment = paymentFactory.create();
    mockShippingRate = shippingRateFactory.create();

    httpClient.post<any>('/api/cart', {}).pipe(
      tap(({id}) => {
        cartId = id;
      }),
    ).subscribe(() => done());
  });

  describe('processing a create request', () => {
    it('should return a partial with id', done => {
      httpClient.post<any>('/api/cart', {}).subscribe(result => {
        expect(result.id).toBeDefined();
        done();
      });
    });
  });

  // billing address
  describe('processing a get billing address request', () => {
    beforeEach(done => {
      httpClient.put<any>(`api/cart/${cartId}/billingAddress`, mockAddress).subscribe(() => done());
    });

    it('should return the billing address', done => {
      httpClient.get<any>(`api/cart/${cartId}/billingAddress`).subscribe(result => {
        expect(result).toEqual(jasmine.objectContaining(mockAddress));
        done();
      });
    });
  });

  describe('processing an update billing address request', () => {
    it('should return the updated cart with the updated billing address', done => {
      httpClient.put<any>(`api/cart/${cartId}/billingAddress`, mockAddress).subscribe(result => {
        expect(result.billing_address).toEqual(jasmine.objectContaining(mockAddress));
        done();
      });
    });
  });

  // shipping address
  describe('processing a get shipping address request', () => {
    beforeEach(done => {
      httpClient.put<any>(`api/cart/${cartId}/shippingAddress`, mockAddress).subscribe(() => done());
    });

    it('should return the shipping address', done => {
      httpClient.get<any>(`api/cart/${cartId}/shippingAddress`).subscribe(result => {
        expect(result).toEqual(jasmine.objectContaining(mockAddress));
        done();
      });
    });
  });

  describe('processing an update shipping address request', () => {
    it('should return the updated cart with the updated shipping address', done => {
      httpClient.put<any>(`api/cart/${cartId}/shippingAddress`, mockAddress).subscribe(result => {
        expect(result.shipping_address).toEqual(jasmine.objectContaining(mockAddress));
        done();
      });
    });
  });

  // shippingInfo
  describe('processing a get shippingInfo request', () => {
    beforeEach(done => {
      httpClient.put<any>(`api/cart/${cartId}/shippingInfo`, mockShippingRate).subscribe(() => done());
    });

    it('should return the shippingInfo', done => {
      httpClient.get<any>(`api/cart/${cartId}/shippingInfo`).subscribe(result => {
        expect(result).toEqual(jasmine.objectContaining(mockShippingRate));
        done();
      });
    });
  });

  describe('processing an update shippingInfo request', () => {
    it('should return the updated cart with the updated shippingInfo', done => {
      httpClient.put<any>(`api/cart/${cartId}/shippingInfo`, mockShippingRate).subscribe(result => {
        expect(result.shipping_information).toEqual(jasmine.objectContaining(mockShippingRate));
        done();
      });
    });
  });

  describe('processing a delete shippingInfo request', () => {
    beforeEach(done => {
      httpClient.put<any>(`api/cart/${cartId}/shippingInfo`, mockShippingRate).subscribe(() => done());
    });

    it('should return the updated cart without the shippingInfo', done => {
      httpClient.delete<any>(`api/cart/${cartId}/shippingInfo`).subscribe(result => {
        expect(result.shipping_information).toBeFalsy();
        done();
      });
    });
  });

  // payment
  describe('processing a get payment request', () => {
    beforeEach(done => {
      httpClient.put<any>(`api/cart/${cartId}/payment`, mockPayment).subscribe(() => done());
    });

    it('should return the payment', done => {
      httpClient.get<any>(`api/cart/${cartId}/payment`).subscribe(result => {
        expect(result).toEqual(jasmine.objectContaining(mockPayment));
        done();
      });
    });
  });

  describe('processing an update payment request', () => {
    it('should return the updated cart with the updated payment', done => {
      httpClient.put<any>(`api/cart/${cartId}/payment`, mockPayment).subscribe(result => {
        expect(result.payment).toEqual(jasmine.objectContaining(mockPayment));
        done();
      });
    });
  });

  describe('processing a delete payment request', () => {
    beforeEach(done => {
      httpClient.put<any>(`api/cart/${cartId}/payment`, mockPayment).subscribe(() => done());
    });

    it('should return the updated cart without the payment', done => {
      httpClient.delete<any>(`api/cart/${cartId}/payment`).subscribe(result => {
        expect(result.payment).toBeFalsy();
        done();
      });
    });
  });

  // payment methods
  describe('processing a list payment methods request', () => {
    it('should return the payment methods', done => {
      httpClient.get<any>(`api/cart/${cartId}/paymentMethods`).subscribe(result => {
        result.forEach((paymentMethod: DaffCartPaymentMethod) => {
          expect(paymentMethod.method).toBeDefined();
        })
        done();
      });
    });
  });

  // shipping methods
  describe('processing a list shipping methods request', () => {
    it('should return the shipping methods', done => {
      httpClient.get<any>(`api/cart/${cartId}/shippingMethods`).subscribe(result => {
        result.forEach((shippingMethod: DaffCartShippingRate) => {
          expect(shippingMethod.carrier).toBeDefined();
          expect(shippingMethod.carrier_title).toBeDefined();
          expect(shippingMethod.id).toBeDefined();
          expect(shippingMethod.method_description).toBeDefined();
          expect(shippingMethod.method_title).toBeDefined();
          expect(shippingMethod.price).toBeDefined();
        })
        done();
      });
    });
  });

  // cart-item
  describe('processing a list items request', () => {
    let productId;
    let qty;

    beforeEach(done => {
      productId = 'productId';
      qty = 4;
      httpClient.post<any>(`api/cart/${cartId}/items`, {
        productId,
        qty
      }).subscribe(() => done());
    });

    it('should return the items', done => {
      httpClient.get<any>(`api/cart/${cartId}/items`).subscribe(result => {
        expect(result[0].product_id).toEqual(productId);
        expect(result[0].qty).toEqual(qty);
        done();
      });
    });
  });

  describe('processing a get item request', () => {
    let productId;
    let qty;
    let itemId;

    beforeEach(done => {
      productId = 'productId';
      qty = 4;
      httpClient.post<any>(`api/cart/${cartId}/items`, {
        productId,
        qty
      }).subscribe(cart => {
        itemId = cart.items[0].item_id;
        done()
      });
    });

    it('should return the item', done => {
      httpClient.get<any>(`api/cart/${cartId}/items/${itemId}`).subscribe(result => {
        expect(result.product_id).toEqual(productId);
        expect(result.qty).toEqual(qty);
        done();
      });
    });
  });

  describe('processing an update item request', () => {
    let productId;
    let qty;
    let itemId;

    beforeEach(done => {
      productId = 'productId';
      qty = 4;
      httpClient.post<any>(`api/cart/${cartId}/items`, {
        productId,
        qty
      }).subscribe(cart => {
        itemId = cart.items[0].item_id;
        done()
      });
    });

    it('should return the updated cart with the updated item', done => {
      const newQty = 2;
      httpClient.put<any>(`api/cart/${cartId}/items/${itemId}`, {qty: newQty}).subscribe(result => {
        expect(result.items[0].qty).toEqual(qty);
        done();
      });
    });
  });

  describe('processing an add item request', () => {
    let productId;
    let qty;

    beforeEach(() => {
      productId = 'productId';
      qty = 4;
    });

    it('should return the updated cart with the added item', done => {
      httpClient.post<any>(`api/cart/${cartId}/items`, {
        productId,
        qty
      }).subscribe(result => {
        expect(result.items[0].product_id).toEqual(productId);
        expect(result.items[0].qty).toEqual(qty);
        done();
      });
    });
  });

  describe('processing a delete item request', () => {
    let productId;
    let qty;
    let itemId;

    beforeEach(done => {
      productId = 'productId';
      qty = 4;
      httpClient.post<any>(`api/cart/${cartId}/items`, {
        productId,
        qty
      }).subscribe(cart => {
        itemId = cart.items[0].item_id;
        done()
      });
    });

    it('should return the updated cart without the item', done => {
      httpClient.delete<any>(`api/cart/${cartId}/items/${itemId}`).subscribe(result => {
        expect(result.items.find(item => item.product_id === productId && item.qty === qty)).toBeFalsy();
        done();
      });
    });
  });

  // cart
  describe('processing a clear request', () => {
    beforeEach(done => {
      httpClient.post<any>('/api/cart/', {
        cartId,
        productId: 'replaceme',
        qty: 4
      }).subscribe(() => done());
    });

    it('should remove the items in the cart', done => {
      httpClient.post<any>(`api/cart/${cartId}/clear`, {cartId}).subscribe(result => {
        expect(result.items.length).toEqual(0);
        done();
      });
    });
  });

  describe('processing a get request', () => {
    it('should return the correct cart', done => {
      httpClient.get<any>(`/api/cart/${cartId}`).subscribe(result => {
        expect(result.id).toEqual(cartId);
        done();
      });
    });
  });

  describe('processing an addToCart request', () => {
    let productIdValue;

    describe('and product is unique', () => {
      it('should add an item to the cart', done => {
        httpClient.post<any>('/api/cart/addToCart', {
          cartId,
          productId: 'addToCartTest'
        }).subscribe(result => {
          expect(result.items.length).toEqual(1);
          done();
        });
      });

      it('should set qty of the cartItem to the given qty value', done => {
        const qty = 2

        httpClient.post<any>('/api/cart/addToCart', {cartId, qty, productId: 'qtyTest'}).subscribe(result => {
          expect(result.items[0].qty).toEqual(qty);
          done();
        });
      });

      it('should set productId of the cartItem to the given productId value', done => {
        productIdValue = 'productIdTest';

        httpClient.post<any>('/api/cart/addToCart', {cartId, productId: productIdValue}).subscribe(result => {
          expect(result.items[0].product_id).toEqual(productIdValue);
          done();
        });
      });

      it('should set an image on cartItem', done => {
        productIdValue = 'imageTest';

        httpClient.post<any>('/api/cart/addToCart', {cartId, productId: productIdValue}).subscribe(result => {
          expect(result.items[0].image).toBeDefined();
          done();
        });
      });
    });

    describe('and product is not unique', () => {
      it('should add given qty to existing product', done => {
        const qty = 2;
        const body = {
          cartId,
          productId: 'qtyTest',
          qty
        };

        httpClient.post<any>('/api/cart/addToCart', body).subscribe(result => {
          expect(result.items[0].qty).toEqual(qty);

          httpClient.post<any>('/api/cart/addToCart', body).subscribe(res => {
            expect(res.items[0].qty).toEqual(qty * 2);
            done();
          });
        });

      });
    });
  });
});
