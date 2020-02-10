import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DemoSignupViewComponent } from './signup-view.component';

export const signupViewRoutes: Routes = [
  {
    path: '',
    component: DemoSignupViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(signupViewRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DemoSignupViewRoutingModule { }
