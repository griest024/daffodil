import {
  inject,
  Injectable,
} from '@angular/core';

import { DAFF_SCHEDULES } from './token';
import { DaffSchedule } from './type';

/**
 * Handles the logic of determining which events are active based on the provided schedules.
 */
@Injectable()
export class DaffScheduleService {
  readonly schedules = inject(DAFF_SCHEDULES);

  /**
   * The names of the currently active events.
   */
  get activeEvents(): Array<DaffSchedule['name']> {
    const now = Date.now();
    return this.schedules.reduce((acc, schedule) => {
      switch (schedule.type) {
        case 'fixed':
          if (schedule.start < now && schedule.end > now) {
            acc.push(schedule.name);
          }
          break;

        case 'variable':
          schedule.events.forEach((evt) => {
            if (evt.start < now && evt.end > now) {
              acc.push(`${schedule.name}-${evt.year}`);
            }
          });
          break;

        default:
          break;
      }
      return acc;
    }, <Array<string>>[]);
  }
}
