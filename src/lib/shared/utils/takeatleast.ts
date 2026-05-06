import { sleep } from './sleep'

export const DEFAULT_TAKEATLEAST_DURATION = 250

/**
 * delay a promise to take at least `minDuration` milliseconds
 * inspired by https:*x.com/vovacodes/status/1989785877740982329 but made simpler to use
 *
 * Example usage:
 * ```ts
 * const add = async (a: number, b: number) => a + b
 * const result = await takeAtLeast(add(2, 3), 500) // Takes at least 500ms, returns 5
 * ```
 */
export const takeAtLeast = async <R>(
  promise: Promise<R>,
  duration: number = DEFAULT_TAKEATLEAST_DURATION,
): Promise<R> => {
  try {
    const [res, _] = await Promise.all([promise, sleep(duration)])
    return res
  } catch (error) {
    await sleep(duration)
    throw error
  }
}
