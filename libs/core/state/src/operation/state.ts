import { DaffStateError } from '../errors/public_api';
import { DaffState } from '../states/public_api';

/**
 * A basic operation state.
 * Represents the current state of an operation and any associated errors.
 */
export interface DaffOperationState {
  /**
   * The loading state of the operations backed by this state.
   */
  loading: DaffState;

  /**
   * The errors generated by the most recent operation.
   */
  errors: DaffStateError[];
}

export const daffOperationInitialState: DaffOperationState = {
  loading: DaffState.Stable,
  errors: [],
};