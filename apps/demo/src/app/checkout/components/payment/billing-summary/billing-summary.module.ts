import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DemoGeographyAddressSummaryComponent } from 'apps/demo/src/app/geography/components/address-summary/address-summary.component';

import { BillingSummaryComponent } from './billing-summary.component';

@NgModule({
  imports: [
    CommonModule,
    DemoGeographyAddressSummaryComponent,
  ],
  declarations: [
    BillingSummaryComponent,
  ],
  exports: [
    BillingSummaryComponent,
  ],
})
export class BillingSummaryModule { }
