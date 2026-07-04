/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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

  const steps: TourStep[] = [
    {
      title: "Welcome to Allstat Search!",
      description: "Welcome to the official Sensus Ekonomi 2026 (SE2026) Portal. This portal aggregates official statistical files, provincial data streams, and economic monographs. Let us take a quick 1-minute tour to explore the primary tools available at your fingertips.",
      tab: "dashboard",
      icon: <Compass className="h-6 w-6 text-primary animate-spin-[spin_3s_linear_infinite]" />,
    },
    {
      title: "Core Statistical Metrics",
      description: "On the dashboard, you can view major national indicators at a glance. Find real-time values for Inflation Rates, Open Unemployment (TPT) Sakernas update, target Registered Businesses, and Labor Participation.",
      tab: "dashboard",
      highlightId: "core-metrics-section",
      icon: <Landmark className="h-6 w-6 text-primary" />,
    },
    {
      title: "Browse Dynamic Tables",
      description: "Need to slice and analyze data? Under this section, you can filter multiple datasets by province, sort any grid column instantly, and explore a fully interactive customized SVG trend line/bar visualizer with tooltip support.",
      tab: "tables",
      highlightId: "data-tables-section",
      icon: <Table className="h-6 w-6 text-primary" />,
    },
    {
      title: "Digital Publications Index",
      description: "Access high-quality digital monographs, regional yearbooks, and official survey catalogs. Search by title or description, look at responsive monograph tag chips, and download official booklets instantly.",
      tab: "publications",
      highlightId: "publications-index-section",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
    },
    {
      title: "Official Releases Feed",
      description: "Read Berita Resmi Statistik (BRS) directly from the office. This section features interactive press releases with responsive miniature indicators, summaries, and complete official transcripts.",
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
                  Step {currentStep + 1} of {steps.length}
                </span>
                <h4 className="font-sans text-xs font-extrabold text-primary uppercase tracking-wide flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>Onboarding Guide</span>
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
              Viewing: {activeStep.tab}
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
              <span>Back</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleSkip}
                className="font-sans text-xs font-semibold text-slate-400 hover:text-slate-600 px-2.5 py-1.5"
              >
                Skip
              </button>

              <button
                onClick={handleNext}
                className="flex items-center space-x-1 rounded-lg bg-primary px-4 py-2 font-sans text-xs font-bold text-white shadow-md hover:bg-action-hover active:scale-95 transition-all"
              >
                <span>{currentStep === steps.length - 1 ? "Finish" : "Next"}</span>
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
