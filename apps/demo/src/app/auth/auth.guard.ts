import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  DaffAuthFacadeInterface,
  DaffAuthToken
} from '@daffodil/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private facade: DaffAuthFacadeInterface<DaffAuthToken>,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.needsAuthentication();
  }

  needsAuthentication(): Observable<boolean> {
    return this.facade.token$.pipe(
      map(token => !token)
    )
  }
}
