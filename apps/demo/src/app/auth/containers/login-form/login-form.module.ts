import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoLoginFormComponentModule } from '../../components/login-form/login-form.module';
import { DemoLoginFormContainer } from './login-form.component';

@NgModule({
  imports: [
    CommonModule,
    DemoLoginFormComponentModule
  ],
  declarations: [
    DemoLoginFormContainer
  ],
  exports: [
    DemoLoginFormContainer
  ],
})

export class DemoLoginFormModule {}
