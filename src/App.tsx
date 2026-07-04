/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AIAssistant from "./features/ai-assistant/AIAssistant";
import Tour from "./features/tour/Tour";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const [globalSearch, setGlobalSearch] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Check if first-time user to automatically trigger tour
  useEffect(() => {
    const hasCompletedTour = localStorage.getItem("allstat_tour_complete");
    if (!hasCompletedTour) {
      const timer = setTimeout(() => {
        setTourOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-subtle text-ink-dark flex flex-col font-sans" id="app-root">

        {/* Navigation Header */}
        <Header
          onStartTour={() => setTourOpen(true)}
          setSearchQuery={(q) => { setGlobalSearch(q); setSearchTriggered(false); }}
        />

        <main className="flex-1">
          <AppRoutes
            globalSearch={globalSearch}
            searchTriggered={searchTriggered}
            setGlobalSearch={setGlobalSearch}
            setSearchTriggered={setSearchTriggered}
            onStartTour={() => setTourOpen(true)}
            searchInputRef={searchInputRef}
          />
        </main>

        {/* Global Slide-In AI Stats Assistant */}
        <AIAssistant isOpen={aiOpen} onClose={() => setAiOpen(false)} />

        {/* Interactive Guidance Onboarding System */}
        <Tour
          isOpen={tourOpen}
          onClose={() => {
            setTourOpen(false);
            // Smooth focus and scroll on search bar
            setTimeout(() => {
              if (searchInputRef.current) {
                searchInputRef.current.focus();
                searchInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }, 300);
          }}
        />

        {/* Portal Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
