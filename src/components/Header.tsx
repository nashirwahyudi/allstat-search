/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BarChart3, Compass, Search, Menu, X, Landmark } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  activeTab: "dashboard" | "publications" | "tables" | "news";
  setActiveTab: (tab: "dashboard" | "publications" | "tables" | "news") => void;
  onStartTour: () => void;
  setSearchQuery: (query: string) => void;
}

export default function Header({ activeTab, setActiveTab, onStartTour, setSearchQuery }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "tables", label: "Browse Data / Tables" },
    { id: "publications", label: "Publications" },
    { id: "news", label: "News & Releases" },
  ] as const;

  const handleNavClick = (id: typeof navigationItems[number]["id"]) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand Title */}
        <div 
          className="flex cursor-pointer items-center space-x-2.5" 
          onClick={() => { setActiveTab("dashboard"); setSearchQuery(""); }}
          id="nav-logo"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-tertiary text-primary-dark shadow-sm">
            <BarChart3 className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-sans text-lg font-bold tracking-tight text-ink-dark flex items-center space-x-1">
              <span>Integrity</span>
              <span className="text-primary">Portal</span>
            </h1>
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">SE2026 Portal</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              id={`nav-${item.id}`}
              className={`relative py-5 font-sans text-sm font-medium transition-colors hover:text-primary ${
                activeTab === item.id
                  ? "text-primary-dark"
                  : "text-slate-500"
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={onStartTour}
            className="group flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 font-sans text-xs font-bold text-white shadow-sm transition-all hover:bg-action-hover active:scale-95"
            id="nav-tour-btn"
          >
            <Compass className="h-4 w-4 animate-spin-[spin_4s_linear_infinite]" />
            <span>Interactive Guide</span>
          </button>
          
          <div className="flex items-center space-x-1.5 px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-mono text-[10px] font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <span>BPI NEWS LIVE</span>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={onStartTour}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white hover:bg-action-hover"
            title="Start Guide Tour"
          >
            <Compass className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? "bg-tertiary text-primary-dark"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => { setMobileMenuOpen(false); onStartTour(); }}
              className="flex w-full items-center justify-center space-x-2 rounded-lg bg-primary py-2.5 text-xs font-semibold text-white shadow-sm"
            >
              <Compass className="h-4 w-4" />
              <span>Interactive Guide</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
