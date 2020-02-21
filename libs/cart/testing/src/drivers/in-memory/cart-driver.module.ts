import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DaffCartDriver,
  DaffCartBillingAddressDriver,
} from '@daffodil/cart';

import { DaffInMemoryCartService } from './cart/cart.service';
import { DaffInMemoryCartBillingAddressService } from './cart-billing-address/cart-billing-address.service';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class DaffCartInMemoryDriverModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DaffCartInMemoryDriverModule,
      providers: [
        {
          provide: DaffCartDriver,
          useExisting: DaffInMemoryCartService
        },
        {
          provide: DaffCartBillingAddressDriver,
          useExisting: DaffInMemoryCartBillingAddressService
        }
      ]
    };
  }
}
