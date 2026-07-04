/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RefObject } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import DashboardPage from "../features/dashboard/DashboardPage";
import PublicationsPage from "../features/publications/PublicationsPage";
import TablesPage from "../features/tables/TablesPage";
import NewsPage from "../features/news/NewsPage";
import SearchResultsPage from "../features/search/SearchResultsPage";

interface AppRoutesProps {
  globalSearch: string;
  setGlobalSearch: (value: string) => void;
  onStartTour: () => void;
  searchInputRef: RefObject<HTMLInputElement>;
}

export default function AppRoutes({
  globalSearch,
  setGlobalSearch,
  onStartTour,
  searchInputRef,
}: AppRoutesProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <DashboardPage
              globalSearch={globalSearch}
              setGlobalSearch={setGlobalSearch}
              onStartTour={onStartTour}
              searchInputRef={searchInputRef}
            />
          }
        />
        <Route path="/publications" element={<PublicationsPage initialSearchQuery={globalSearch} />} />
        <Route path="/tables" element={<TablesPage />} />
        <Route path="/news" element={<NewsPage initialSearchQuery={globalSearch} />} />
        <Route
          path="/search"
          element={
            <SearchResultsPage
              initialQuery={globalSearch}
              setGlobalSearch={setGlobalSearch}
              onStartTour={onStartTour}
            />
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
