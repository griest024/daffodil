import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  DaffAuthFacadeService,
  DaffAuthLogout
} from '@daffodil/auth';

@Component({
  selector: 'demo-login-link',
  templateUrl: './login-link.component.html',
  styleUrls: ['./login-link.component.scss']
})
export class DemoLoginLinkComponent {
  constructor(
    private facade: DaffAuthFacadeService
  ) {}

  get isUnauthenticated(): Observable<boolean> {
    return this.facade.token$.pipe(
      map(token => !token)
    )
  }

  logout() {
    console.log('logout')
  }
}
