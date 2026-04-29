
import type { DaffSchedule } from '@daffodil/schedule';

import { NagerPublicHoliday } from './rest/response.type';
import { daffTransformNagerPublicHolidayToSchedule } from './rest/transform';

const NAGER_API_BASE_URL = 'https://date.nager.at/api/v3';

/**
 * @inheritdoc
 */
export class NagerScheduleHolidayDriver {
  async list(countryCode: string, year: number): Promise<Array<DaffSchedule>> {
    const response = await fetch(`${NAGER_API_BASE_URL}/PublicHolidays/${year}/${countryCode}`);
    const holidays: Array<NagerPublicHoliday> = await response.json();
    return holidays.map((h) => daffTransformNagerPublicHolidayToSchedule(h, year));
  }
}
