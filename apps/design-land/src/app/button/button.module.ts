import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button.component';
import { DesignLandButtonRoutingModule } from './button-routing.module';

import { DaffButtonSetModule, DaffButtonModule } from '@daffodil/design';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,

    DesignLandButtonRoutingModule,
    DaffButtonSetModule,
    DaffButtonModule,
    FontAwesomeModule
  ]
})
export class ButtonModule {}
