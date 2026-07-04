/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RefObject, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Search, BookOpen, Table, Newspaper, Compass, TrendingUp, Users, Presentation, Landmark, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { SECTION_PATHS, SEARCH_PATH, SectionKey } from "../../routes/paths";
import Lottie from "lottie-react";

const LOTTIE_SRC = "/assets/search-docs.json";

interface DashboardPageProps {
  globalSearch: string;
  setGlobalSearch: (value: string) => void;
  onStartTour: () => void;
  searchInputRef: RefObject<HTMLInputElement>;
}

export default function DashboardPage({
  globalSearch,
  setGlobalSearch,
  onStartTour,
  searchInputRef,
}: DashboardPageProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [animationData, setAnimationData] = useState<object | null>(null);

  const handleCategoryCardClick = (section: Exclude<SectionKey, "dashboard">) => {
    navigate(SECTION_PATHS[section]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!globalSearch.trim()) return;
    navigate(`${SEARCH_PATH}?q=${encodeURIComponent(globalSearch.trim())}`);
  };

  
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="relative bg-grid-dot pb-16"
    >
      {/* Clean outer layer margin desktop */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">

        {/* Visual Premium Center Header and Vector Graphic */}
        <div className="text-center space-y-6 max-w-3xl mx-auto mb-10">
          
          <div className="h-[27.5rem] w-[27.5rem] sm:h-[17.6rem] sm:w-[17.6rem] mx-auto my-0">
            {animationData && <Lottie animationData={animationData} loop autoplay />}
          </div>

          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            {t("dashboard.title")} <span className="text-primary">{t("dashboard.titleHighlight")}</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            {t("dashboard.subtitle")}
          </p>
        </div>

        {/* Primary Large Portal Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center rounded-full border-2 border-primary/20 bg-white p-1.5 shadow-md focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              placeholder={t("dashboard.searchPlaceholder")}
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full border-none bg-transparent py-2 px-1 font-sans text-sm sm:text-base outline-none text-slate-800"
              id="main-search-input"
            />
            <button
              type="submit"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-dark text-white hover:bg-primary transition-all active:scale-95 shadow-sm"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* Ready to Search helper status line */}
          <div className="mt-3.5 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-sans">
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            <span>{t("dashboard.searchHelper")}</span>
          </div>
        </div>

        {/* Categories Tab Cards (exactly as presented in visual mockup specification) */}
        <div className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto mb-16">
          {/* Publication Card */}
          <div
            onClick={() => handleCategoryCardClick("publications")}
            className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer"
            id="card-publication"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary text-primary shadow-inner">
                <BookOpen className="h-6 w-6 stroke-[2]" />
              </div>
              <h3 className="mt-5 font-sans text-base font-bold text-ink-dark group-hover:text-primary transition-colors">
                {t("dashboard.cards.publications.title")}
              </h3>
              <p className="mt-2 font-sans text-xs sm:text-xs text-slate-500 leading-relaxed">
                {t("dashboard.cards.publications.description")}
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
              <span>{t("dashboard.cards.publications.cta")}</span>
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </div>
          </div>

          {/* Table Card */}
          <div
            onClick={() => handleCategoryCardClick("tables")}
            className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer"
            id="card-table"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary text-primary shadow-inner">
                <Table className="h-6 w-6 stroke-[2]" />
              </div>
              <h3 className="mt-5 font-sans text-base font-bold text-ink-dark group-hover:text-primary transition-colors">
                {t("dashboard.cards.tables.title")}
              </h3>
              <p className="mt-2 font-sans text-xs sm:text-xs text-slate-500 leading-relaxed">
                {t("dashboard.cards.tables.description")}
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
              <span>{t("dashboard.cards.tables.cta")}</span>
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </div>
          </div>

          {/* News Card */}
          <div
            onClick={() => handleCategoryCardClick("news")}
            className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer"
            id="card-news"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary text-primary shadow-inner">
                <Newspaper className="h-6 w-6 stroke-[2]" />
              </div>
              <h3 className="mt-5 font-sans text-base font-bold text-ink-dark group-hover:text-primary transition-colors">
                {t("dashboard.cards.news.title")}
              </h3>
              <p className="mt-2 font-sans text-xs sm:text-xs text-slate-500 leading-relaxed">
                {t("dashboard.cards.news.description")}
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
              <span>{t("dashboard.cards.news.cta")}</span>
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </div>
          </div>
        </div>

        {/* BPS Sensus Ekonomi Indicators Bento Grid Panel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 max-w-5xl mx-auto shadow-sm" id="core-metrics-section">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-5 mb-6">
            <div>
              <span className="inline-flex items-center space-x-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest border border-slate-200">
                <Landmark className="h-3.5 w-3.5 text-primary" />
                <span>{t("dashboard.metrics.badge")}</span>
              </span>
              <h3 className="mt-2 font-sans text-lg font-extrabold text-slate-900">
                {t("dashboard.metrics.title")}
              </h3>
            </div>

            <button
              onClick={onStartTour}
              className="mt-3 md:mt-0 flex items-center space-x-2 rounded-lg bg-slate-900 border border-slate-800 px-4 py-2.5 font-sans text-xs font-bold text-white hover:bg-slate-800 active:scale-95 transition-all"
            >
              <Compass className="h-4 w-4 text-primary animate-spin-[spin_5s_linear_infinite]" />
              <span>{t("dashboard.metrics.guideButton")}</span>
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Stat item 1 */}
            <div className="rounded-xl bg-slate-50/50 border border-slate-150 p-4 transition-all hover:bg-white hover:shadow-md">
              <div className="flex items-center justify-between text-slate-400">
                <TrendingUp className="h-4.5 w-4.5 text-orange-600" />
                <span className="font-sans text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">{t("dashboard.metrics.inflation.status")}</span>
              </div>
              <p className="mt-4 font-mono text-xl sm:text-2xl font-extrabold text-slate-900">2.30%</p>
              <h4 className="mt-1 font-sans text-xs font-bold text-slate-700">{t("dashboard.metrics.inflation.label")}</h4>
              <p className="mt-1.5 font-sans text-[11px] text-slate-400 leading-tight">{t("dashboard.metrics.inflation.caption")}</p>
            </div>

            {/* Stat item 2 */}
            <div className="rounded-xl bg-slate-50/50 border border-slate-150 p-4 transition-all hover:bg-white hover:shadow-md">
              <div className="flex items-center justify-between text-slate-400">
                <Users className="h-4.5 w-4.5 text-orange-600" />
                <span className="font-sans text-[10px] font-bold text-primary bg-orange-50 px-1.5 py-0.5 rounded">{t("dashboard.metrics.unemployment.status")}</span>
              </div>
              <p className="mt-4 font-mono text-xl sm:text-2xl font-extrabold text-slate-900">5.02%</p>
              <h4 className="mt-1 font-sans text-xs font-bold text-slate-700">{t("dashboard.metrics.unemployment.label")}</h4>
              <p className="mt-1.5 font-sans text-[11px] text-slate-400 leading-tight">{t("dashboard.metrics.unemployment.caption")}</p>
            </div>

            {/* Stat item 3 */}
            <div className="rounded-xl bg-slate-50/50 border border-slate-150 p-4 transition-all hover:bg-white hover:shadow-md">
              <div className="flex items-center justify-between text-slate-400">
                <Landmark className="h-4.5 w-4.5 text-orange-600" />
                <span className="font-sans text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{t("dashboard.metrics.businesses.status")}</span>
              </div>
              <p className="mt-4 font-mono text-xl sm:text-2xl font-extrabold text-slate-900">28.4 M</p>
              <h4 className="mt-1 font-sans text-xs font-bold text-slate-700">{t("dashboard.metrics.businesses.label")}</h4>
              <p className="mt-1.5 font-sans text-[11px] text-slate-400 leading-tight">{t("dashboard.metrics.businesses.caption")}</p>
            </div>

            {/* Stat item 4 */}
            <div className="rounded-xl bg-slate-50/50 border border-slate-150 p-4 transition-all hover:bg-white hover:shadow-md">
              <div className="flex items-center justify-between text-slate-400">
                <Presentation className="h-4.5 w-4.5 text-orange-600" />
                <span className="font-sans text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{t("dashboard.metrics.participation.status")}</span>
              </div>
              <p className="mt-4 font-mono text-xl sm:text-2xl font-extrabold text-slate-900">69.4%</p>
              <h4 className="mt-1 font-sans text-xs font-bold text-slate-700">{t("dashboard.metrics.participation.label")}</h4>
              <p className="mt-1.5 font-sans text-[11px] text-slate-400 leading-tight">{t("dashboard.metrics.participation.caption")}</p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
