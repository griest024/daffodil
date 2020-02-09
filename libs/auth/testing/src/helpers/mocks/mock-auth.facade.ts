import { BehaviorSubject } from 'rxjs';

import {
  DaffAuthFacadeInterface,
  DaffAuthToken
} from '@daffodil/auth';

/**
 * A mock of the DaffAuthFacade used to remove any interaction with the ngrx store.
 * This mock should be imported into tests using the DaffAuthTestingModule.
 */
export class MockDaffAuthFacade implements DaffAuthFacadeInterface<DaffAuthToken> {
  auth$: BehaviorSubject<DaffAuthToken> = new BehaviorSubject(null);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  token$: BehaviorSubject<string> = new BehaviorSubject(null);
  errors$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  dispatch() { }
}
