import {
  waitForAsync,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { Store } from '@ngrx/store';
import {
  provideMockStore,
  MockStore,
} from '@ngrx/store/testing';

import { DaffAddress } from '@daffodil/core';
import { DaffAddressFactory } from '@daffodil/core/testing';

import { DaffCheckoutShippingAddressContainer } from './shipping-address.component';
import {
  DaffUpdateShippingAddress,
  DaffSelectShippingOption,
} from '../actions/address.actions';
import {
  selectShippingAddress,
  selectShippingOptionId,
  selectIsShippingAddressValid,
} from '../selectors/address.selectors';

describe('DaffCheckoutShippingAddressContainer', () => {
  let component: DaffCheckoutShippingAddressContainer;
  let fixture: ComponentFixture<DaffCheckoutShippingAddressContainer>;
  let store: MockStore<any>;
  let initialShippingAddress: DaffAddress;
  let stubSelectedShippingOptionId: string;
  let stubIsShippingAddressValid: boolean;
  let addressFactory: DaffAddressFactory;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DaffCheckoutShippingAddressContainer ],
      providers:[
        provideMockStore({}),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaffCheckoutShippingAddressContainer);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);
    addressFactory = TestBed.inject(DaffAddressFactory);

    initialShippingAddress = addressFactory.create();
    stubSelectedShippingOptionId = '0';
    stubIsShippingAddressValid = true;

    store.overrideSelector(selectShippingAddress, initialShippingAddress);
    store.overrideSelector(selectShippingOptionId, stubSelectedShippingOptionId);
    store.overrideSelector(selectIsShippingAddressValid, stubIsShippingAddressValid);

    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  afterAll(() => {
    store.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngInit', () => {

    it('initializes shippingAddress$', () => {
      component.shippingAddress$.subscribe((shippingAddress) => {
        expect(shippingAddress).toEqual(initialShippingAddress);
      });
    });

    it('initializes selectedShippingOptionId$', () => {
      component.selectedShippingOptionId$.subscribe((shippingOption) => {
        expect(shippingOption).toEqual(stubSelectedShippingOptionId);
      });
    });

    it('initializes isShippingAddressValid$', () => {
      component.isShippingAddressValid$.subscribe((isShippingAddressValid) => {
        expect(isShippingAddressValid).toEqual(stubIsShippingAddressValid);
      });
    });
  });

  describe('updateShippingAddress', () => {

    it('should call store.dispatch with UpdateShippingAddress action', () => {
      component.updateShippingAddress(initialShippingAddress);

      expect(store.dispatch).toHaveBeenCalledWith(new DaffUpdateShippingAddress(initialShippingAddress));
    });
  });

  describe('selectShippingOption', () => {

    it('should call store.dispatch with SelectShippingOption action', () => {
      component.selectShippingOption(stubSelectedShippingOptionId);

      expect(store.dispatch).toHaveBeenCalledWith(new DaffSelectShippingOption(stubSelectedShippingOptionId));
    });
  });
});
