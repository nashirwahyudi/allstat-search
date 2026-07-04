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
