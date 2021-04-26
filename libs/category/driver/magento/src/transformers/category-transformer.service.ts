import { Injectable } from '@angular/core';

import {
  DaffCategory,
  DaffCategoryBreadcrumb,
} from '@daffodil/category';

import {
  MagentoBreadcrumb,
  MagentoCategory,
} from '../models/public_api';

@Injectable({
  providedIn: 'root',
})
export class DaffMagentoCategoryTransformerService {

  transform(category: MagentoCategory): DaffCategory {
    return {
      id: String(category.id),
      uri: `${category.url_path}${category.url_suffix}`,
      name: category.name,
      description: category.description,
      children_count: category.children_count,
      breadcrumbs: category.breadcrumbs
        ?.map(breadcrumb => this.transformBreadcrumb(breadcrumb))
        .sort((a, b) => a.categoryLevel - b.categoryLevel) || null,
      product_ids: category.products.items.map(product => product.sku),
      categoryProducts: category.products.items.reduce((acc, product) => {
        acc[product.sku] = {
          uri: `${category.url_path}/${product.url_key}${product.url_suffix}`,
        };
        return acc;
      }, {}),
      total_products: category.products.items.length,
    };
  }

  private transformBreadcrumb(breadcrumb: MagentoBreadcrumb): DaffCategoryBreadcrumb {
    return {
      categoryId: String(breadcrumb.category_id),
      categoryName: breadcrumb.category_name,
      categoryLevel: breadcrumb.category_level,
      categoryUrlKey: breadcrumb.category_url_key,
    };
  }
}
