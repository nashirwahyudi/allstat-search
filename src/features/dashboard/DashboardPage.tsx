/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RefObject } from "react";
import { useNavigate } from "react-router-dom";
import { PUBLICATIONS, NEWS_RELEASES, STAT_TABLES } from "../../services/mockData";
import { Search, BookOpen, Table, Newspaper, Compass, TrendingUp, Users, Presentation, Landmark, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { SECTION_PATHS, SectionKey } from "../../routes/paths";

interface DashboardPageProps {
  globalSearch: string;
  searchTriggered: boolean;
  setGlobalSearch: (value: string) => void;
  setSearchTriggered: (value: boolean) => void;
  onStartTour: () => void;
  searchInputRef: RefObject<HTMLInputElement>;
}

export default function DashboardPage({
  globalSearch,
  searchTriggered,
  setGlobalSearch,
  setSearchTriggered,
  onStartTour,
  searchInputRef,
}: DashboardPageProps) {
  const navigate = useNavigate();

  const handleCategoryCardClick = (section: Exclude<SectionKey, "dashboard">) => {
    navigate(SECTION_PATHS[section]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToSection = (section: Exclude<SectionKey, "dashboard">) => {
    navigate(SECTION_PATHS[section]);
    setSearchTriggered(false);
  };

  // Global Search Matches
  const searchMatches = (() => {
    if (!globalSearch.trim()) return { publications: [], tables: [], news: [] };
    const term = globalSearch.toLowerCase();

    return {
      publications: PUBLICATIONS.filter(p => p.title.toLowerCase().includes(term) || p.summary.toLowerCase().includes(term) || p.tags.some(t => t.toLowerCase().includes(term))),
      tables: STAT_TABLES.filter(t => t.title.toLowerCase().includes(term) || t.description.toLowerCase().includes(term)),
      news: NEWS_RELEASES.filter(n => n.title.toLowerCase().includes(term) || n.summary.toLowerCase().includes(term))
    };
  })();

  const hasSearchMatches = searchMatches.publications.length > 0 || searchMatches.tables.length > 0 || searchMatches.news.length > 0;

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

          {/* High Quality Styled Institutional Blue/Teal Vector Illustration */}
          <div className="w-full flex items-center justify-center pointer-events-none select-none">
            <svg viewBox="0 0 720 300" className="w-full max-w-lg h-auto overflow-visible">
              <rect width="100%" height="100%" fill="none" />

              {/* Stylized background circular coordinates */}
              <circle cx="360" cy="150" r="130" fill="none" stroke="#004B87" strokeWidth="1" strokeOpacity="0.08" strokeDasharray="3 3"/>
              <circle cx="360" cy="150" r="95" fill="none" stroke="#111c2c" strokeWidth="1" strokeOpacity="0.05" />

              {/* Floating Grid coordinate lines representing statistics */}
              <g stroke="#004B87" strokeOpacity="0.12" strokeWidth="1.5">
                <line x1="160" y1="150" x2="560" y2="150" />
                <line x1="360" y1="30" x2="360" y2="270" strokeDasharray="3 4" />
                <line x1="280" y1="80" x2="440" y2="240" strokeWidth="0.8" />
              </g>

              {/* Bar graph accents in grey and blue */}
              <g fillOpacity="0.1">
                <rect x="250" y="180" width="18" height="40" fill="#111c2c" rx="1" />
                <rect x="272" y="160" width="18" height="60" fill="#004B87" rx="1" />
                <rect x="294" y="190" width="18" height="30" fill="#111c2c" rx="1" />
                <rect x="410" y="170" width="18" height="50" fill="#004B87" rx="1" />
                <rect x="432" y="145" width="18" height="75" fill="#111c2c" rx="1" />
              </g>

              {/* Main central office desk representing SE2026 collaboration */}
              <rect x="310" y="210" width="100" height="6" fill="#111c2c" rx="3" />
              <line x1="330" y1="210" x2="330" y2="260" stroke="#111c2c" strokeWidth="5" strokeLinecap="round" />
              <line x1="390" y1="210" x2="390" y2="260" stroke="#111c2c" strokeWidth="5" strokeLinecap="round" />
              <circle cx="330" cy="260" r="10" fill="#004B87" fillOpacity="0.15" />
              <circle cx="390" cy="260" r="10" fill="#004B87" fillOpacity="0.15" />

              {/* Silhouette Worker left (woman, teal coat) */}
              <g>
                {/* Stool */}
                <line x1="270" y1="250" x2="270" y2="275" stroke="#111c2c" strokeWidth="3" />
                <ellipse cx="270" cy="248" rx="14" ry="4" fill="#00A99D" />

                {/* Hair and body curves */}
                <path d="M260,230 Q254,195 264,170 Q274,155 284,175 Q294,195 286,220 Q284,235 275,248" fill="#00A99D" />
                <circle cx="282" cy="150" r="14" fill="#111c2c" />
                {/* Teal highlights */}
                <path d="M280,140 Q294,142 290,160 Z" fill="#00A99D" />

                {/* Arms pointing at laptop */}
                <path d="M284,175 Q320,180 324,190" stroke="#111c2c" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              </g>

              {/* Central Laptop Device on Desk */}
              <g>
                <polygon points="340,195 380,195 385,208 335,208" fill="#111c2c" />
                <rect x="345" y="180" width="30" height="16" fill="#004B87" rx="1" />
                <line x1="335" y1="208" x2="385" y2="208" stroke="#ffffff" strokeWidth="1.5" />
              </g>

              {/* Silhouette Worker right (man, blue shirt) */}
              <g>
                {/* Stool */}
                <line x1="450" y1="250" x2="450" y2="275" stroke="#111c2c" strokeWidth="3" />
                <ellipse cx="450" cy="248" rx="14" ry="4" fill="#004B87" />

                {/* Torso back and legs */}
                <path d="M460,230 Q470,195 458,168 Q444,155 438,172 Q432,192 440,225 Q442,238 448,248" fill="#004B87" />
                <circle cx="436" cy="148" r="14" fill="#111c2c" />

                {/* Arm extending */}
                <path d="M442,172 Q395,178 390,188" stroke="#111c2c" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              </g>

              {/* Dynamic upward trajectory overlay arrow representing economic motion */}
              <path d="M120,240 Q150,180 230,150 T450,110 T600,60" fill="none" stroke="#004B87" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 1" />
              <polygon points="600,60 590,72 602,74" fill="#004B87" />
            </svg>
          </div>

          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Data Integrity <span className="text-primary">Portal</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Access official statistics, regional data, and comprehensive reports from the Sensus Ekonomi 2026 guidelines. Powered by BPS and Antigravity.
          </p>
        </div>

        {/* Primary Large Portal Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <form
            onSubmit={(e) => { e.preventDefault(); setSearchTriggered(true); }}
            className="relative flex items-center rounded-full border-2 border-primary/20 bg-white p-1.5 shadow-md focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search by topic, keyword, or catalog ID..."
              value={globalSearch}
              onChange={(e) => { setGlobalSearch(e.target.value); setSearchTriggered(true); }}
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
            <span>
              Ready to search now? Find your desired documents instantly in our fast repository.
            </span>
          </div>
        </div>

        {/* Interactive Search Matches Overlay (If triggered) */}
        {searchTriggered && globalSearch.trim().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mb-12 rounded-xl border border-primary/10 bg-white/95 p-5 shadow-lg backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest">
                Unified Search Results for: <span className="text-primary font-mono select-all">"{globalSearch}"</span>
              </h3>
              <button
                onClick={() => { setGlobalSearch(""); setSearchTriggered(false); }}
                className="font-sans text-xs text-slate-400 hover:text-slate-600 font-semibold"
              >
                Clear
              </button>
            </div>

            {hasSearchMatches ? (
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2 divide-y divide-slate-100 text-xs">

                {/* Publications hits */}
                {searchMatches.publications.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => goToSection("publications")}
                    className="flex items-start py-3 space-x-3 cursor-pointer hover:bg-slate-50 rounded px-2 first:pt-0"
                  >
                    <span className="rounded bg-indigo-50 text-indigo-700 px-2 py-0.5 font-bold uppercase tracking-wide text-[9px] mt-0.5">PUB</span>
                    <div>
                      <p className="font-sans font-bold text-slate-800 hover:text-primary">{p.title}</p>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{p.summary}</p>
                    </div>
                  </div>
                ))}

                {/* Tables hits */}
                {searchMatches.tables.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => goToSection("tables")}
                    className="flex items-start py-3 space-x-3 cursor-pointer hover:bg-slate-50 rounded px-2"
                  >
                    <span className="rounded bg-teal-50 text-teal-700 px-2 py-0.5 font-bold uppercase tracking-wide text-[9px] mt-0.5">TABLE</span>
                    <div>
                      <p className="font-sans font-bold text-slate-800 hover:text-primary">{t.title}</p>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{t.description}</p>
                    </div>
                  </div>
                ))}

                {/* News hits */}
                {searchMatches.news.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => goToSection("news")}
                    className="flex items-start py-3 space-x-3 cursor-pointer hover:bg-slate-50 rounded px-2"
                  >
                    <span className="rounded bg-orange-50 text-orange-700 px-2 py-0.5 font-bold uppercase tracking-wide text-[9px] mt-0.5">NEWS</span>
                    <div>
                      <p className="font-sans font-bold text-slate-800 hover:text-primary">{n.title}</p>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{n.summary}</p>
                    </div>
                  </div>
                ))}

              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 space-y-2">
                <Compass className="h-8 w-8 mx-auto text-slate-300" />
                <p className="font-sans text-xs">No direct document matches found.</p>
                <button
                  onClick={onStartTour}
                  className="mt-2 inline-flex items-center space-x-1.5 rounded-full bg-primary px-4 py-1.5 font-sans text-xs font-bold text-white hover:bg-action-hover shadow-sm"
                >
                  <Compass className="h-4 w-4 animate-spin-[spin_5s_linear_infinite]" />
                  <span>Start Guided Tour</span>
                </button>
              </div>
            )}
          </motion.div>
        )}

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
                Publication
              </h3>
              <p className="mt-2 font-sans text-xs sm:text-xs text-slate-500 leading-relaxed">
                Access digital versions of official statistical yearbooks, technical guidance booklets, and regional economic summaries.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
              <span>Explore Publications</span>
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
                Table
              </h3>
              <p className="mt-2 font-sans text-xs sm:text-xs text-slate-500 leading-relaxed">
                Query dynamic data grids on provincial consumer price indexes, labor indicators, and Sensus Ekonomi sebaran unit target.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
              <span>Browse Data Tables</span>
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
                Official Statistic News
              </h3>
              <p className="mt-2 font-sans text-xs sm:text-xs text-slate-500 leading-relaxed">
                Stay updated with the latest press briefs, quarterly inflation indices, structural PDRB news, and BRS files.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
              <span>Read Releases</span>
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
                <span>Sensus Ekonomi SE2026 Core Metrics</span>
              </span>
              <h3 className="mt-2 font-sans text-lg font-extrabold text-slate-900">
                Statistik Utama & Target Kerja Nasional
              </h3>
            </div>

            <button
              onClick={onStartTour}
              className="mt-3 md:mt-0 flex items-center space-x-2 rounded-lg bg-slate-900 border border-slate-800 px-4 py-2.5 font-sans text-xs font-bold text-white hover:bg-slate-800 active:scale-95 transition-all"
            >
              <Compass className="h-4 w-4 text-primary animate-spin-[spin_5s_linear_infinite]" />
              <span>Interactive Portal Guide</span>
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Stat item 1 */}
            <div className="rounded-xl bg-slate-50/50 border border-slate-150 p-4 transition-all hover:bg-white hover:shadow-md">
              <div className="flex items-center justify-between text-slate-400">
                <TrendingUp className="h-4.5 w-4.5 text-orange-600" />
                <span className="font-sans text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">STABIL</span>
              </div>
              <p className="mt-4 font-mono text-xl sm:text-2xl font-extrabold text-slate-900">2.30%</p>
              <h4 className="mt-1 font-sans text-xs font-bold text-slate-700">Nasional Inflation Rate</h4>
              <p className="mt-1.5 font-sans text-[11px] text-slate-400 leading-tight">Year-on-Year Gabungan (Mei 2026 update)</p>
            </div>

            {/* Stat item 2 */}
            <div className="rounded-xl bg-slate-50/50 border border-slate-150 p-4 transition-all hover:bg-white hover:shadow-md">
              <div className="flex items-center justify-between text-slate-400">
                <Users className="h-4.5 w-4.5 text-orange-600" />
                <span className="font-sans text-[10px] font-bold text-primary bg-orange-50 px-1.5 py-0.5 rounded">TURUN (-0.18)</span>
              </div>
              <p className="mt-4 font-mono text-xl sm:text-2xl font-extrabold text-slate-900">5.02%</p>
              <h4 className="mt-1 font-sans text-xs font-bold text-slate-700">Open Unemployment (TPT)</h4>
              <p className="mt-1.5 font-sans text-[11px] text-slate-400 leading-tight">Q1 2026 Sakernas labor contraction indicators</p>
            </div>

            {/* Stat item 3 */}
            <div className="rounded-xl bg-slate-50/50 border border-slate-150 p-4 transition-all hover:bg-white hover:shadow-md">
              <div className="flex items-center justify-between text-slate-400">
                <Landmark className="h-4.5 w-4.5 text-orange-600" />
                <span className="font-sans text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">SE2026 GOAL</span>
              </div>
              <p className="mt-4 font-mono text-xl sm:text-2xl font-extrabold text-slate-900">28.4 M</p>
              <h4 className="mt-1 font-sans text-xs font-bold text-slate-700">Registered Businesses</h4>
              <p className="mt-1.5 font-sans text-[11px] text-slate-400 leading-tight">Target scale-out count non-agricultural blocks</p>
            </div>

            {/* Stat item 4 */}
            <div className="rounded-xl bg-slate-50/50 border border-slate-150 p-4 transition-all hover:bg-white hover:shadow-md">
              <div className="flex items-center justify-between text-slate-400">
                <Presentation className="h-4.5 w-4.5 text-orange-600" />
                <span className="font-sans text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">REKOR BARU</span>
              </div>
              <p className="mt-4 font-mono text-xl sm:text-2xl font-extrabold text-slate-900">69.4%</p>
              <h4 className="mt-1 font-sans text-xs font-bold text-slate-700">Labor Participation (TPAK)</h4>
              <p className="mt-1.5 font-sans text-[11px] text-slate-400 leading-tight">Maximum participation rates recorded Q1 2026</p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
