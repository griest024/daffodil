import type { DaffSchedule } from '@daffodil/schedule';

import { NagerPublicHoliday } from './response.type';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const daffTransformNagerPublicHolidayToSchedule = (holiday: NagerPublicHoliday, year: number): DaffSchedule => {
  const start = new Date(holiday.date).getTime();
  return holiday.fixed
    ? {
      type: 'fixed',
      name: holiday.localName,
      start,
      end: start + MS_PER_DAY - 1,
    }
    : {
      type: 'variable',
      name: holiday.localName,
      events: [{
        year,
        start,
        end: start + MS_PER_DAY - 1,
      }],
    };
};
