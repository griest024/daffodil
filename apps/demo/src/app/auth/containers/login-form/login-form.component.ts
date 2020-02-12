import { Component, Inject } from '@angular/core';

import {
  DaffAuthFacadeInterface,
  DaffAuthToken,
  DaffAuthLogin,
  DaffLoginInfo,
  DaffAuthFacadeService
} from '@daffodil/auth';

@Component({
  selector: 'demo-login-form-container',
  templateUrl: './login-form.component.html'
})
export class DemoLoginFormContainer {
  constructor(
    @Inject(DaffAuthFacadeService) private facade: DaffAuthFacadeInterface<DaffAuthToken>,
  ) {}

  onSubmit(loginInfo: DaffLoginInfo) {
    this.facade.dispatch(new DaffAuthLogin(loginInfo));
  }
}
