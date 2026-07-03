/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { StatTable } from "../types";
import { STAT_TABLES } from "../data";
import { FileSpreadsheet, Copy, Database, HelpCircle, Check, ArrowUpDown, RefreshCw, BarChart2, TrendingUp, Sparkles } from "lucide-react";

export default function TablesPanel() {
  const [activeTableId, setActiveTableId] = useState<string>(STAT_TABLES[0].id);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [sortByColumn, setSortByColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hoveredDataIndex, setHoveredDataIndex] = useState<number | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  // Retrieve active table
  const activeTable = useMemo(() => {
    return STAT_TABLES.find((t) => t.id === activeTableId) || STAT_TABLES[0];
  }, [activeTableId]);

  // Retrieve all available provinces from active table
  const allProvinces = useMemo(() => {
    return activeTable.data
      .map((row) => row.region)
      .filter((prov) => prov !== "National Average" && prov !== "National Benchmark" && prov !== "National Average (IHK)");
  }, [activeTable]);

  // Filter & Sort visible data
  const visibleData = useMemo(() => {
    let dataSlice = [...activeTable.data];

    // Province filter
    if (selectedProvinces.length > 0) {
      dataSlice = dataSlice.filter((row) => {
        // Always preserve national averages for benchmarks
        if (row.region.startsWith("National")) return true;
        return selectedProvinces.includes(row.region);
      });
    }

    // Sort logic
    if (sortByColumn) {
      dataSlice.sort((a, b) => {
        let valA = a[sortByColumn];
        let valB = b[sortByColumn];

        // Parse percentages and commas
        if (typeof valA === "string" && valA.endsWith("%")) {
          valA = parseFloat(valA.replace("%", ""));
          valB = parseFloat((valB as string).replace("%", ""));
        }

        if (typeof valA === "string") {
          return sortDirection === "asc"
            ? valA.localeCompare(valB as string)
            : (valB as string).localeCompare(valA);
        } else {
          return sortDirection === "asc"
            ? (valA as number) - (valB as number)
            : (valB as number) - (valA as number);
        }
      });
    }

    return dataSlice;
  }, [activeTable, selectedProvinces, sortByColumn, sortDirection]);

  // Handle headers click to trigger sorting
  const handleSort = (columnName: string) => {
    // Map human columns to precise data keys
    let dataKey: string | null = null;
    if (columnName.includes("Region") || columnName.includes("Provinsi")) {
      dataKey = "region";
    } else if (columnName.includes("2024")) {
      dataKey = activeTableId === "tbl-001" ? "rate24" : activeTableId === "tbl-003" ? "growth24" : null;
    } else if (columnName.includes("2025")) {
      dataKey = activeTableId === "tbl-001" ? "rate25" : activeTableId === "tbl-003" ? "growth25" : null;
    } else if (columnName.includes("Q1 2026") || columnName.includes("2026")) {
      dataKey = "rate26";
    } else if (columnName.includes("Kreatif")) {
      dataKey = "creative";
    } else if (columnName.includes("Culinary")) {
      dataKey = "retail";
    } else if (columnName.includes("Services")) {
      dataKey = "services";
    } else if (columnName.includes("Total Unit")) {
      dataKey = "total";
    }

    if (!dataKey) return;

    if (sortByColumn === dataKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortByColumn(dataKey);
      setSortDirection("asc");
    }
  };

  // Toggle dynamic province checks
  const handleToggleProvince = (prov: string) => {
    setSelectedProvinces((prev) =>
      prev.includes(prov) ? prev.filter((p) => p !== prov) : [...prev, prov]
    );
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Simulated Exports
  const handleCopyClipboard = () => {
    const csvContent = [
      activeTable.columns.join(","),
      ...visibleData.map((row) => {
        return activeTable.columns
          .map((col) => {
            if (col.includes("Region")) return `"${row.region}"`;
            if (col.includes("2024")) return row.rate24 || row.growth24 || row.creative || "";
            if (col.includes("2025")) return row.rate25 || row.growth25 || row.retail || "";
            if (col.includes("2026")) return row.rate26 || row.services || "";
            if (col.includes("Total")) return row.total || "";
            if (col.includes("Status")) return `"${row.status}"`;
            if (col.includes("Kontribusi")) return `"${row.contrib}"`;
            return "";
          })
          .join(",");
      }),
    ].join("\n");

    navigator.clipboard.writeText(csvContent);
    triggerToast("Table copied to clipboard in CSV format!");
  };

  const handleExportXLS = () => {
    triggerToast("Simulating Excel XLS file compile... Complete! Download started.");
  };

  const handleResetFilters = () => {
    setSelectedProvinces([]);
    setSortByColumn(null);
    setSortDirection("asc");
  };

  // DYNAMIC CUSTOM SVG CHARTING SYSTEM
  const svgChart = useMemo(() => {
    const chartData = visibleData.filter(row => !row.region.startsWith("National Average") && !row.region.startsWith("National Benchmark") && !row.region.startsWith("National Average (IHK)"));
    if (chartData.length === 0) return null;

    const width = 600;
    const height = 280;
    const padding = { left: 50, right: 30, top: 20, bottom: 40 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const yKeys = activeTable.yKeys;
    const xKey = activeTable.xKey;

    // Find min and max value for vertical scaling
    let maxVal = 0;
    let minVal = 0;
    chartData.forEach((row) => {
      yKeys.forEach((k) => {
        const val = Number(row[k]) || 0;
        if (val > maxVal) maxVal = val;
        if (val < minVal) minVal = val;
      });
    });

    // Pad max slightly
    maxVal = maxVal > 0 ? maxVal * 1.15 : 10;
    minVal = minVal < 0 ? minVal * 1.15 : 0;
    const valRange = maxVal - minVal;

    // Generate vertical guideline markers
    const yTicks = 4;
    const gridLines = Array.from({ length: yTicks + 1 }).map((_, i) => {
      const val = minVal + (valRange * i) / yTicks;
      const yPos = padding.top + chartH - (chartH * i) / yTicks;
      return { val, yPos };
    });

    // Node locations on horizontal plane
    const stepX = chartData.length > 1 ? chartW / (chartData.length - 1) : chartW;
    const nodes = chartData.map((row, i) => {
      const x = padding.left + i * stepX;
      const keyPoints = yKeys.map((k, keyIdx) => {
        const value = Number(row[k]) || 0;
        const y = padding.top + chartH - (chartH * (value - minVal)) / valRange;
        return { key: k, value, y };
      });
      return { region: row[xKey], x, keyPoints };
    });

    // Colors mapping representing Kinetic Horizon Theme
    const themeColors = ["#004B87", "#00A99D", "#006a62"];

    return {
      width,
      height,
      padding,
      gridLines,
      nodes,
      themeColors,
      chartData,
      yKeys,
    };
  }, [visibleData, activeTable]);

  return (
    <div className="grid gap-6 lg:grid-cols-4" id="data-tables-section">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 flex items-center space-x-2 rounded-lg bg-slate-900 px-4 py-2.5 font-sans text-xs font-semibold text-white shadow-lg animate-fade-in-down">
          <Check className="h-4 w-4 text-green-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Table and Filter Picker */}
      <div className="lg:col-span-1 space-y-5">
        
        {/* Table Selector Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="font-sans text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center space-x-1.5 mb-3">
            <Database className="h-4 w-4 text-primary" />
            <span>Select Dataset</span>
          </h3>
          <div className="space-y-1.5">
            {STAT_TABLES.map((table) => (
              <button
                key={table.id}
                onClick={() => { setActiveTableId(table.id); handleResetFilters(); }}
                className={`w-full rounded-lg px-3 py-2.5 text-left font-sans text-xs font-semibold transition-colors flex items-start space-x-2 ${
                  activeTableId === table.id
                    ? "bg-tertiary text-primary-dark border-l-3 border-primary"
                    : "text-slate-600 hover:bg-slate-50 border-l-3 border-transparent"
                }`}
              >
                <div className="mt-0.5 max-w-full">
                  <p className="line-clamp-2 leading-relaxed">{table.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Spatial/Province Checkboxes Filters */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
            <h3 className="font-sans text-xs font-bold text-slate-500 uppercase tracking-widest">
              Province Filter
            </h3>
            {selectedProvinces.length > 0 && (
              <button
                onClick={handleResetFilters}
                className="font-sans text-[10px] text-primary hover:underline font-bold"
              >
                Clear
              </button>
            )}
          </div>
          <p className="font-sans text-[11px] text-slate-400 mb-2 leading-tight">
            Check provinces to visualize and slice data:
          </p>
          <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
            {allProvinces.map((prov) => (
              <label
                key={prov}
                className="flex cursor-pointer items-center space-x-2 rounded px-2 py-1 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedProvinces.includes(prov)}
                  onChange={() => handleToggleProvince(prov)}
                  className="rounded border-slate-300 text-primary focus:ring-primary h-3.5 w-3.5"
                />
                <span className="font-sans text-xs">{prov}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table View & Charting Space */}
      <div className="lg:col-span-3 space-y-6">
        
        {/* Dynamic Custom Chart Block */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 mb-4 gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] uppercase font-bold text-primary flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>Real-time Interactive</span>
                </span>
                <span className="font-sans text-[11px] font-semibold text-slate-400 uppercase">
                  {activeTable.chartType} visualizer
                </span>
              </div>
              <h4 className="font-sans text-[13px] font-bold text-ink-dark mt-1 flex items-center space-x-1.5">
                {activeTable.chartType === "line" && <TrendingUp className="h-4 w-4 text-primary" />}
                {activeTable.chartType === "bar" && <BarChart2 className="h-4 w-4 text-primary" />}
                {activeTable.chartType === "area" && <TrendingUp className="h-4 w-4 text-primary animate-pulse" />}
                <span>Data Trend Representation</span>
              </h4>
            </div>

            {/* Custom chart legends */}
            <div className="flex items-center gap-3">
              {activeTable.yKeys.map((key, idx) => {
                const labelMap: Record<string, string> = {
                  rate24: "Year 2024",
                  rate25: "Year 2025",
                  rate26: "Q1 2026",
                  growth24: "PDRB 2024",
                  growth25: "PDRB 2025",
                  creative: "ICT Sector",
                  retail: "Culinary Sector",
                  services: "Services Sector",
                };
                const color = ["#004B87", "#00A99D", "#006a62"][idx % 3];
                return (
                  <div key={key} className="flex items-center space-x-1.5 text-xs">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                    <span className="font-sans font-semibold text-slate-500 text-[10px] sm:text-xs">
                      {labelMap[key] || key}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full flex justify-center">
            {svgChart ? (
              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${svgChart.width} ${svgChart.height}`}
                className="overflow-visible font-sans max-w-full"
              >
                {/* Embedded Tailwind and clean styling markers */}
                <defs>
                  {/* Linear gradients for area charts */}
                  {svgChart.yKeys.map((k, idx) => (
                    <linearGradient key={k} id={`grad-${k}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={svgChart.themeColors[idx % 3]} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={svgChart.themeColors[idx % 3]} stopOpacity="0.0" />
                    </linearGradient>
                  ))}
                </defs>

                {/* Draw guidelines & Y value markers */}
                {svgChart.gridLines.map((line, idx) => (
                  <g key={idx}>
                    <line
                      x1={svgChart.padding.left}
                      y1={line.yPos}
                      x2={svgChart.width - svgChart.padding.right}
                      y2={line.yPos}
                      stroke="#f1f4f9"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />
                    <text
                      x={svgChart.padding.left - 8}
                      y={line.yPos + 3}
                      textAnchor="end"
                      fill="#94a3b8"
                      className="font-mono text-[9px] font-semibold"
                    >
                      {line.val.toFixed(2)}{activeTableId === "tbl-002" ? "K" : "%"}
                    </text>
                  </g>
                ))}

                {/* AREA PLOTTING (underneath lines) */}
                {activeTable.chartType === "area" &&
                  svgChart.yKeys.map((key, keyIdx) => {
                    const color = svgChart.themeColors[keyIdx % 3];
                    const points = svgChart.nodes
                      .map((n) => `${n.x},${n.keyPoints[keyIdx].y}`)
                      .join(" ");

                    if (svgChart.nodes.length < 2) return null;

                    const firstNode = svgChart.nodes[0];
                    const lastNode = svgChart.nodes[svgChart.nodes.length - 1];
                    const zeroY = svgChart.padding.top + (svgChart.height - svgChart.padding.top - svgChart.padding.bottom);

                    const areaPoints = `${firstNode.x},${zeroY} ${points} ${lastNode.x},${zeroY}`;

                    return (
                      <polygon
                        key={key}
                        points={areaPoints}
                        fill={`url(#grad-${key})`}
                      />
                    );
                  })}

                {/* SVG BAR TOWERS PLOTTING */}
                {activeTable.chartType === "bar" && (
                  <g>
                    {svgChart.nodes.map((node, nodeIdx) => {
                      const totalKeys = svgChart.yKeys.length;
                      const groupWidth = 24;
                      const barWidth = groupWidth / totalKeys;

                      return (
                        <g key={nodeIdx}>
                          {node.keyPoints.map((kp, keyIdx) => {
                            const offset = (keyIdx - totalKeys / 2) * barWidth + barWidth / 2;
                            const xPos = node.x + offset;
                            const zeroY = svgChart.padding.top + (svgChart.height - svgChart.padding.top - svgChart.padding.bottom);
                            const barH = zeroY - kp.y;

                            return (
                              <rect
                                key={kp.key}
                                x={xPos - barWidth / 2}
                                y={kp.y}
                                width={barWidth - 1.5}
                                height={Math.max(barH, 1)}
                                fill={svgChart.themeColors[keyIdx % 3]}
                                rx={1}
                                className="transition-all duration-300 hover:opacity-85 cursor-pointer"
                                onMouseEnter={() => {
                                  setHoveredDataIndex(nodeIdx);
                                  setHoveredKey(kp.key);
                                }}
                                onMouseLeave={() => {
                                  setHoveredDataIndex(null);
                                  setHoveredKey(null);
                                }}
                              />
                            );
                          })}
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* SVG LINE STRANDS PLOTTING */}
                {(activeTable.chartType === "line" || activeTable.chartType === "area") &&
                  svgChart.yKeys.map((key, keyIdx) => {
                    const color = svgChart.themeColors[keyIdx % 3];
                    const points = svgChart.nodes
                      .map((n) => `${n.x},${n.keyPoints[keyIdx].y}`)
                      .join(" ");

                    return (
                      <polyline
                        key={key}
                        fill="none"
                        stroke={color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={points}
                      />
                    );
                  })}

                {/* DOT NODES AND TEXT AXIS LABELS */}
                {svgChart.nodes.map((node, nodeIdx) => (
                  <g key={nodeIdx}>
                    {/* Tick label under the axis */}
                    <text
                      x={node.x}
                      y={svgChart.height - svgChart.padding.bottom + 16}
                      textAnchor="middle"
                      fill="#475569"
                      transform={`rotate(-15, ${node.x}, ${svgChart.height - svgChart.padding.bottom + 16})`}
                      className="font-sans text-[9px] font-bold"
                    >
                      {node.region}
                    </text>

                    {/* Nodes hover highlights */}
                    {(activeTable.chartType === "line" || activeTable.chartType === "area") &&
                      node.keyPoints.map((kp, keyIdx) => (
                        <circle
                          key={kp.key}
                          cx={node.x}
                          cy={kp.y}
                          r={hoveredDataIndex === nodeIdx ? "5" : "3.5"}
                          fill={svgChart.themeColors[keyIdx % 3]}
                          stroke="white"
                          strokeWidth="1.5"
                          className="cursor-pointer transition-all duration-200"
                          onMouseEnter={() => {
                            setHoveredDataIndex(nodeIdx);
                            setHoveredKey(kp.key);
                          }}
                          onMouseLeave={() => {
                            setHoveredDataIndex(null);
                            setHoveredKey(null);
                          }}
                        />
                      ))}
                  </g>
                ))}

                {/* Y vertical baseline axis anchor */}
                <line
                  x1={svgChart.padding.left}
                  y1={svgChart.padding.top}
                  x2={svgChart.padding.left}
                  y2={svgChart.height - svgChart.padding.bottom}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />

                {/* X horizontal baseline axis anchor */}
                <line
                  x1={svgChart.padding.left}
                  y1={svgChart.height - svgChart.padding.bottom}
                  x2={svgChart.width - svgChart.padding.right}
                  y2={svgChart.height - svgChart.padding.bottom}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />

                {/* Dynamic tooltip box when hovering */}
                {hoveredDataIndex !== null && (
                  <g>
                    {(() => {
                      const node = svgChart.nodes[hoveredDataIndex];
                      const kpObj = hoveredKey 
                        ? node.keyPoints.find(k => k.key === hoveredKey) 
                        : node.keyPoints[0];
                      
                      if (!kpObj) return null;

                      const tx = node.x + 30 > svgChart.width - svgChart.padding.right ? node.x - 120 : node.x + 10;
                      const ty = kpObj.y - 45 < svgChart.padding.top ? kpObj.y + 15 : kpObj.y - 50;

                      return (
                        <g className="pointer-events-none">
                          <rect
                            x={tx}
                            y={ty}
                            width="110"
                            height="40"
                            rx="5"
                            fill="#1e293b"
                            opacity="0.95"
                          />
                          <text x={tx + 8} y={ty + 15} fill="white" className="font-sans text-[9px] font-bold">
                            {node.region}
                          </text>
                          <text x={tx + 8} y={ty + 30} fill="#f97316" className="font-mono text-[9px] font-bold">
                            Value: {kpObj.value.toFixed(2)}{activeTableId === "tbl-002" ? "K" : "%"}
                          </text>
                        </g>
                      );
                    })()}
                  </g>
                )}
              </svg>
            ) : (
              <div className="py-20 text-slate-400 text-xs">Loading chart metadata...</div>
            )}
          </div>
        </div>

        {/* Datagrid Table */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          
          {/* Header Action toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 py-4 bg-slate-50 border-b border-slate-100 gap-3">
            <div>
              <h3 className="font-sans text-sm font-bold text-ink-dark">
                {activeTable.title}
              </h3>
              <p className="font-sans text-xs text-slate-400 mt-0.5">
                Source: {activeTable.source} • Classification: {activeTable.regionLevel} Level
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyClipboard}
                className="flex items-center space-x-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-sans text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                title="Copy entire grid as CSV format"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Copy CSV</span>
              </button>

              <button
                onClick={handleExportXLS}
                className="flex items-center space-x-1 rounded-lg bg-tertiary px-3 py-1.5 font-sans text-xs font-semibold text-secondary-dark hover:bg-primary hover:text-white transition-colors"
                title="Download Excel spreadsheet"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span>Export XLS</span>
              </button>
            </div>
          </div>

          {/* zebra-striped table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 uppercase text-[9px] tracking-wider text-slate-500 font-bold select-none">
                  {activeTable.columns.map((col, idx) => (
                    <th
                      key={idx}
                      onClick={() => handleSort(col)}
                      className={`px-5 py-3 cursor-pointer hover:bg-slate-200 hover:text-slate-800 transition-colors ${
                        idx === 0 ? "text-left" : "text-right"
                      }`}
                    >
                      <div className={`flex items-center gap-1.5 ${idx === 0 ? "justify-start" : "justify-end"}`}>
                        <span>{col}</span>
                        <ArrowUpDown className="h-3 w-3 text-slate-400" />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleData.map((row, rowIdx) => {
                  const isNational = row.region.startsWith("National");
                  return (
                    <tr
                      key={rowIdx}
                      className={`transition-colors hover:bg-orange-50/50 ${
                        isNational
                          ? "bg-orange-50/70 font-semibold border-t border-b border-orange-200"
                          : rowIdx % 2 === 1
                          ? "bg-tertiary/15" /* Zebra Striping with sand-tint */
                          : "bg-white"
                      }`}
                    >
                      {/* Column 1: region */}
                      <td className="px-5 py-3 text-slate-800 font-medium">
                        {row.region}
                        {isNational && (
                          <span className="ml-1.5 rounded bg-orange-200 text-orange-800 px-1.5 py-0.5 text-[8px] font-bold">
                            BENCHMARK
                          </span>
                        )}
                      </td>

                      {/* Column 2 */}
                      <td className="px-5 py-3 text-right text-slate-600 font-mono">
                        {row.rate24 !== undefined ? `${row.rate24.toFixed(2)}%` : row.creative !== undefined ? `${row.creative.toLocaleString()}K` : row.growth24 !== undefined ? `${row.growth24.toFixed(2)}%` : "-"}
                      </td>

                      {/* Column 3 */}
                      <td className="px-5 py-3 text-right text-slate-600 font-mono">
                        {row.rate25 !== undefined ? `${row.rate25.toFixed(2)}%` : row.retail !== undefined ? `${row.retail.toLocaleString()}K` : row.growth25 !== undefined ? `${row.growth25.toFixed(2)}%` : "-"}
                      </td>

                      {/* Column 4 */}
                      <td className="px-5 py-3 text-right text-slate-600 font-mono">
                        {row.rate26 !== undefined ? `${row.rate26.toFixed(2)}%` : row.services !== undefined ? `${row.services.toLocaleString()}K` : row.contrib || "-"}
                      </td>

                      {/* Column 5 */}
                      <td className="px-5 py-3 text-right">
                        {row.status ? (
                          <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase ${
                            row.status.includes("Rendah") || row.status.includes("Target")
                              ? "bg-green-100 text-green-800"
                              : row.status.includes("Terkendali")
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {row.status}
                          </span>
                        ) : row.total ? (
                          <span className="font-mono text-slate-800 font-bold">
                            {row.total.toLocaleString()}K
                          </span>
                        ) : (
                          <span className="text-slate-400 font-semibold">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty fallback */}
          {visibleData.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              No regions match the filter guidelines. Check some provinces on the sidebar!
            </div>
          )}

          {/* Description Block */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-[11px] leading-relaxed text-slate-500">
            <span className="font-bold flex items-center gap-1 text-slate-600 mb-1">
              <HelpCircle className="h-3.5 w-3.5 text-primary" />
              <span>Metodologi Interpretasi:</span>
            </span>
            {activeTable.description}
          </div>
        </div>
      </div>
    </div>
  );
}
