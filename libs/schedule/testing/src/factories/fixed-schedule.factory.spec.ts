import { TestBed } from '@angular/core/testing';

import { DaffFixedSchedule } from '@daffodil/schedule';

import { DaffFixedScheduleFactory } from './fixed-schedule.factory';

describe('@daffodil/schedule/testing | DaffFixedScheduleFactory', () => {

  let fixedScheduleFactory: DaffFixedScheduleFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DaffFixedScheduleFactory],
    });

    fixedScheduleFactory = TestBed.inject(DaffFixedScheduleFactory);
  });

  it('should be created', () => {
    expect(fixedScheduleFactory).toBeTruthy();
  });

  describe('create', () => {

    let result: DaffFixedSchedule;

    beforeEach(() => {
      result = fixedScheduleFactory.create();
    });

    it('should return a DaffFixedSchedule with all required fields defined', () => {
      expect(result.type).toBeDefined();
      expect(result.name).toBeDefined();
      expect(result.start).toBeDefined();
      expect(result.end).toBeDefined();
    });
  });

});
