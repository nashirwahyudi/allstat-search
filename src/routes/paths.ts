/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SectionKey = "dashboard" | "publications" | "tables" | "news";

export const SECTION_PATHS: Record<SectionKey, string> = {
  dashboard: "/",
  tables: "/tables",
  publications: "/publications",
  news: "/news",
};

// Unified search results page, reached from the dashboard search bar. Not part of
// the primary nav, so it lives outside SectionKey/SECTION_PATHS.
export const SEARCH_PATH = "/search";
