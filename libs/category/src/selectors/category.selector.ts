import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { fromProduct, DaffProductUnion } from '@daffodil/product';

import { CategoryReducerState } from '../reducers/category/category-reducer-state.interface';
import { CategoryReducersState } from '../reducers/category-reducers.interface';
import { categoryEntitiesAdapter } from '../reducers/category-entities/category-entities-adapter';
import { DaffCategory } from '../models/category';
import { DaffCategoryPageConfigurationState } from '../models/category-page-configuration-state';

const { selectIds, selectEntities, selectAll, selectTotal } = categoryEntitiesAdapter.getSelectors();

/**
 * Category Feature State
 */
export const selectCategoryFeatureState = createFeatureSelector<CategoryReducersState>('category');

/**
 * Category State
 */
export const selectCategoryState = createSelector(
  selectCategoryFeatureState,
  (state: CategoryReducersState) => state.category
);

/**
 * CategoryPageConfigurationState State
 */
export const selectCategoryPageConfigurationState = createSelector(
  selectCategoryState,
  (state: CategoryReducerState) => state.categoryPageConfigurationState
);

export const selectCategoryCurrentPage = createSelector(
  selectCategoryPageConfigurationState,
  (state: DaffCategoryPageConfigurationState) => state.current_page
);

export const selectCategoryTotalPages = createSelector(
  selectCategoryPageConfigurationState,
  (state: DaffCategoryPageConfigurationState) => state.total_pages
);

export const selectCategoryPageSize = createSelector(
  selectCategoryPageConfigurationState,
  (state: DaffCategoryPageConfigurationState) => state.page_size
);

export const selectCategoryFilters = createSelector(
  selectCategoryPageConfigurationState,
  (state: DaffCategoryPageConfigurationState) => state.filters
);

export const selectCategorySortOptions = createSelector(
  selectCategoryPageConfigurationState,
  (state: DaffCategoryPageConfigurationState) => state.sort_options
);

/**
 * Selected Category Id State
 */
export const selectSelectedCategoryId = createSelector(
  selectCategoryPageConfigurationState,
  (state: DaffCategoryPageConfigurationState) => state.id
);

/**
 * Category Loading State
 */
export const selectCategoryLoading = createSelector(
  selectCategoryState,
  (state: CategoryReducerState) => state.loading
);

/**
 * Load Category Errors
 */
export const selectCategoryErrors = createSelector(
  selectCategoryState,
  (state: CategoryReducerState) => state.errors
);

/**
 * Category Entities State
 */
export const selectCategoryEntitiesState = createSelector(
  selectCategoryFeatureState,
  (state: CategoryReducersState) => state.categoryEntities
);

export const selectCategoryIds = createSelector(
  selectCategoryEntitiesState,
  selectIds
);

export const selectCategoryEntities = createSelector(
  selectCategoryEntitiesState,
  selectEntities
);

export const selectAllCategories = createSelector(
  selectCategoryEntitiesState,
  selectAll
);

export const selectCategoryTotal = createSelector(
  selectCategoryEntitiesState,
  selectTotal
);

/**
 * Combinatoric Category Selectors
 */
export const selectSelectedCategory = createSelector(
  selectCategoryEntities,
  selectSelectedCategoryId,
  (entities: Dictionary<DaffCategory>, selectedCategoryId: string) => entities[selectedCategoryId]
);

export const selectCategoryProductIds = createSelector(
  selectSelectedCategory,
  (category: DaffCategory) => category ? category.productIds : []
);

export const selectCategoryProducts = createSelector(
  selectCategoryProductIds,
  fromProduct.selectAllProducts,
  (ids, products: DaffProductUnion[]) => products.filter(product => ids.indexOf(product.id) >= 0)
);

export const selectCategory = createSelector(
	selectCategoryEntities,
	(entities, props) => {
		return entities[props.id];
	}
);

export const selectProductsByCategory = createSelector(
	selectCategoryEntities,
	fromProduct.selectAllProducts,
	(entities, products, props) => {
		if (!entities[props.id]) {
			return null;
		}
		return products.filter(product => entities[props.id].productIds.indexOf(product.id) >= 0);
	}
);