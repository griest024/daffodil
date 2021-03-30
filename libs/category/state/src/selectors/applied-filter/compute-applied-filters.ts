import { DaffCategoryFilter } from '@daffodil/category';

export const computeAppliedFilters = (filters: DaffCategoryFilter[]) => filters.map(
  (filter: DaffCategoryFilter) => ({
    ...filter,
    //TODO(damienwebdev): revisit `filter.options.filter` in Typescript 4.0 for generic narrowing of union types.
    options: Object.values(filter.options).filter((option: DaffCategoryFilter['options'][string]) => option.applied) ?? {},
  }),
).filter((filter: DaffCategoryFilter) => Object.values(filter.options).length);
