import { DaffScheduleType } from '@daffodil/schedule';

import { NagerPublicHoliday } from './response.type';
import { daffTransformNagerPublicHolidayToSchedule } from './transform';

describe('daffTransformNagerPublicHolidayToSchedule', () => {
  const mockHoliday: NagerPublicHoliday = {
    date: '2024-01-01',
    localName: 'New Year\'s Day',
    name: 'New Year\'s Day',
    countryCode: 'US',
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  };

  it('should set the type to FIXED', () => {
    expect(daffTransformNagerPublicHolidayToSchedule(mockHoliday).type).toBe(DaffScheduleType.FIXED);
  });

  it('should use the localName as the schedule name', () => {
    expect(daffTransformNagerPublicHolidayToSchedule(mockHoliday).name).toBe(mockHoliday.localName);
  });

  it('should set start to UTC midnight of the holiday date', () => {
    expect(daffTransformNagerPublicHolidayToSchedule(mockHoliday).start).toBe(new Date('2024-01-01').getTime());
  });

  it('should set end to the last millisecond of the holiday date', () => {
    const start = new Date('2024-01-01').getTime();
    expect(daffTransformNagerPublicHolidayToSchedule(mockHoliday).end).toBe(start + 24 * 60 * 60 * 1000 - 1);
  });
});
