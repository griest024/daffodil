import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoSignupFormComponentModule } from '../../components/signup-form/signup-form.module';
import { DemoSignupFormContainer } from './signup-form.component';

@NgModule({
  imports: [
    CommonModule,
    DemoSignupFormComponentModule
  ],
  declarations: [
    DemoSignupFormContainer
  ],
  exports: [
    DemoSignupFormContainer
  ],
})

export class DemoSignupFormModule {}
