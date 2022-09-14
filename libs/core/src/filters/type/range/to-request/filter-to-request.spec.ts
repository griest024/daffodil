import { TestBed } from '@angular/core/testing';

import {
  DaffFilterRangeNumeric,
  DaffFilterType,
  daffFilterRangePairArrayToDict,
  DaffFilterRangePair,
  DaffFilterRangeRequestBase,
} from '@daffodil/core';
import {
  DaffFilterRangeNumericFactory,
  DaffFilterRangeNumericPairFactory,
} from '@daffodil/core/testing';

import { daffFilterRangeToRequest } from './filter-to-request';

describe('@daffodil/core | filters | range | daffFilterRangeToRequest', () => {
  let rangeFilterFactory: DaffFilterRangeNumericFactory;
  let rangeFilterPairFactory: DaffFilterRangeNumericPairFactory;

  let appliedRangeFilter: DaffFilterRangeNumeric;
  let rangeFilterPair: DaffFilterRangePair<number>;

  beforeEach(() => {
    rangeFilterFactory = TestBed.inject(DaffFilterRangeNumericFactory);
    rangeFilterPairFactory = TestBed.inject(DaffFilterRangeNumericPairFactory);

    rangeFilterPair = rangeFilterPairFactory.create({
      applied: true,
    });
    appliedRangeFilter = rangeFilterFactory.create({
      options: daffFilterRangePairArrayToDict([rangeFilterPair]),
    });
  });

  describe('when the filter has an applied option', () => {
    let result: DaffFilterRangeRequestBase<number>;

    beforeEach(() => {
      result = daffFilterRangeToRequest(
        appliedRangeFilter,
      );
    });

    it('should set the request type to range', () => {
      expect(result.type).toEqual(DaffFilterType.RangeNumeric);
    });

    it('should build the request from that applied option', () => {
      expect(result.name).toEqual(appliedRangeFilter.name);
      expect(result.value.min).toEqual(rangeFilterPair.min.value);
      expect(result.value.max).toEqual(rangeFilterPair.max.value);
    });
  });
});
