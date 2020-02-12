import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DaffAuthModule,
  DaffAuthFacadeService
} from '@daffodil/auth';

@NgModule({
  imports: [
    CommonModule,
    DaffAuthModule,
  ],
  providers: [
    DaffAuthFacadeService
  ]
})
export class AuthModule { }
