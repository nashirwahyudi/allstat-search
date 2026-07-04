/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import Tour from "./features/tour/Tour";
import AppRoutes from "./routes/AppRoutes";

const INITIAL_LOAD_MS = 1200;

export default function App() {
  const [globalSearch, setGlobalSearch] = useState("");
  const [tourOpen, setTourOpen] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Block the UI behind a splash animation while the app boots.
  useEffect(() => {
    const timer = setTimeout(() => setAppReady(true), INITIAL_LOAD_MS);
    return () => clearTimeout(timer);
  }, []);

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

  if (!appReady) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-subtle text-ink-dark flex flex-col font-sans" id="app-root">

        {/* Navigation Header */}
        <Header
          onStartTour={() => setTourOpen(true)}
          setSearchQuery={setGlobalSearch}
        />

        <main className="flex-1">
          <AppRoutes
            globalSearch={globalSearch}
            setGlobalSearch={setGlobalSearch}
            onStartTour={() => setTourOpen(true)}
            searchInputRef={searchInputRef}
          />
        </main>

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
