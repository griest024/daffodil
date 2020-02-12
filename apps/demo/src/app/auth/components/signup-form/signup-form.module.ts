import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  DaffButtonModule,
  DaffInputModule,
} from '@daffodil/design';

import { DemoSignupFormComponent } from './signup-form.component';

@NgModule({
  imports: [
    CommonModule,

    ReactiveFormsModule,

    DaffInputModule,
    DaffButtonModule,
  ],
  declarations: [
    DemoSignupFormComponent
  ],
  exports: [
    DemoSignupFormComponent
  ],
})

export class DemoSignupFormComponentModule {}
