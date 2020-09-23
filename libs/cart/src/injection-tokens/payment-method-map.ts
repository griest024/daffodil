import { InjectionToken } from '@angular/core';

/**
 * An injection token for a mapping from the platform-specific cart payment method
 * to a user-defined platform-agnostic payment ID.
 * It should be a function that takes a single string and returns a string.
 * Defaults to a function that returns null.
 */
export const DaffCartPaymentMethodIdMapper = new InjectionToken<(string) => string>('DaffCartPaymentMethodIdMapper', {
  factory: () => () => null
});
