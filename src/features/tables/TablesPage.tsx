/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import TablesPanel from "./TablesPanel";

export default function TablesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      id="data-tables-section"
    >
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h1 className="font-sans text-2xl font-bold text-ink-dark">Dynamic Data Tables</h1>
          <p className="font-sans text-xs text-slate-400 mt-0.5">Filter, sort, and visualize key BPS indicators down to the provincial plane.</p>
        </div>
        <div className="font-sans text-[10px] text-slate-400 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg font-bold self-start flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          <span>Interactive Charts Connected</span>
        </div>
      </div>
      <TablesPanel />
    </motion.div>
  );
}
