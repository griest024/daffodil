import { Component } from '@angular/core';

import {
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
    private facade: DaffAuthFacadeService,
  ) {}

  onSubmit(singupInfo: DaffAccountRegistration<DaffCustomerRegistration>) {
    this.facade.dispatch(new DaffAuthRegister(singupInfo))
  }
}
