import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  DaffButtonModule,
  DaffInputModule,
} from '@daffodil/design';

import { DemoLoginFormComponent } from './login-form.component';

@NgModule({
  imports: [
    CommonModule,

    ReactiveFormsModule,

    DaffInputModule,
    DaffButtonModule,
  ],
  declarations: [
    DemoLoginFormComponent
  ],
  exports: [
    DemoLoginFormComponent
  ],
})

export class DemoLoginFormComponentModule {}
