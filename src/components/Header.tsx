/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Compass, Search, Menu, X, Landmark } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { SECTION_PATHS } from "../routes/paths";

interface HeaderProps {
  onStartTour: () => void;
  setSearchQuery: (query: string) => void;
}

export default function Header({ onStartTour, setSearchQuery }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const navigationItems = [
    { id: "tables", label: t("header.nav.tables") },
    { id: "publications", label: t("header.nav.publications") },
    { id: "news", label: t("header.nav.news") },
  ] as const;

  const isActive = (id: typeof navigationItems[number]["id"]) => location.pathname === SECTION_PATHS[id];

  const handleNavClick = (id: typeof navigationItems[number]["id"]) => {
    navigate(SECTION_PATHS[id]);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand Title */}
        <div 
          className="flex cursor-pointer items-center space-x-2.5"
          onClick={() => { navigate(SECTION_PATHS.dashboard); setSearchQuery(""); }}
          id="nav-logo"
        >
          <img src="/assets/allstats-app-icon-512.webp" alt="Allstat Search" className="h-9 w-auto" />
          <h1 className="font-sans text-lg font-bold tracking-tight text-ink-dark flex items-center space-x-1">
            <span>Allstat</span>
            <span className="text-primary">Search</span>
          </h1>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              id={`nav-${item.id}`}
              className={`relative py-5 font-sans text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.id)
                  ? "text-primary-dark"
                  : "text-slate-500"
              }`}
            >
              {item.label}
              {isActive(item.id) && (
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
            <span>{t("header.tourButton")}</span>
          </button>

          <div className="flex items-center space-x-1.5 px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-mono text-[10px] font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <span>{t("header.liveBadge")}</span>
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
                  isActive(item.id)
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
              <span>{t("header.tourButton")}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
