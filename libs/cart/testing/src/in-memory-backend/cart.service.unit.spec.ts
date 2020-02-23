import { TestBed } from '@angular/core/testing';
import { STATUS } from 'angular-in-memory-web-api';

import {
  DaffCart,
  DaffCartItemInput,
  DaffCartItem
} from '@daffodil/cart';
import {
  DaffCartFactory,
  DaffCartItemFactory
} from '@daffodil/cart/testing';

import { DaffInMemoryBackendCartService } from './cart.service';

describe('DaffInMemoryBackendCartService | Unit', () => {
  let service: DaffInMemoryBackendCartService;
  let cartFactory: DaffCartFactory;
  let cartItemFactory: DaffCartItemFactory;

  let mockCart: DaffCart;
  let mockCartItemInput: DaffCartItemInput;
  let mockCartItem: DaffCartItem;
  let cartId;
  let reqInfoStub;
  let baseUrl;
  let cartUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DaffInMemoryBackendCartService,
      ]
    });
    service = TestBed.get(DaffInMemoryBackendCartService);

    cartFactory = TestBed.get(DaffCartFactory);
    cartItemFactory = TestBed.get(DaffCartItemFactory);

    mockCart = cartFactory.create();
    mockCartItem = cartItemFactory.create();
    mockCartItemInput = {
      productId: mockCartItem.product_id,
      qty: mockCartItem.qty
    };
    cartId = mockCart.id;
    baseUrl = 'api/cart';
    cartUrl = `${baseUrl}/${cartId}`;
    reqInfoStub = {
      id: '',
      resourceUrl: baseUrl,
      collection: [
        mockCart
      ],
      req: {
        body: {}
      },
      utils: {
        createResponse$: func => {
          return func();
        }
      }
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('after initialization', () => {
    let result;

    beforeEach(() => {
      result = service.createDb();
    });

    it('should have an empty array in DB', () => {
      result = service.createDb();
      expect(result.cart).toEqual([]);
    });
  });

  describe('processing a create request', () => {
    let result;

    beforeEach(() => {
      service.carts.push(mockCart);

      reqInfoStub.url = baseUrl;
    });

    it('should return a partial with id', () => {
      result = service.post(reqInfoStub);

      const id = result.body.id;

      expect(id).toBeDefined();
    });

    it('should store a cart in the DB', () => {
      result = service.post(reqInfoStub);

      const id = result.body.id;

      expect(service.carts.find(cart => cart.id === id)).toBeTruthy()
    });
  });

  describe('processing a clear request', () => {
    let result;

    beforeEach(() => {
      mockCart.items.push(mockCartItem);
      service.carts.push(mockCart);

      reqInfoStub.url = `${cartUrl}/clear`;
    });

    it('should remove the items in the cart', () => {
      result = service.post(reqInfoStub);

      expect(result.body.items.length).toEqual(0);
    });
  });

  describe('processing an addToCart request', () => {
    let result;
    let productIdValue;

    beforeEach(() => {
      reqInfoStub.id = 'addToCart';
      reqInfoStub.req.body = mockCartItemInput;
      reqInfoStub.url = `${cartUrl}/addToCart`;

      service.carts.push(mockCart);
    });

    describe('and product is unique', () => {
      it('should add an item to the cart', () => {
        reqInfoStub.req.body.productId = 'addToCartTest';
        result = service.post(reqInfoStub);

        expect(result.body.items.length).toEqual(1);
      });

      it('should set qty of the cartItem to the given qty value', () => {
        reqInfoStub.req.body.productId = 'qtyTest';
        reqInfoStub.req.body.qty = 2;

        result = service.post(reqInfoStub);

        expect(result.body.items[0].qty).toEqual(2);
      });

      it('should set productId of the cartItem to the given productId value', () => {
        productIdValue = 'productIdTest';
        reqInfoStub.req.body.productId = productIdValue;

        result = service.post(reqInfoStub);

        expect(result.body.items[0].product_id).toEqual(productIdValue);
      });

      it('should set an image on cartItem', () => {
        productIdValue = 'imageTest';

        result = service.post(reqInfoStub);

        expect(result.body.items[0].image).toBeDefined();
      });
    });

    describe('and product is not unique', () => {
      it('should add given qty to existing product', () => {
        reqInfoStub.req.body.productId = 'qtyTest';
        reqInfoStub.req.body.qty = 2;

        result = service.post(reqInfoStub);

        expect(result.body.items[0].qty).toEqual(2);

        result = service.post(reqInfoStub);

        expect(result.body.items[0].qty).toEqual(4);
      });
    });
  });
});
