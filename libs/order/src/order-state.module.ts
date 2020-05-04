import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { DAFF_ORDER_STORE_FEATURE_KEY, daffOrderReducers } from './reducers/public_api';

@NgModule({
  imports: [
    StoreModule.forFeature(DAFF_ORDER_STORE_FEATURE_KEY, daffOrderReducers),
  ]
})
export class DaffOrderStateModule { }
