import { createMultiInjectionToken } from '@daffodil/core';

import { DaffSchedule } from './type';

export const {
  /**
   * Holds all of the scheduled events.
   */
  token: DAFF_SCHEDULES,
  /**
   * Provider for {@link DAFF_SCHEDULES}.
   */
  provider: provideDaffSchedules,
  factoryProvider: provideDaffScheduleFactories,
} = createMultiInjectionToken<DaffSchedule>('DAFF_SCHEDULES');
