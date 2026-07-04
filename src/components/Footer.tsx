/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, HelpCircle, Check } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "../i18n";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, i18n } = useTranslation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const activeLanguage = SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) ?? SUPPORTED_LANGUAGES[0];

  const handleSelectLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setLangMenuOpen(false);
  };

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50 py-10" id="app-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">

          {/* Copyright Group */}
          <div className="flex flex-col space-y-1.5 text-left">
            <h3 className="font-sans text-sm font-bold tracking-tight text-primary-dark">
              {t("footer.brand")}
            </h3>
            <p className="font-sans text-xs text-slate-500">
              {t("footer.copyright", { year: currentYear })}
            </p>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {[t("footer.links.privacy"), t("footer.links.methodology"), t("footer.links.apiDocs"), t("footer.links.contact")].map((link) => (
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
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen((prev) => !prev)}
                className="flex items-center space-x-1.5 rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-primary"
                title={t("footer.languageButton")}
              >
                <Globe className="h-4 w-4" />
                <span className="font-sans text-xs font-medium">{activeLanguage.label}</span>
              </button>

              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangMenuOpen(false)} />
                  <div className="absolute bottom-full right-0 z-20 mb-2 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleSelectLanguage(lang.code)}
                        className="flex w-full items-center justify-between px-3 py-2 font-sans text-xs text-slate-600 hover:bg-slate-50 hover:text-primary"
                      >
                        <span>{lang.label}</span>
                        {lang.code === activeLanguage.code && <Check className="h-3.5 w-3.5 text-primary" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              className="flex items-center space-x-1.5 rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-primary"
              title={t("footer.helpButton")}
            >
              <HelpCircle className="h-4 w-4" />
              <span className="font-sans text-xs font-medium">{t("footer.helpButton")}</span>
            </button>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-8 border-t border-slate-200 pt-6 flex flex-col justify-between sm:flex-row text-[11px] text-slate-400 font-sans">
          <span>{t("footer.disclaimer")}</span>
          <span className="mt-1 sm:mt-0">{t("footer.poweredBy")}</span>
        </div>
      </div>
    </footer>
  );
}
