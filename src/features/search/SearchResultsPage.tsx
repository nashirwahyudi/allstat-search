/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search, Compass, X, Calendar, MapPin, BookOpen, Database, Newspaper, ArrowRight } from "lucide-react";
import { PUBLICATIONS, NEWS_RELEASES, STAT_TABLES } from "../../services/mockData";
import { Publication, NewsItem, StatTable } from "../../types";
import { SECTION_PATHS, SectionKey } from "../../routes/paths";
import Skeleton from "../../components/Skeleton";
import useSimulatedLoading from "../../hooks/useSimulatedLoading";

interface SearchResultsPageProps {
  initialQuery: string;
  setGlobalSearch: (value: string) => void;
  onStartTour: () => void;
}

type ResultType = "publications" | "tables" | "news";
type ResultItem =
  | { type: "publications"; data: Publication }
  | { type: "tables"; data: StatTable }
  | { type: "news"; data: NewsItem };

const TYPE_BADGE_STYLES: Record<ResultType, string> = {
  publications: "bg-indigo-50 text-indigo-700",
  tables: "bg-teal-50 text-teal-700",
  news: "bg-orange-50 text-orange-700",
};

const TYPE_SECTION: Record<ResultType, Exclude<SectionKey, "dashboard">> = {
  publications: "publications",
  tables: "tables",
  news: "news",
};

export default function SearchResultsPage({ initialQuery, setGlobalSearch, onStartTour }: SearchResultsPageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") || "";

  const [inputValue, setInputValue] = useState(queryFromUrl || initialQuery);
  const [activeTab, setActiveTab] = useState<"all" | ResultType>("all");
  const [activeResult, setActiveResult] = useState<ResultItem | null>(null);

  const term = (queryFromUrl || initialQuery).trim().toLowerCase();
  const loading = useSimulatedLoading([term, activeTab]);

  // Keep the input in sync if navigated here again with a different query.
  useEffect(() => {
    setInputValue(queryFromUrl || initialQuery);
  }, [queryFromUrl, initialQuery]);

  const matches = useMemo(() => {
    if (!term) return { publications: [], tables: [], news: [] };
    return {
      publications: PUBLICATIONS.filter(
        (p) => p.title.toLowerCase().includes(term) || p.summary.toLowerCase().includes(term) || p.tags.some((tg) => tg.toLowerCase().includes(term))
      ),
      tables: STAT_TABLES.filter((tbl) => tbl.title.toLowerCase().includes(term) || tbl.description.toLowerCase().includes(term)),
      news: NEWS_RELEASES.filter((n) => n.title.toLowerCase().includes(term) || n.summary.toLowerCase().includes(term)),
    };
  }, [term]);

  const allResults: ResultItem[] = [
    ...matches.publications.map((data): ResultItem => ({ type: "publications", data })),
    ...matches.tables.map((data): ResultItem => ({ type: "tables", data })),
    ...matches.news.map((data): ResultItem => ({ type: "news", data })),
  ];

  const visibleResults = activeTab === "all" ? allResults : allResults.filter((r) => r.type === activeTab);

  const tabs: { key: "all" | ResultType; label: string; count: number }[] = [
    { key: "all", label: t("search.tabs.all"), count: allResults.length },
    { key: "publications", label: t("search.tabs.publications"), count: matches.publications.length },
    { key: "tables", label: t("search.tabs.tables"), count: matches.tables.length },
    { key: "news", label: t("search.tabs.news"), count: matches.news.length },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalSearch(inputValue);
    setSearchParams(inputValue.trim() ? { q: inputValue } : {});
  };

  const openSection = (item: ResultItem) => {
    setGlobalSearch(getResultTitle(item));
    navigate(SECTION_PATHS[TYPE_SECTION[item.type]]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8"
      id="search-results-section"
    >
      <div className="mb-6">
        <h1 className="font-sans text-2xl font-bold text-ink-dark">{t("search.title")}</h1>
        <p className="font-sans text-xs text-slate-400 mt-0.5">{t("search.subtitle")}</p>
      </div>

      {/* Search bar */}
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center rounded-full border-2 border-primary/20 bg-white p-1.5 shadow-sm focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all mb-6"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full border-none bg-transparent py-2 px-1 font-sans text-sm outline-none text-slate-800"
          id="search-page-input"
        />
        <button
          type="submit"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-dark text-white hover:bg-primary transition-all active:scale-95 shadow-sm"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      {term.length > 0 && (
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-5">
          <h3 className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest">
            {t("search.resultsFor")}: <span className="text-primary font-mono select-all normal-case">"{term}"</span>
          </h3>
          <button
            onClick={() => {
              setInputValue("");
              setGlobalSearch("");
              setSearchParams({});
            }}
            className="font-sans text-xs text-slate-400 hover:text-slate-600 font-semibold"
          >
            {t("search.clear")}
          </button>
        </div>
      )}

      {/* Category tabs with counts, referencing BPS's search-engine result grouping */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-lg px-4 py-1.5 font-sans text-xs font-medium transition-colors ${
              activeTab === tab.key ? "bg-primary text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab.label} <span className="opacity-70">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Result list */}
      {term.length > 0 && loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 bg-white p-4 flex items-start space-x-3">
              <Skeleton className="h-4 w-10 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : visibleResults.length > 0 ? (
        <div className="space-y-3">
          {visibleResults.map((item) => (
            <button
              key={`${item.type}-${item.data.id}`}
              onClick={() => setActiveResult(item)}
              className="w-full text-left rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all flex items-start space-x-3"
            >
              <span className={`rounded px-2 py-0.5 font-bold uppercase tracking-wide text-[9px] mt-0.5 flex-shrink-0 ${TYPE_BADGE_STYLES[item.type]}`}>
                {t(`search.badges.${item.type === "publications" ? "pub" : item.type === "tables" ? "table" : "news"}`)}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-sans font-bold text-sm text-slate-800">{getResultTitle(item)}</p>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{getResultSnippet(item)}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 flex-shrink-0 mt-1" />
            </button>
          ))}
        </div>
      ) : term.length === 0 ? null : (
        <div className="rounded-xl border border-slate-200 bg-white py-12 text-center text-slate-400">
          <Compass className="mx-auto h-10 w-10 text-slate-300" />
          <p className="mt-3 font-sans text-sm">{t("search.noResults")}</p>
          <p className="mt-1 font-sans text-xs max-w-sm mx-auto">{t("search.noResultsHint")}</p>
          <button
            onClick={onStartTour}
            className="mt-4 inline-flex items-center space-x-1.5 rounded-full bg-primary px-4 py-1.5 font-sans text-xs font-bold text-white hover:bg-action-hover shadow-sm"
          >
            <Compass className="h-4 w-4" />
            <span>{t("search.startTour")}</span>
          </button>
        </div>
      )}

      {/* Detail overlay */}
      <AnimatePresence>
        {activeResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveResult(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4">
                <div className="flex items-center space-x-2.5">
                  <div className="rounded bg-primary/15 p-1.5 text-primary">
                    {activeResult.type === "publications" && <BookOpen className="h-5 w-5" />}
                    {activeResult.type === "tables" && <Database className="h-5 w-5" />}
                    {activeResult.type === "news" && <Newspaper className="h-5 w-5" />}
                  </div>
                  <span className={`rounded px-2 py-0.5 font-bold uppercase tracking-wide text-[9px] ${TYPE_BADGE_STYLES[activeResult.type]}`}>
                    {t(`search.badges.${activeResult.type === "publications" ? "pub" : activeResult.type === "tables" ? "table" : "news"}`)}
                  </span>
                </div>
                <button
                  onClick={() => setActiveResult(null)}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[65vh] overflow-y-auto p-6 space-y-4">
                <h2 className="font-sans text-base font-bold text-ink-dark leading-snug">{getResultTitle(activeResult)}</h2>

                <div className="grid grid-cols-2 gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-3 text-xs">
                  {getResultMeta(activeResult, t).map((field) => (
                    <div key={field.label}>
                      <span className="text-slate-400 flex items-center gap-1">
                        {field.icon}
                        {field.label}
                      </span>
                      <p className="font-sans font-semibold text-slate-700 mt-0.5">{field.value}</p>
                    </div>
                  ))}
                </div>

                <p className="font-sans text-xs leading-relaxed text-slate-600 bg-tertiary/45 p-4 rounded-lg border border-tertiary-dark/10">
                  {getResultSnippet(activeResult)}
                </p>
              </div>

              <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 flex justify-end">
                <button
                  onClick={() => openSection(activeResult)}
                  className="flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 font-sans text-xs font-semibold text-white shadow-sm transition-colors hover:bg-action-hover"
                >
                  <span>{t("search.goToSection", { section: t(`header.nav.${TYPE_SECTION[activeResult.type]}`) })}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function getResultTitle(item: ResultItem): string {
  return item.data.title;
}

function getResultSnippet(item: ResultItem): string {
  if (item.type === "publications") return item.data.summary;
  if (item.type === "tables") return item.data.description;
  return item.data.summary;
}

function getResultMeta(item: ResultItem, t: (key: string, opts?: Record<string, unknown>) => string) {
  if (item.type === "publications") {
    return [
      { label: t("search.detail.category"), value: item.data.category, icon: null },
      { label: t("search.detail.year"), value: item.data.year, icon: <Calendar className="h-3 w-3" /> },
      { label: t("search.detail.region"), value: item.data.region, icon: <MapPin className="h-3 w-3" /> },
      { label: "Catalog ID", value: item.data.catalogId, icon: null },
    ];
  }
  if (item.type === "tables") {
    return [
      { label: t("search.detail.year"), value: item.data.year, icon: <Calendar className="h-3 w-3" /> },
      { label: t("search.detail.source"), value: item.data.source, icon: null },
      { label: t("search.detail.region"), value: item.data.regionLevel, icon: <MapPin className="h-3 w-3" /> },
    ];
  }
  return [
    { label: t("search.detail.category"), value: item.data.category, icon: null },
    { label: t("search.detail.date"), value: item.data.date, icon: <Calendar className="h-3 w-3" /> },
  ];
}
