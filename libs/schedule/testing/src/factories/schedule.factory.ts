import { Injectable } from '@angular/core';

import { sample } from '@daffodil/core';
import { DaffModelFactory } from '@daffodil/core/testing';
import { DaffSchedule } from '@daffodil/schedule';

import { DaffFixedScheduleFactory } from './fixed-schedule.factory';
import { DaffVariableScheduleFactory } from './variable-schedule.factory';

@Injectable({
  providedIn: 'root',
})
export class DaffScheduleFactory extends DaffModelFactory<DaffSchedule> {
  constructor(
    private fixedFactory: DaffFixedScheduleFactory,
    private variableFactory: DaffVariableScheduleFactory,
  ) {
    super();
  }

  private get _randomFactory(): DaffModelFactory<DaffSchedule> {
    return sample([this.fixedFactory, this.variableFactory]);
  }

  override create(partial: Partial<DaffSchedule> = {}): DaffSchedule {
    return this._randomFactory.create(partial);
  }
}
