import {
  DOCUMENT,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';

import { DaffScheduleService } from './service';

/**
 * Provides the schedule feature.
 * Adds the names of active schedule events to the class list of the body.
 */
export const provideDaffScheduleFeature = () => makeEnvironmentProviders([
  DaffScheduleService,
  provideAppInitializer(() => {
    inject(DOCUMENT).body.classList.add(...inject(DaffScheduleService).activeEvents);
  }),
]);
