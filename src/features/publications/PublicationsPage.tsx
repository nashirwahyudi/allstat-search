/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { PUBLICATIONS } from "../../services/mockData";
import PublicationsPanel from "./PublicationsPanel";

interface PublicationsPageProps {
  initialSearchQuery: string;
}

export default function PublicationsPage({ initialSearchQuery }: PublicationsPageProps) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      id="publications-index-section"
    >
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h1 className="font-sans text-2xl font-bold text-ink-dark">{t("publications.title")}</h1>
          <p className="font-sans text-xs text-slate-400 mt-0.5">{t("publications.subtitle")}</p>
        </div>
        <div className="font-sans text-[10px] text-slate-400 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg font-bold self-start">
          {t("publications.totalIndex", { count: PUBLICATIONS.length })}
        </div>
      </div>
      <PublicationsPanel initialSearchQuery={initialSearchQuery} />
    </motion.div>
  );
}
