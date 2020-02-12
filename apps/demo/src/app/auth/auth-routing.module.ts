import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const authRoutes: Routes = [
  { path: 'login', loadChildren: './pages/login-view/login-view.module#DemoLoginViewModule' },
  { path: 'signup', loadChildren: './pages/signup-view/signup-view.module#DemoSignupViewModule' },
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DemoAuthRoutingModule { }
