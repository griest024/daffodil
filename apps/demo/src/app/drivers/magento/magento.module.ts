import { NgModule } from '@angular/core';
import {
  APOLLO_OPTIONS,
  ApolloModule,
} from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { DaffAuthMagentoDriverModule } from '@daffodil/auth/driver/magento';
import { DaffCartMagentoDriverModule } from '@daffodil/cart/driver/magento';
import { DaffCategoryMagentoDriverModule } from '@daffodil/category/driver/magento';
import { DaffMagentoApolloCacheableOperationsLinkGenerator } from '@daffodil/driver/magento';
import { DaffExternalRouterDriverMagentoModule } from '@daffodil/external-router/driver/magento/2.4.3';
import { DaffGeographyMagentoDriverModule } from '@daffodil/geography/driver/magento';
import { DaffNavigationMagentoDriverModule } from '@daffodil/navigation/driver/magento';
import { DaffNewsletterInMemoryDriverModule } from '@daffodil/newsletter/driver/in-memory';
import { DaffProductMagentoDriverModule } from '@daffodil/product/driver/magento';

import { demoMagentoApolloOptions } from './apollo-options.factory';

@NgModule({
  imports: [
    //Magento
    DaffAuthMagentoDriverModule.forRoot(),
    DaffProductMagentoDriverModule.forRoot({
      baseMediaUrl: 'https://magento2.test/media/',
    }),
    DaffCartMagentoDriverModule.forRoot(),
    DaffNavigationMagentoDriverModule.forRoot(),
    DaffNewsletterInMemoryDriverModule.forRoot(),
    DaffGeographyMagentoDriverModule.forRoot(),
    DaffCategoryMagentoDriverModule.forRoot(),
    DaffExternalRouterDriverMagentoModule.forRoot(),
    ApolloModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: demoMagentoApolloOptions,
      deps: [
        HttpLink,
        DaffMagentoApolloCacheableOperationsLinkGenerator,
      ],
    },
  ],
})
export class DemoMagentoDriverModule {}
