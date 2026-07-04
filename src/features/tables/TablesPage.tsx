/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import TablesPanel from "./TablesPanel";

export default function TablesPage() {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      id="data-tables-section"
    >
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h1 className="font-sans text-2xl font-bold text-ink-dark">{t("tables.title")}</h1>
        <p className="font-sans text-xs text-slate-400 mt-0.5">{t("tables.subtitle")}</p>
      </div>
      <TablesPanel />
    </motion.div>
  );
}
