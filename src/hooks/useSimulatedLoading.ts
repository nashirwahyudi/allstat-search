/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";

/**
 * Mimics the loading window of a real API call so screens that read from the
 * mock data services (src/services/mockData.ts) can still show a skeleton
 * state. Re-triggers whenever `deps` changes (e.g. a new search term/filter),
 * matching how a real fetch would re-run per query.
 */
export default function useSimulatedLoading(deps: unknown[], delayMs = 500): boolean {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), delayMs);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return loading;
}
