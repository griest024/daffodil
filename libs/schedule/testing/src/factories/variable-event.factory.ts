import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker/locale/en_US';

import { DaffModelFactory } from '@daffodil/core/testing';
import { DaffVariableEvent } from '@daffodil/schedule';

export class MockDaffVariableEvent implements DaffVariableEvent {
  private stubStart = faker.date.recent().getTime();
  year = faker.date.recent().getFullYear();
  start = this.stubStart;
  end = this.stubStart + faker.number.int({ min: 1, max: 7 }) * 24 * 60 * 60 * 1000;
}

@Injectable({
  providedIn: 'root',
})
export class DaffVariableEventFactory extends DaffModelFactory<DaffVariableEvent> {
  constructor() {
    super(MockDaffVariableEvent);
  }
}
