/**
 * A particular instance of a variable schedule.
 */
export interface DaffVariableEvent {
  /**
   * The year in which the event occurs.
   */
  year: number;
  /**
   * The start of the schedule, in UTC milliseconds.
   */
  start: number;
  /**
   * The end of the schedule, in UTC milliseconds.
   */
  end: number;
}
