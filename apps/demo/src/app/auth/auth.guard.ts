import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  DaffAuthFacadeService,
} from '@daffodil/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private facade: DaffAuthFacadeService,
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
