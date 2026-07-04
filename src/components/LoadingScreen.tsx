/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const LOTTIE_SRC = "/assets/allstats-loading-transparent.json";

export default function LoadingScreen() {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(LOTTIE_SRC)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => {
        // Silently ignore: the splash is cosmetic, not a blocker on failure.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-900">
      <div className="h-40 w-40 sm:h-48 sm:w-48">
        {animationData && <Lottie animationData={animationData} loop autoplay />}
      </div>
      {/* <img src="/assets/allstats-logo-dark.svg" alt="Allstat Search" className="h-8 w-auto" /> */}
      <h3 className="text-white white">Syncing Data...</h3>
    </div>
  );
}
