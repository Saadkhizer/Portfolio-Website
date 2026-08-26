/**
 * Bounds a promise so a slow or unreachable backend degrades instead of
 * hanging the page.
 *
 * Server rendering blocks on every await, so any unbounded network call is a
 * potential total outage: an unreachable backend (VPN, firewall, offline,
 * paused database) would otherwise leave requests pending forever with no
 * error in the terminal and an infinite spinner in the browser.
 *
 * Returns `fallback` on timeout or failure rather than throwing, so callers
 * render an empty or logged-out state instead of a crash.
 */
export async function withTimeout(promise, { ms = 5000, fallback = null, label = "query" } = {}) {
  let timer;

  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`${label} timed out after ${ms}ms`)),
          ms
        );
      }),
    ]);
  } catch (error) {
    console.warn(`[withTimeout] ${error.message}`);
    return fallback;
  } finally {
    clearTimeout(timer);
  }
}
