import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoLoginViewComponent } from './login-view.component';
import { DemoLoginViewRoutingModule } from './login-view-routing.module';
import { DemoLoginFormModule } from '../../containers/login-form/login-form.module';

@NgModule({
  imports: [
    CommonModule,
    DemoLoginViewRoutingModule,
    DemoLoginFormModule
  ],
  exports: [
    DemoLoginViewComponent
  ],
  declarations: [
    DemoLoginViewComponent
  ]
})
export class DemoLoginViewModule {}
