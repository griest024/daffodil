import { BehaviorSubject } from 'rxjs';

import { DaffProduct, DaffProductGridFacadeInterface } from '@daffodil/product';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class MockDaffProductGridFacade implements DaffProductGridFacadeInterface {
	loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	products$: BehaviorSubject<DaffProduct[]> = new BehaviorSubject([]);
	dispatch(action) {};
}
