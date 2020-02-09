import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DaffAuthFacadeService } from '@daffodil/auth';

import { MockDaffAuthFacade } from './mocks/mock-auth.facade';

/**
 * The DaffAuthTestingModule provides a mock for the DaffAuthFacade. This makes testing much simpler
 * by removing any interaction with the ngrx store.
 */
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: DaffAuthFacadeService, useClass: MockDaffAuthFacade }
  ]
})
export class DaffAuthTestingModule { }
