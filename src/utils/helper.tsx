/**
 * Creates a date object from a day, month and year.
 * @param day
 * @param month
 * @param year
 * @returns
 */
export const date = (day: number, month: number, year: number) =>
  new Date(year, month - 1, day);

/**
 * Checks whether a certain condition is fulfilled.
 * Triggers an exception if the evaluation fails.
 * @param condition
 * @param msg
 */
export function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}
