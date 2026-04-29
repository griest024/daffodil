import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker/locale/en_US';

import { DaffModelFactory } from '@daffodil/core/testing';
import { DaffVariableSchedule } from '@daffodil/schedule';

import { DaffVariableEventFactory } from './variable-event.factory';

export class MockDaffVariableSchedule implements DaffVariableSchedule {
  type = <const>'variable';
  name = faker.word.noun();
  events = this.eventFactory.createMany(faker.number.int({ min: 1, max: 5 }));

  constructor(protected eventFactory: DaffVariableEventFactory) {}
}

@Injectable({
  providedIn: 'root',
})
export class DaffVariableScheduleFactory extends DaffModelFactory<DaffVariableSchedule> {
  constructor(eventFactory: DaffVariableEventFactory) {
    super(MockDaffVariableSchedule, eventFactory);
  }
}
