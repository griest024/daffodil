import { TestBed } from '@angular/core/testing';

import { DaffSchedule } from '@daffodil/schedule';

import { DaffScheduleFactory } from './schedule.factory';

describe('@daffodil/schedule/testing | DaffScheduleFactory', () => {

  let scheduleFactory: DaffScheduleFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DaffScheduleFactory],
    });

    scheduleFactory = TestBed.inject(DaffScheduleFactory);
  });

  it('should be created', () => {
    expect(scheduleFactory).toBeTruthy();
  });

  describe('create', () => {

    let result: DaffSchedule;

    beforeEach(() => {
      result = scheduleFactory.create();
    });

    it('should return a DaffSchedule with all required fields defined', () => {
      expect(result.type).toBeDefined();
      expect(result.name).toBeDefined();
    });
  });

});
