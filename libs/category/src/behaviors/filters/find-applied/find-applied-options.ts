import {
  DaffCategoryFilter,
  DaffCategoryFilterOption,
  DaffCategoryFilterRangePair,
  DaffCategoryFilterEqualOption,
} from '../../../models/public_api';

/**
 * Finds the applied options in the filter.
 */
export function daffCategoryFindAppliedFilterOptions(filter: DaffCategoryFilter): DaffCategoryFilterOption[] {
  return Object.values(filter.options).filter((option: DaffCategoryFilterRangePair | DaffCategoryFilterEqualOption) => option.applied);
}
