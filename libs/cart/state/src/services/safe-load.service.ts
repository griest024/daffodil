import {
  Injectable,
  Inject,
} from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  of,
  EMPTY,
  defer,
  Observable,
  iif,
} from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  tap,
} from 'rxjs/operators';

import {
  DaffCart,
  DaffCartStorageService,
  DAFF_CART_ERROR_MATCHER,
  DaffCartNotFoundOrCreatedResolutionError,
  DaffCartResolutionError,
  DaffCartServerSideResolutionError,
  DaffCartStorageResolutionError,
} from '@daffodil/cart';
import {
  DaffCartDriver,
  DaffCartNotFoundError,
  DaffCartServiceInterface,
} from '@daffodil/cart/driver';
import {
  DaffError,
  DaffInheritableError,
  DaffServerSideStorageError,
  DaffStorageServiceError,
} from '@daffodil/core';
import { ErrorTransformer } from '@daffodil/core/state';

import {
  DaffCartActionTypes,
  DaffCartActions,
  DaffResolveCart,
  DaffResolveCartFailure,
  DaffResolveCartPartialSuccess,
  DaffResolveCartServerSide,
  DaffResolveCartSuccess,
} from '../actions/public_api';
import { DaffCartFacade } from '../facades/cart/cart.facade';

@Injectable({
  providedIn: 'root',
})
export class DaffCartSafeLoadService<T extends DaffCart = DaffCart> {
  constructor(
    @Inject(DAFF_CART_ERROR_MATCHER) private errorMatcher: ErrorTransformer,
    @Inject(DaffCartDriver) private driver: DaffCartServiceInterface<T>,
    private storage: DaffCartStorageService,
    private facade: DaffCartFacade<T>,
    private actions$: Actions<DaffCartActions<T>>,
  ) {}

  safeLoadCart2$(): Observable<T> {
    this.facade.dispatch(new DaffResolveCart());
    return this.actions$.pipe(
      ofType(DaffCartActionTypes.ResolveCartSuccessAction),
      map((action) => action.payload),
    );
  }
  safeLoadCart$(): Observable<Action> {
    return defer(() => of(this.storage.getCartId())).pipe(
      switchMap(cartId =>
        cartId ? of({ id: cartId }) : this.driver.create(),
      ),
      switchMap(({ id }) => this.driver.get(id)),
      switchMap(({ response, errors }) => {
        if (errors.length === 0) {
          return of(new DaffResolveCartSuccess(response));
        }

        const hasOnlyRecoverableErrors = errors.reduce((acc, error) => acc && error.recoverable, true);

        if (hasOnlyRecoverableErrors) {
          return of(new DaffResolveCartPartialSuccess(response, errors.map(error => this.errorMatcher(error))));
        }

        if (errors.find(error => error instanceof DaffCartNotFoundError)) {
          return this.driver.create().pipe(
            switchMap(({ id }) => this.driver.get(id)),
            map(resp => new DaffResolveCartSuccess(resp.response)),
            catchError((innerError: DaffError) => of(
              new DaffResolveCartFailure([this.errorMatcher(
                new DaffCartNotFoundOrCreatedResolutionError(innerError.message),
              )]),
            )),
          );
        }

        // there are no special case errors, DaffResolveCartFailure will suffice
        // just map the errors
        return of(new DaffResolveCartFailure(errors.map(error => this.errorMatcher(
          // I wish there was a better way to check this
          error instanceof DaffInheritableError || !!(<DaffError>error).code
            ? error
            : new DaffCartResolutionError(error.message),
        ))),
        );
      }),
      catchError((error: Error) => {
        switch (true) {
          case error instanceof DaffServerSideStorageError:
            return of(new DaffResolveCartServerSide(this.errorMatcher(
              new DaffCartServerSideResolutionError(error.message),
            )));
          case error instanceof DaffStorageServiceError:
            return of(new DaffResolveCartFailure([this.errorMatcher(
              new DaffCartStorageResolutionError(error.message),
            )]));
          default:
            return of(new DaffResolveCartFailure([this.errorMatcher(
              new DaffCartResolutionError(error.message),
            )]));
        }
      }),
    );
  }
}
