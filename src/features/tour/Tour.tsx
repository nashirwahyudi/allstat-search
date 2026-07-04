/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { Compass, ArrowRight, ArrowLeft, X, Sparkles, Check, HelpCircle, Table, BookOpen, Newspaper, Landmark } from "lucide-react";
import { SECTION_PATHS, SectionKey } from "../../routes/paths";

interface TourStep {
  title: string;
  description: string;
  tab: SectionKey;
  highlightId?: string;
  icon: React.ReactNode;
}

interface TourProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Tour({ isOpen, onClose }: TourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const steps: TourStep[] = [
    {
      title: t("tour.steps.welcome.title"),
      description: t("tour.steps.welcome.description"),
      tab: "dashboard",
      icon: <Compass className="h-6 w-6 text-primary animate-spin-[spin_3s_linear_infinite]" />,
    },
    {
      title: t("tour.steps.metrics.title"),
      description: t("tour.steps.metrics.description"),
      tab: "dashboard",
      highlightId: "core-metrics-section",
      icon: <Landmark className="h-6 w-6 text-primary" />,
    },
    {
      title: t("tour.steps.tables.title"),
      description: t("tour.steps.tables.description"),
      tab: "tables",
      highlightId: "data-tables-section",
      icon: <Table className="h-6 w-6 text-primary" />,
    },
    {
      title: t("tour.steps.publications.title"),
      description: t("tour.steps.publications.description"),
      tab: "publications",
      highlightId: "publications-index-section",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
    },
    {
      title: t("tour.steps.news.title"),
      description: t("tour.steps.news.description"),
      tab: "news",
      highlightId: "news-section",
      icon: <Newspaper className="h-6 w-6 text-primary" />,
    }
  ];

  // Auto-switch tabs in background as user advances in steps
  useEffect(() => {
    if (isOpen) {
      const step = steps[currentStep];
      if (step && location.pathname !== SECTION_PATHS[step.tab]) {
        navigate(SECTION_PATHS[step.tab]);
      }

      // Auto scroll to highlighted elements to ensure premium visibility
      if (step && step.highlightId) {
        setTimeout(() => {
          const el = document.getElementById(step.highlightId!);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 150);
      }
    }
  }, [currentStep, isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      localStorage.setItem("allstat_tour_complete", "true");
      onClose();
      setCurrentStep(0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("allstat_tour_complete", "true");
    onClose();
    setCurrentStep(0);
  };

  const activeStep = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
        onClick={handleSkip}
      />

      {/* Spotlight highlight overlay logic for element */}
      {activeStep.highlightId && (
        <div className="fixed pointer-events-none inset-0 z-40">
          {(() => {
            const el = document.getElementById(activeStep.highlightId!);
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            return (
              <div 
                className="absolute border-2 border-primary/90 bg-primary/5 rounded-2xl shadow-[0_0_0_9999px_rgba(15,23,42,0.65)] transition-all duration-500"
                style={{
                  top: rect.top - 8,
                  left: rect.left - 8,
                  width: rect.width + 16,
                  height: rect.height + 16,
                }}
              />
            );
          })()}
        </div>
      )}

      {/* Tour Dialogue Box Card - Responsive, modern, clean */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          transition={{ duration: 0.25 }}
          className="relative z-50 w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
          id="onboarding-tour-dialog"
        >
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center space-x-2">
              <span className="rounded-lg bg-primary/10 p-2 text-primary">
                {activeStep.icon}
              </span>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                  {t("tour.stepCounter", { current: currentStep + 1, total: steps.length })}
                </span>
                <h4 className="font-sans text-xs font-extrabold text-primary uppercase tracking-wide flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>{t("tour.onboardingGuide")}</span>
                </h4>
              </div>
            </div>

            <button 
              onClick={handleSkip}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              title="Skip Tour"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="space-y-3">
            <h3 className="font-sans text-base font-extrabold text-slate-900 leading-tight">
              {activeStep.title}
            </h3>
            <p className="font-sans text-xs text-slate-600 leading-relaxed">
              {activeStep.description}
            </p>
          </div>

          {/* Progress dots & Active section tag */}
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="flex items-center space-x-1.5">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentStep ? "w-6 bg-primary" : "w-2 bg-slate-200 hover:bg-slate-350"
                  }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>

            <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {t("tour.viewing", { tab: activeStep.tab })}
            </span>
          </div>

          {/* Control Footer Buttons */}
          <div className="mt-5 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center space-x-1 rounded-lg border border-slate-200 px-3 py-1.5 font-sans text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{t("tour.back")}</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleSkip}
                className="font-sans text-xs font-semibold text-slate-400 hover:text-slate-600 px-2.5 py-1.5"
              >
                {t("tour.skip")}
              </button>

              <button
                onClick={handleNext}
                className="flex items-center space-x-1 rounded-lg bg-primary px-4 py-2 font-sans text-xs font-bold text-white shadow-md hover:bg-action-hover active:scale-95 transition-all"
              >
                <span>{currentStep === steps.length - 1 ? t("tour.finish") : t("tour.next")}</span>
                {currentStep === steps.length - 1 ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <ArrowRight className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
