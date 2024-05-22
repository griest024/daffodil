import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { DaffCartRoutingModule } from '@daffodil/cart/routing';

import { DemoCartViewComponent } from './pages/cart-view/cart-view.component';

const category: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DemoCartViewComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(category),
    DaffCartRoutingModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class DemoCartRoutingModule {}
