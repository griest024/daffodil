import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {
  DaffCart,
  DaffCartAddress
} from '@daffodil/cart';
import {
  DaffCartFactory,
  DaffCartAddressFactory
} from '@daffodil/cart/testing';

import { DaffInMemoryCartBillingAddressService } from './cart-billing-address.service';

describe('Driver | In Memory | Cart | CartService', () => {
  let cartBillingAddressService: DaffInMemoryCartBillingAddressService;
  let httpMock: HttpTestingController;
  let cartFactory: DaffCartFactory;
  let cartAddressFactory: DaffCartAddressFactory;

  let mockCart: DaffCart;
  let mockCartAddress: DaffCartAddress;
  let cartId;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DaffInMemoryCartBillingAddressService
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    cartFactory = TestBed.get(DaffCartFactory);
    cartAddressFactory = TestBed.get(DaffCartAddressFactory);
    cartBillingAddressService = TestBed.get(DaffInMemoryCartBillingAddressService);

    mockCart = cartFactory.create();
    mockCartAddress = cartAddressFactory.create();
    cartId = mockCart.id;
    mockCart.billing_address = mockCartAddress;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(cartBillingAddressService).toBeTruthy();
  });

  describe('get | getting a cart billing address', () => {
    it('should send a get request and return the cart billing address', done => {
      cartBillingAddressService.get(cartId).subscribe(res => {
        expect(res).toEqual(jasmine.objectContaining(mockCartAddress));
        done();
      });

      const req = httpMock.expectOne(`${cartBillingAddressService.url}/${cartId}/billingAddress`);

      expect(req.request.method).toBe('GET');
      req.flush(mockCartAddress);
    });
  });

  describe('update', () => {
    let mockCartAddressUpdate: DaffCartAddress;

    beforeEach(() => {
      mockCartAddressUpdate = cartAddressFactory.create();
      mockCart.billing_address = mockCartAddressUpdate;
    });

    it('should send a put request to `api/cart/billingAddress` and respond with a cart with the updated billing address', done => {
      cartBillingAddressService.update(cartId, mockCartAddressUpdate).subscribe(cart => {
        expect(cart).toEqual(jasmine.objectContaining(mockCart));
        done();
      });

      const req = httpMock.expectOne(`${cartBillingAddressService.url}/billingAddress`);

      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({
        cartId,
        address: mockCartAddressUpdate
      });

      req.flush(mockCart);
    });
  });
});
