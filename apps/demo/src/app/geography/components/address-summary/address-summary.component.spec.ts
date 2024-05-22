import { Component } from '@angular/core';
import {
  waitForAsync,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DaffAddress } from '@daffodil/core';
import { DaffAddressFactory } from '@daffodil/core/testing';

import { DemoGeographyAddressSummaryComponent } from './address-summary.component';

const daffodilAddressFactory = new DaffAddressFactory();
const stubDaffodilAddress = daffodilAddressFactory.create();

@Component({ template: '<demo-geography-address-summary [address]="addressValue"></demo-geography-address-summary>' })
class WrapperComponent {
  addressValue: DaffAddress = stubDaffodilAddress;
}

describe('DemoGeographyAddressSummaryComponent', () => {
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  let addressSummary: DemoGeographyAddressSummaryComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        WrapperComponent,
        DemoGeographyAddressSummaryComponent,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;

    fixture.detectChanges();

    addressSummary = fixture.debugElement.query(By.css('demo-geography-address-summary')).componentInstance;
  });

  it('should create', () => {
    expect(addressSummary).toBeTruthy();
  });

  it('should be able to take address as input', () => {
    expect(addressSummary.address).toEqual(stubDaffodilAddress);
  });
});
