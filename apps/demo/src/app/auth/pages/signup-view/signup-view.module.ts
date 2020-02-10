import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoSignupViewComponent } from './signup-view.component';
import { DemoSignupViewRoutingModule } from './signup-view-routing.module';
import { DemoSignupFormModule } from '../../containers/signup-form/signup-form.module';

@NgModule({
  imports: [
    CommonModule,
    DemoSignupViewRoutingModule,
    DemoSignupFormModule
  ],
  exports: [
    DemoSignupViewComponent
  ],
  declarations: [
    DemoSignupViewComponent
  ]
})
export class DemoSignupViewModule {}
