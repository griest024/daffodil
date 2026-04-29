import { TestBed } from '@angular/core/testing';

import { DaffVariableEvent } from '@daffodil/schedule';

import { DaffVariableEventFactory } from './variable-event.factory';

describe('@daffodil/schedule/testing | DaffVariableEventFactory', () => {

  let variableEventFactory: DaffVariableEventFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DaffVariableEventFactory],
    });

    variableEventFactory = TestBed.inject(DaffVariableEventFactory);
  });

  it('should be created', () => {
    expect(variableEventFactory).toBeTruthy();
  });

  describe('create', () => {

    let result: DaffVariableEvent;

    beforeEach(() => {
      result = variableEventFactory.create();
    });

    it('should return a DaffVariableEvent with all required fields defined', () => {
      expect(result.year).toBeDefined();
      expect(result.start).toBeDefined();
      expect(result.end).toBeDefined();
    });
  });

});
