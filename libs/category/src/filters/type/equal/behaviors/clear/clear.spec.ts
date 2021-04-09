import { TestBed } from '@angular/core/testing';

import { DaffCategoryFilterEqual } from '@daffodil/category';
import { DaffCategoryFilterEqualFactory } from '@daffodil/category/testing';

import { daffClearFilterEqual } from './clear';

describe('@daffodil/category | filters | type | equal | behaviors | clear', () => {
  let categoryFilterEqualFactory: DaffCategoryFilterEqualFactory;

  beforeEach(() => {
		 TestBed.configureTestingModule({});

		 categoryFilterEqualFactory = TestBed.inject(DaffCategoryFilterEqualFactory);
  });

  it('should remove any currently applied filter options', () => {
    const filter: DaffCategoryFilterEqual = categoryFilterEqualFactory.create({
      name: 'color',
      options: {
        red: {
          applied: true,
          value: 'red',
        },
        blue: {
          applied: true,
          value: 'blue',
        },
      },
    });
    const expected: DaffCategoryFilterEqual = {
      ...filter,
      options: {
        ...filter.options,
        red: {
          ...filter.options['red'],
          applied: false,
        },
        blue: {
          ...filter.options['blue'],
          applied: false,
        },
      },
    };

    expect(daffClearFilterEqual(filter)).toEqual(expected);
  });

  it('should do nothing if there are no options currently applied', () => {
    const filter: DaffCategoryFilterEqual = categoryFilterEqualFactory.create({
      name: 'color',
      options: {
        red: {
          applied: false,
          value: 'red',
        },
        blue: {
          applied: false,
          value: 'blue',
        },
      },
    });

    expect(daffClearFilterEqual(filter)).toEqual(filter);
  });
});
