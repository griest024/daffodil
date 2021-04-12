import { Injectable } from '@angular/core';
import * as faker from 'faker/locale/en_US';

import { DaffCategoryFilterRangeOption } from '@daffodil/category';
import { DaffModelFactory } from '@daffodil/core/testing';

export class MockCategoryFilterRangeNumericOption implements DaffCategoryFilterRangeOption<number> {
  value = faker.random.number({ min: 0, max: 10 });
  label = faker.random.alpha({ count: 3 });
}

@Injectable({
  providedIn: 'root',
})
export class DaffCategoryFilterRangeNumericOptionFactory extends DaffModelFactory<DaffCategoryFilterRangeOption<number>>{
  constructor(){
    super(MockCategoryFilterRangeNumericOption);
  }
}
