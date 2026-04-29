import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker/locale/en_US';

import { DaffModelFactory } from '@daffodil/core/testing';
import { DaffFixedSchedule } from '@daffodil/schedule';

export class MockDaffFixedSchedule implements DaffFixedSchedule {
  private stubStart = faker.date.recent().getTime();
  type = <const>'fixed';
  name = faker.word.noun();
  start = this.stubStart;
  end = this.stubStart + faker.number.int({ min: 1, max: 7 }) * 24 * 60 * 60 * 1000;
}

@Injectable({
  providedIn: 'root',
})
export class DaffFixedScheduleFactory extends DaffModelFactory<DaffFixedSchedule> {
  constructor() {
    super(MockDaffFixedSchedule);
  }
}
