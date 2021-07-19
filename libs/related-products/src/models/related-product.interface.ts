import { DaffProduct } from '@daffodil/product';

/**
 * An extension of a products that includes a list of related products.
 */
export interface DaffRelatedProduct extends DaffProduct {
  /**
   * A list of related products.
   */
  related: DaffProduct[];
}
