/**
 * Creates a date object from a day, month and year.
 * @param day
 * @param month
 * @param year
 * @returns
 */
export const date = (day: number, month: number, year: number) =>
    new Date(year, month - 1, day)
  