import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DemoLoginViewComponent } from './login-view.component';

export const loginViewRoutes: Routes = [
  {
    path: '',
    component: DemoLoginViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginViewRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DemoLoginViewRoutingModule { }
