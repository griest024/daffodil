import { TestBed } from '@angular/core/testing';

import { DaffVariableSchedule } from '@daffodil/schedule';

import { DaffVariableScheduleFactory } from './variable-schedule.factory';

describe('@daffodil/schedule/testing | DaffVariableScheduleFactory', () => {

  let variableScheduleFactory: DaffVariableScheduleFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DaffVariableScheduleFactory],
    });

    variableScheduleFactory = TestBed.inject(DaffVariableScheduleFactory);
  });

  it('should be created', () => {
    expect(variableScheduleFactory).toBeTruthy();
  });

  describe('create', () => {

    let result: DaffVariableSchedule;

    beforeEach(() => {
      result = variableScheduleFactory.create();
    });

    it('should return a DaffVariableSchedule with all required fields defined', () => {
      expect(result.type).toBeDefined();
      expect(result.name).toBeDefined();
      expect(result.events).toBeDefined();
    });
  });

});
