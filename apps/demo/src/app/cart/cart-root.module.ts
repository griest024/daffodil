import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { combineReducers } from '@ngrx/store';

import {
  DaffCartStateModule,
  daffCartProvideExtraReducers,
  daffCartReducers,
} from '@daffodil/cart/state';

@NgModule({
  imports: [
    CommonModule,
    DaffCartStateModule,
  ],
  providers: [
    daffCartProvideExtraReducers(
      combineReducers(daffCartReducers),
    ),
  ],
})
export class DemoCartRootModule { }
