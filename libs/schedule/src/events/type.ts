import { DaffVariableEvent } from './event.type';

/**
 * The type of schedule.
 */
export type DaffScheduleType = 'fixed' | 'variable';

export interface DaffBaseSchedule {
  type: DaffScheduleType;
  name: string;
}

/**
 * A fixed schedule in which the event occurs on the same day(s) every year.
 */
export interface DaffFixedSchedule extends DaffBaseSchedule {
  type: 'fixed';
  /**
   * The start of the schedule, in UTC milliseconds.
   */
  start: number;
  /**
   * The end of the schedule, in UTC milliseconds.
   */
  end: number;
}

/**
 * A variable schedule in which the event occurs on different day(s) every year.
 */
export interface DaffVariableSchedule extends DaffBaseSchedule {
  type: 'variable';
  events: Array<DaffVariableEvent>;
}

/**
 * A schedule of events.
 */
export type DaffSchedule = DaffFixedSchedule | DaffVariableSchedule;
