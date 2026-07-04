/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
  timestamp: string;
}

export interface Publication {
  id: string;
  title: string;
  year: number;
  category: "Economy" | "Environment" | "Population" | "Social";
  region: string;
  catalogId: string;
  downloadCount: number;
  viewCount: number;
  size: string;
  pages: number;
  summary: string;
  tags: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  summary: string;
  author: string;
  visualData?: { label: string; value: number }[];
}

export interface StatTable {
  id: string;
  title: string;
  year: string;
  source: string;
  regionLevel: string; // "National" | "Provincial"
  columns: string[];
  data: Record<string, any>[];
  description: string;
  chartType: "line" | "bar" | "area";
  xKey: string; // Key for horizontal axis, e.g., "region" or "year"
  yKeys: string[]; // Keys for plotting lines/bars, e.g., ["2024", "2025", "2026"] or ["value"]
  yLabel: string; // Unit representation, e.g., "Percent (%)" or "Trillion IDR"
}
