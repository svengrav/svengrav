/**
 * Checks whether a certain condition is fulfilled.
 * Triggers an exception if the evaluation fails.
 * @param condition
 * @param msg
 */
export const guard = (condition: unknown, msg?: string) => {
    if (!condition) {
      throw new Error(msg)
    }
  }
  