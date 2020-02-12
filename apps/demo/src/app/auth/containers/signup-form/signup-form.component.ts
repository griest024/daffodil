import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  DaffAuthFacadeInterface,
  DaffAuthRegister,
  DaffAuthToken,
  DaffAuthFacadeService,
  DaffAccountRegistration,
  DaffCustomerRegistration
} from '@daffodil/auth';

@Component({
  selector: 'demo-signup-form-container',
  templateUrl: './signup-form.component.html'
})
export class DemoSignupFormContainer {
  constructor(
    @Inject(DaffAuthFacadeService) private facade: DaffAuthFacadeInterface<DaffAuthToken>,
  ) {}

  onSubmit(singupInfo: DaffAccountRegistration<DaffCustomerRegistration>) {
    this.facade.dispatch(new DaffAuthRegister(singupInfo))
  }
}
