import {
  MonoTypeOperatorFunction,
  Observable,
  of,
} from 'rxjs';
import {
  withLatestFrom,
  map,
  take,
} from 'rxjs/operators';

// TODO: take n values
/**
 * Emits the latest value emitted from the passed observable and then completes.
 * Similar to `takeLast`, except that it doesn't wait for the source to complete before emitting.
 */
export const takeLatest = <T>(): MonoTypeOperatorFunction<T> => (ob: Observable<T>) => of(null).pipe(
  withLatestFrom(ob),
  map(([_, val]) => val),
  take(1),
);
