/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { NewsItem } from "../../types";
import { NEWS_RELEASES } from "../../services/mockData";
import { Calendar, User, Search, Eye, ArrowRight, Newspaper, ChevronRight, FileSpreadsheet, Percent, LayoutGrid } from "lucide-react";

interface NewsPanelProps {
  initialSearchQuery: string;
}

export default function NewsPanel({ initialSearchQuery }: NewsPanelProps) {
  const [search, setSearch] = useState(initialSearchQuery || "");
  const [selectedNewsId, setSelectedNewsId] = useState<string>(NEWS_RELEASES[0].id);

  // Filter Logic
  const filteredNews = NEWS_RELEASES.filter((item) => {
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Get active news model
  const activeNews = NEWS_RELEASES.find((item) => item.id === selectedNewsId) || NEWS_RELEASES[0];

  return (
    <div className="space-y-6" id="news-section">
      {/* Mini Inner Search Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-sans text-sm font-bold text-ink-dark">Berita Resmi Statistik (BRS)</h3>
          <p className="font-sans text-xs text-slate-400 mt-0.5">Explore hot press releases, quarterly announcements, and census dissemination updates.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search press releases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pr-4 pl-9 font-sans text-xs outline-none transition-all focus:border-primary focus:ring-3 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Left Side: News Feed List */}
        <div className="md:col-span-5 space-y-3 max-h-[70vh] overflow-y-auto pr-1">
          {filteredNews.length > 0 ? (
            filteredNews.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedNewsId(item.id)}
                className={`group relative rounded-xl border p-4 shadow-sm cursor-pointer transition-all ${
                  selectedNewsId === item.id
                    ? "bg-tertiary/20 border-primary shadow-sm"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-sans text-[9px] font-bold tracking-wide uppercase ${
                    item.category.includes("Sensus")
                      ? "bg-primary/10 text-primary-dark"
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    {item.category}
                  </span>
                  
                  <span className="font-mono text-[9px] text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{item.date}</span>
                  </span>
                </div>

                <h4 className="mt-2.5 font-sans text-xs sm:text-sm font-bold text-ink-dark leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h4>

                <p className="mt-2 font-sans text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>

                <div className="mt-3.5 flex items-center justify-between text-[10px] text-slate-400 font-sans border-t border-slate-100/50 pt-2">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{item.author}</span>
                  </span>
                  <span className="text-primary font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    <span>Read Details</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dotted border-slate-300 bg-slate-50 py-10 text-center text-slate-400">
              <Newspaper className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-3 font-sans text-xs">No press announcements match keywords.</p>
            </div>
          )}
        </div>

        {/* Right Side: Active Release Broadcaster and Mini-Charts */}
        <div className="md:col-span-7">
          {activeNews ? (
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-5 sticky top-20">
              {/* Header */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-start gap-2 text-[11px] text-slate-400 font-sans">
                  <span className="rounded bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-slate-600 font-bold uppercase tracking-wider">
                    {activeNews.category}
                  </span>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{activeNews.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      <span>{activeNews.author}</span>
                    </span>
                  </div>
                </div>

                <h1 className="mt-3 font-sans text-base sm:text-lg font-bold text-ink-dark leading-snug">
                  {activeNews.title}
                </h1>
              </div>

              {/* Analytical Brief Paragraph info */}
              <div className="rounded-lg bg-tertiary/15 border border-tertiary-dark/10 p-4 text-xs font-sans italic text-slate-600 leading-relaxed">
                <span className="font-bold flex items-center gap-1 text-slate-700 not-italic mb-1 font-sans text-xs uppercase tracking-wider">
                  <Percent className="h-3.5 w-3.5 text-primary" />
                  <span>Executive Statistical Abstract</span>
                </span>
                "{activeNews.summary}"
              </div>

              {/* Main Narrative Markdown mock */}
              <div className="font-sans text-xs text-slate-600 leading-relaxed space-y-3 max-h-52 overflow-y-auto pr-1">
                {activeNews.content.split("\n\n").map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Release Visualizer Data (Mini-Grid Charts overlay) */}
              {activeNews.visualData && (
                <div className="border-t border-slate-100 pt-4">
                  <h4 className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <LayoutGrid className="h-4 w-4 text-primary" />
                    <span>Distribution Indicators in Release</span>
                  </h4>

                  {/* Horizontal Bar Visual Grid (Dense, clean, accurate) */}
                  <div className="space-y-2.5">
                    {activeNews.visualData.map((node, nIdx) => {
                      // Work out maximum for percent scaling
                      const maxVal = Math.max(...(activeNews.visualData?.map(v => v.value) || [100]));
                      const fillWidth = (node.value / maxVal) * 100;

                      return (
                        <div key={node.label} className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="font-semibold text-slate-700">{node.label}</span>
                            <span className="font-mono text-xs font-bold text-slate-800">
                              {node.value}{activeNews.id === "news-002" || activeNews.id === "news-004" ? "%" : "% YoY"}
                            </span>
                          </div>
                          
                          {/* Sensus Style Progress Line */}
                          <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${fillWidth}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Operations */}
              <div className="border-t border-slate-100/80 pt-3.5 flex items-center justify-between text-xs font-sans">
                <span className="text-slate-400">Published by BPS Newsroom</span>
                
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert("Simulated: Navigating to downstream BRS catalog repository."); }}
                  className="inline-flex items-center space-x-1 font-bold text-primary hover:text-action-hover active:scale-95 transition-all"
                >
                  <span>Download Full Press Release (PDF)</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white py-24 text-center text-slate-400">
              <Newspaper className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-4 font-sans text-base font-semibold text-slate-700">Explore releases</h3>
              <p className="mt-2 font-sans text-xs">Select any press item from the feed on the left to read and analyze data indices.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
