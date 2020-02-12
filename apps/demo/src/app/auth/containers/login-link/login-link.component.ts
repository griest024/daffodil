import { Component, Inject } from '@angular/core';
import { DaffAuthFacadeInterface, DaffAuthToken, DaffAuthFacadeService } from '@daffodil/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'demo-login-link',
  templateUrl: './login-link.component.html',
  styleUrls: ['./login-link.component.scss']
})
export class DemoLoginLinkComponent {
  constructor(
    @Inject(DaffAuthFacadeService) private facade: DaffAuthFacadeInterface<DaffAuthToken>
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
