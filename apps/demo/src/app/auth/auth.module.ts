import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DaffAuthModule,
  DaffAuthFacadeService
} from '@daffodil/auth';

import { DemoAuthStateModule } from './auth-state.module';
@NgModule({
  imports: [
    CommonModule,
    DaffAuthModule,
    DemoAuthStateModule
  ],
  providers: [
    DaffAuthFacadeService
  ]
})
export class AuthModule { }
