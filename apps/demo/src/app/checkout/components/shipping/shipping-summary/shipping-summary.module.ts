import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ShippingSummaryComponent } from './shipping-summary.component';
import { DemoGeographyAddressSummaryComponent } from '../../../../geography/components/address-summary/address-summary.component';

@NgModule({
  imports: [
    CommonModule,
    DemoGeographyAddressSummaryComponent,
  ],
  declarations: [
    ShippingSummaryComponent,
  ],
  exports: [
    ShippingSummaryComponent,
  ],
})
export class ShippingSummaryModule { }
