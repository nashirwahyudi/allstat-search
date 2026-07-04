/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Publication } from "../../types";
import { PUBLICATIONS } from "../../services/mockData";
import { BookOpen, Download, Eye, Tag, Calendar, Globe, Search, ArrowRight, X, FileText, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Skeleton from "../../components/Skeleton";
import useSimulatedLoading from "../../hooks/useSimulatedLoading";

interface PublicationsPanelProps {
  initialSearchQuery: string;
}

export default function PublicationsPanel({ initialSearchQuery }: PublicationsPanelProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState(initialSearchQuery || "");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [activePub, setActivePub] = useState<Publication | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadCompleted, setDownloadCompleted] = useState<boolean>(false);
  const loading = useSimulatedLoading([search, selectedCategory, selectedYear]);

  // Filter Logic
  const filteredPubs = PUBLICATIONS.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(search.toLowerCase()) ||
      pub.catalogId.toLowerCase().includes(search.toLowerCase()) ||
      pub.summary.toLowerCase().includes(search.toLowerCase()) ||
      pub.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || pub.category === selectedCategory;
    const matchesYear = selectedYear === "All" || pub.year.toString() === selectedYear;

    return matchesSearch && matchesCategory && matchesYear;
  });

  const categories = ["All", "Economy", "Social", "Population", "Environment"];
  const years = ["All", "2026", "2025"];

  const handleSimulatedDownload = (id: string) => {
    setDownloadCompleted(false);
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadCompleted(true);
          setTimeout(() => setDownloadProgress(null), 2500); // clear after brief pause
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  return (
    <div className="space-y-6" id="publications-section">
      {/* Search and Filters Hub */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
          
          {/* Inner Search Field */}
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t("publications.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pr-4 pl-11 font-sans text-sm outline-none transition-all focus:border-primary focus:ring-3 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Year Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="font-sans text-xs font-semibold text-slate-500">{t("publications.releaseYear")}</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-sans text-xs font-semibold text-slate-700 outline-none focus:border-primary"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y === "All" ? t("publications.allYears") : y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Categories Tab Row */}
        <div className="mt-5 border-t border-slate-100 pt-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-4 py-1.5 font-sans text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat === "All" ? t("publications.allCategories") : t(`publications.categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Publications Grid */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <Skeleton className="mb-4 h-48 w-full" />
              <Skeleton className="h-3 w-1/3 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      ) : filteredPubs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPubs.map((pub) => (
            <div
              key={pub.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              id={`pub-card-${pub.id}`}
            >
              <div>
                {/* Simulated Beautiful Book Cover design */}
                <div className="relative mb-4 flex h-48 w-full items-center justify-center rounded-lg bg-gradient-to-br from-slate-800 to-primary-dark p-4 text-center shadow-inner overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 opacity-30 group-hover:opacity-10 transition-opacity" />
                  <div className="absolute top-0 right-0 left-0 h-1.5 bg-yellow-500" />
                  
                  {/* Visual side binding line */}
                  <div className="absolute top-0 bottom-0 left-3 w-1 bg-white/20 border-r border-black/30" />

                  {/* Text Design for Book Cover */}
                  <div className="z-10 flex flex-col justify-between h-full py-2">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-secondary text-primary-fixed-dim">
                      {pub.category} • BPS OFFICIAL
                    </span>
                    <h4 className="font-sans text-xs font-bold leading-snug text-white line-clamp-3">
                      {pub.title}
                    </h4>
                    <div className="flex items-center justify-center space-x-1 font-sans text-[8px] font-semibold text-slate-300">
                      <span>RILIS: {pub.year}</span>
                      <span>|</span>
                      <span>CAT: {pub.catalogId.split(".")[0].replace("BPS-", "")}</span>
                    </div>
                  </div>
                </div>

                {/* Sub-header and Year badge */}
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center rounded bg-tertiary px-2 py-0.5 font-sans text-[10px] font-semibold text-secondary-dark">
                    {pub.category}
                  </span>
                  
                  <div className="flex items-center space-x-1 text-slate-400 font-sans text-xs">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{pub.year}</span>
                  </div>
                </div>

                {/* Title and Short Description */}
                <h3 className="mt-3 font-sans text-sm font-bold text-ink-dark line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {pub.title}
                </h3>
                
                <p className="mt-2 font-sans text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {pub.summary}
                </p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {pub.tags.slice(0, 3).map((tg) => (
                    <span key={tg} className="inline-flex items-center space-x-0.5 rounded px-2 py-0.5 font-mono text-[9px] text-slate-500 bg-slate-100">
                      <Tag className="h-2 w-2" />
                      <span>{tg}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Utility metrics & view triggers */}
              <div className="mt-5 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between text-slate-400 text-[11px] mb-3">
                  <div className="flex items-center space-x-1.5">
                    <Eye className="h-3.5 w-3.5" />
                    <span>{pub.viewCount.toLocaleString()} {t("publications.views")}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Download className="h-3.5 w-3.5" />
                    <span>{pub.downloadCount.toLocaleString()} {t("publications.downloads")}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    onClick={() => setActivePub(pub)}
                    className="flex items-center justify-center space-x-1.5 rounded-lg border border-slate-200 bg-white py-1.5 font-sans text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                    <span>{t("publications.readSummary")}</span>
                  </button>

                  <button
                    onClick={() => handleSimulatedDownload(pub.id)}
                    className="flex items-center justify-center space-x-1.5 rounded-lg bg-tertiary py-1.5 font-sans text-xs font-semibold text-secondary-dark transition-colors hover:bg-primary hover:text-white"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>{t("publications.download")}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white py-12 text-center text-slate-500">
          <BookOpen className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-4 font-sans text-base font-semibold text-ink-dark">{t("publications.noResultsTitle")}</h3>
          <p className="mt-2 font-sans text-xs max-w-sm mx-auto">
            {t("publications.noResultsHint")}
          </p>
          <button
            onClick={() => { setSearch(""); setSelectedCategory("All"); setSelectedYear("All"); }}
            className="mt-4 rounded-lg bg-primary px-4 py-2 font-sans text-xs font-semibold text-white hover:bg-action-hover"
          >
            {t("publications.clearFilters")}
          </button>
        </div>
      )}

      {/* Level 3 Overlay Publication Summary Modal */}
      <AnimatePresence>
        {activePub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4" id="publication-modal">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setActivePub(null); setDownloadProgress(null); }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal Inner Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4">
                <div className="flex items-center space-x-2.5">
                  <div className="rounded bg-primary/15 p-1.5 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-bold text-ink-dark">Official Statistical Abstract</h3>
                    <p className="font-mono text-[10px] text-slate-500">Catalog ID: {activePub.catalogId}</p>
                  </div>
                </div>
                <button
                  onClick={() => { setActivePub(null); setDownloadProgress(null); }}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body Content */}
              <div className="max-h-[65vh] overflow-y-auto p-6 space-y-5">
                <div className="flex flex-col md:flex-row gap-5">
                  
                  {/* Left Column: Visual Miniature Book */}
                  <div className="hidden sm:flex flex-col items-center justify-start py-1 px-3 w-40 bg-slate-100/50 rounded-lg border border-slate-200">
                    <div className="flex h-40 w-28 items-center justify-center rounded bg-gradient-to-br from-slate-700 to-primary p-3 text-center text-[10px] font-bold text-white shadow-md">
                      {activePub.title}
                    </div>
                    <span className="mt-3 font-mono text-[9px] text-slate-500">{activePub.size} PDF</span>
                    <span className="font-sans text-[10px] text-slate-400">{activePub.pages} Pages</span>
                  </div>

                  {/* Right Column: Key Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 uppercase tracking-wide">
                        {activePub.category} Category
                      </span>
                      <h2 className="mt-2 font-sans text-base font-bold text-ink-dark leading-snug">
                        {activePub.title}
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-3 text-xs">
                      <div>
                        <span className="text-slate-400">Authority Agent:</span>
                        <p className="font-sans font-semibold text-slate-700">BPS Indonesia</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Jurisdiction Spatial:</span>
                        <p className="font-sans font-semibold text-slate-700">{activePub.region}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Release Year:</span>
                        <p className="font-sans font-semibold text-slate-700">{activePub.year}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Format:</span>
                        <p className="font-sans font-semibold text-slate-700">PDF Document & API JSON</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytical Summary Block */}
                <div>
                  <h4 className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Publications Summary</h4>
                  <p className="font-sans text-xs leading-relaxed text-slate-600 bg-tertiary/45 p-4 rounded-lg border border-tertiary-dark/10">
                    {activePub.summary}
                  </p>
                </div>

                {/* Chapter Outline (Gives professional depth) */}
                <div>
                  <h4 className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wide mb-2.5">Document Outline & Chapters</h4>
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg bg-white overflow-hidden text-xs">
                    <div className="flex items-center justify-between p-3 bg-slate-50/50 hover:bg-slate-50">
                      <span className="font-semibold text-slate-700">Chapter I: Metodologi, Penarikan Sampel & Standardisasi Lapangan</span>
                      <span className="text-slate-400 font-mono text-[10px]">p. 1 - 24</span>
                    </div>
                    <div className="flex items-center justify-between p-3 hover:bg-slate-50">
                      <span className="font-semibold text-slate-700">Chapter II: Hasil Integrasi Digitalisasi Sektor Informasi Teknologi</span>
                      <span className="text-slate-400 font-mono text-[10px]">p. 25 - 90</span>
                    </div>
                    <div className="flex items-center justify-between p-3 hover:bg-slate-50">
                      <span className="font-semibold text-slate-700">Chapter III: Analisis Spasial Sebaran Wilayah Regional Provinsi</span>
                      <span className="text-slate-400 font-mono text-[10px]">p. 91 - 180</span>
                    </div>
                    <div className="flex items-center justify-between p-3 hover:bg-slate-50">
                      <span className="font-semibold text-slate-700">Chapter IV: Lampiran Tabel Statistik Utama (Detailed Datagrid)</span>
                      <span className="text-slate-400 font-mono text-[10px]">p. 181 - end</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Indicator and Footer Operations */}
              <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">
                {downloadProgress !== null ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-sans text-xs font-semibold text-primary">
                      <span className="flex items-center space-x-1.5">
                        {downloadCompleted ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 animate-bounce" />
                        ) : (
                          <Download className="h-4 w-4 animate-bounce" />
                        )}
                        <span>{downloadCompleted ? "Compilation success! Loading download..." : "Simulating data compilation..."}</span>
                      </span>
                      <span>{downloadProgress}%</span>
                    </div>
                    
                    {/* Census Design Rule - Thick Progress bar primary color on tertiary track */}
                    <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-400 font-sans text-xs">
                      <span>Total size: {activePub.size}</span>
                      <span>•</span>
                      <span>{activePub.downloadCount.toLocaleString()} downloads</span>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => { setActivePub(null); setDownloadProgress(null); }}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-sans text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() => handleSimulatedDownload(activePub.id)}
                        className="flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 font-sans text-xs font-semibold text-white shadow-sm transition-colors hover:bg-action-hover"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download Abstract PDF</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
