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

import { DaffCheckoutBillingAddressContainer } from './billing-address.component';
import {
  DaffUpdateBillingAddress,
  DaffSelectBillingOption,
} from '../actions/address.actions';
import {
  selectBillingAddress,
  selectBillingOptionId,
  selectIsBillingAddressValid,
} from '../selectors/address.selectors';

describe('DaffCheckoutBillingAddressContainer', () => {
  let component: DaffCheckoutBillingAddressContainer;
  let fixture: ComponentFixture<DaffCheckoutBillingAddressContainer>;
  let store: MockStore<any>;
  let initialBillingAddress: DaffAddress;
  let stubSelectedBillingOptionId: string;
  let stubIsBillingAddressValid: boolean;
  let addressFactory: DaffAddressFactory;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DaffCheckoutBillingAddressContainer ],
      providers:[
        provideMockStore({}),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaffCheckoutBillingAddressContainer);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);
    addressFactory = TestBed.inject(DaffAddressFactory);

    initialBillingAddress = addressFactory.create();
    stubSelectedBillingOptionId = '0';
    stubIsBillingAddressValid = true;

    store.overrideSelector(selectBillingAddress, initialBillingAddress);
    store.overrideSelector(selectBillingOptionId, stubSelectedBillingOptionId);
    store.overrideSelector(selectIsBillingAddressValid, stubIsBillingAddressValid);

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

    it('initializes billingAddress$', () => {
      component.billingAddress$.subscribe((billingAddress) => {
        expect(billingAddress).toEqual(initialBillingAddress);
      });
    });

    it('initializes selectedBillingOptionId$', () => {
      component.selectedBillingOptionId$.subscribe((billingOption) => {
        expect(billingOption).toEqual(stubSelectedBillingOptionId);
      });
    });

    it('initializes isBillingAddressValid$', () => {
      component.isBillingAddressValid$.subscribe((isBillingAddressValid) => {
        expect(isBillingAddressValid).toEqual(stubIsBillingAddressValid);
      });
    });
  });

  describe('updateBillingAddress', () => {

    it('should call store.dispatch with UpdateBillingAddress action', () => {
      component.updateBillingAddress(initialBillingAddress);

      expect(store.dispatch).toHaveBeenCalledWith(new DaffUpdateBillingAddress(initialBillingAddress));
    });
  });

  describe('selectBillingOption', () => {

    it('should call store.dispatch with SelectBillingOption action', () => {
      component.selectBillingOption(stubSelectedBillingOptionId);

      expect(store.dispatch).toHaveBeenCalledWith(new DaffSelectBillingOption(stubSelectedBillingOptionId));
    });
  });
});
