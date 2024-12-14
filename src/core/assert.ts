/**
 * Checks whether a certain condition is fulfilled.
 * Triggers an exception if the evaluation fails.
 * @param condition
 * @param msg
 */
export function assert (condition: unknown, msg?: string): asserts condition {
    if (!condition) {
      throw new Error(msg)
    }
  }
  