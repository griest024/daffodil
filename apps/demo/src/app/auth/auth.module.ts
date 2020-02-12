import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DaffAuthModule,
  DaffAuthFacadeService
} from '@daffodil/auth';
import { DaffLoadingIconModule } from '@daffodil/design';
import { DaffContainerModule } from '@daffodil/design';

import { DemoLoginLinkComponent } from './containers/login-link/login-link.component';
import { DemoAuthRoutingModule } from './auth-routing.module';
import { DemoAuthStateModule } from './auth-state.module';

@NgModule({
  imports: [
    CommonModule,
    DaffAuthModule,
    DaffLoadingIconModule,
    DaffContainerModule,
    DemoAuthRoutingModule,
    DemoAuthStateModule
  ],
  declarations: [
    DemoLoginLinkComponent
  ],
  exports: [
    DemoLoginLinkComponent
  ],
  providers: [
    DaffAuthFacadeService
  ]
})
export class AuthModule { }
