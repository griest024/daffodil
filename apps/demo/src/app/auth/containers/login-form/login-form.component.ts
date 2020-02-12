import { Component } from '@angular/core';

import {
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
    private facade: DaffAuthFacadeService,
  ) {}

  onSubmit(loginInfo: DaffLoginInfo) {
    this.facade.dispatch(new DaffAuthLogin(loginInfo));
  }
}
