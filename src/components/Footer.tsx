/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Globe, HelpCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50 py-10" id="app-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">
          
          {/* Copyright Group */}
          <div className="flex flex-col space-y-1.5 text-left">
            <h3 className="font-sans text-sm font-bold tracking-tight text-primary-dark">
              Data Integrity Portal
            </h3>
            <p className="font-sans text-xs text-slate-500">
              &copy; {currentYear} SE Integrity Portal. Official Statistics Authority of the Indonesian Economic Census.
            </p>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {["Privacy Policy", "Methodology", "API Docs", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="font-sans text-xs font-semibold text-slate-600 transition-colors hover:text-primary hover:underline"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right Icons/Interactions */}
          <div className="flex items-center space-x-4">
            <button 
              className="flex items-center space-x-1.5 rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-primary"
              title="Change Language"
            >
              <Globe className="h-4 w-4" />
              <span className="font-sans text-xs font-medium">Bahasa / EN</span>
            </button>
            
            <button 
              className="flex items-center space-x-1.5 rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-primary"
              title="Help and Support Center"
            >
              <HelpCircle className="h-4 w-4" />
              <span className="font-sans text-xs font-medium">Help</span>
            </button>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-8 border-t border-slate-200 pt-6 flex flex-col justify-between sm:flex-row text-[11px] text-slate-400 font-sans">
          <span>Disclaimer: This portal displays simulated statistical data and planning reports models for the SE2026 economic census exercise.</span>
          <span className="mt-1 sm:mt-0">Powered by Antigravity and BPS System Integration</span>
        </div>
      </div>
    </footer>
  );
}
