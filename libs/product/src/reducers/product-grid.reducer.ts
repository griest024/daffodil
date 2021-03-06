import { DaffProductGridActionTypes, DaffProductGridActions } from '../actions/product-grid.actions';
import { DaffProduct } from '../models/product';

/**
 * Interface for product grid state.
 */
export interface State {
  products: DaffProduct[],
  loading: boolean,
  errors: string[]
}

/**
 * Initial values of the product grid state.
 */
export const initialState: State = {
  products: [],
  loading: false,
  errors: []
};

/**
 * Reducer function that catches actions and changes/overwrites product grid state.
 * 
 * @param state current State of the redux store
 * @param action a product grid action
 * @returns Product grid state
 */
export function reducer(state = initialState, action: DaffProductGridActions): State {
  switch (action.type) {
    case DaffProductGridActionTypes.ProductGridLoadAction:
      return {...state, loading: true};
    case DaffProductGridActionTypes.ProductGridLoadSuccessAction:
      return {...state, loading: false};
    case DaffProductGridActionTypes.ProductGridLoadFailureAction:
      return {...state, 
        loading: false, 
        errors: state.errors.concat(new Array(action.payload))
      };
    default:
      return state;
  }
}

/**
 * Selects loading status of product grid state.
 * 
 * @param state current redux state object
 */
export const getProductGridLoading = (state: State) => state.loading;
