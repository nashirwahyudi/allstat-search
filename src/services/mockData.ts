/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Publication, NewsItem, StatTable } from "../types";

export const PUBLICATIONS: Publication[] = [
  {
    id: "pub-001",
    title: "Provinsi di Indonesia Dalam Angka 2026 (Indonesia in Figures)",
    year: 2026,
    category: "Population",
    region: "National / Seluruh Provinsi",
    catalogId: "BPS-1101002.2026",
    downloadCount: 4231,
    viewCount: 12450,
    size: "18.4 MB",
    pages: 650,
    summary: "This comprehensive yearbook provides structured statistics on population dynamics, labor force participation, economic segments, social welfare, environment, and regional governance indicators across all 38 provinces of Indonesia.",
    tags: ["Yearbook", "Population", "National Statistics", "Regional Comparison"]
  },
  {
    id: "pub-002",
    title: "Persiapan dan Desain Operasional Sensus Ekonomi 2026 (SE2026)",
    year: 2026,
    category: "Economy",
    region: "National",
    catalogId: "BPS-3204001.2026",
    downloadCount: 1894,
    viewCount: 5410,
    size: "9.2 MB",
    pages: 188,
    summary: "Official guidance and methodology framework for the upcoming Sensus Ekonomi 2026. This publication outlines business classifications (KBLI), modern sampling techniques, mobile-first field agent applications, and data validation standards.",
    tags: ["SE2026", "Census Guidance", "Methodology", "MSME Mapping"]
  },
  {
    id: "pub-003",
    title: "Laporan Keadaan Ketenagakerjaan Indonesia dan Indikator Tenaga Kerja 2025",
    year: 2025,
    category: "Social",
    region: "National",
    catalogId: "BPS-5401201.2025",
    downloadCount: 3125,
    viewCount: 8900,
    size: "6.7 MB",
    pages: 245,
    summary: "Detailed analytical report derived from the National Labor Force Survey (SAKERNAS). Outlines trends in formal/informal employment, open unemployment rates (TPT), wage ratios, underemployment, and sector-by-sector absorption lists.",
    tags: ["Labor Force", "Sakernas", "Unemployment", "TPAK"]
  },
  {
    id: "pub-004",
    title: "Indeks Harga Konsumen, Pola Pengeluaran, dan Analisis Inflasi Triwulan I-2026",
    year: 2026,
    category: "Economy",
    region: "National",
    catalogId: "BPS-1202201.2026",
    downloadCount: 2210,
    viewCount: 6890,
    size: "4.5 MB",
    pages: 120,
    summary: "A concise review of consumer expenditure, basket weight changes, price level fluctuations, and regional food security indexes across 150 monitored cities in Indonesia during the first quarter of 2026.",
    tags: ["CPI", "Inflation", "Consumer Basket", "Quarterly Report"]
  },
  {
    id: "pub-005",
    title: "Laporan Ekonomi Digital Indonesia: Perkembangan dan Penyerapan Teknologi UMKM",
    year: 2025,
    category: "Economy",
    region: "National",
    catalogId: "BPS-3211041.2025",
    downloadCount: 3450,
    viewCount: 9780,
    size: "11.1 MB",
    pages: 312,
    summary: "This report measures technological infrastructure usage among micro, small, and medium enterprises (MSMEs). Highlights e-commerce adoption rates, digital payment channels, and geographical clusters of active creative businesses.",
    tags: ["Digital Economy", "MSME Tech", "E-Commerce Survey", "Innovation"]
  },
  {
    id: "pub-006",
    title: "Indikator Lingkungan Hidup dan Adaptasi Krisis Pangan Provinsi Bali 2025",
    year: 2025,
    category: "Environment",
    region: "Bali",
    catalogId: "BPS-8109041.2025",
    downloadCount: 912,
    viewCount: 3200,
    size: "5.8 MB",
    pages: 140,
    summary: "A localized regional compilation focusing on the impact of changing weather patterns on crop yields, water resources, tourism waste metrics, and rural community adaptation models in Bali province.",
    tags: ["Ecology", "Bali Statistics", "Agriculture", "Rural Adaptation"]
  }
];

export const NEWS_RELEASES: NewsItem[] = [
  {
    id: "news-001",
    title: "Rilis BRS: Inflasi Mei 2026 Terjaga Baik di Level 2.30% YoY, Didukung Stabilitas Harga Pangan",
    date: "2026-05-02",
    category: "Berita Resmi Statistik",
    content: "Survei Biaya Hidup (SBH) BPS menunjukkan tingkat inflasi gabungan kota-kota di Indonesia stabil di angka 0.18% secara bulanan (month-to-month). Secara tahunan (year-on-year), tingkat inflasi mencapai 2.30%. Kelompok pengeluaran makanan, minuman, dan tembakau memiliki sumbangan inflasi tertinggi namun terkontrol berkat kelancaran distribusi logistik antar-daerah dan program pangan murah yang diselenggarakan dinas terkait. Kota dengan inflasi tahunan tertinggi tercatat di Denpasar sebesar 2.75% sedangkan inflasi terendah berada di DKI Jakarta sebesar 1.95%.",
    summary: "Inflation remains under control at 2.30% YoY in May 2026. Consistent food supply and inter-region commerce logistics continue to support stable pricing levels across major consumer centers.",
    author: "Kepala BPS RI",
    visualData: [
      { label: "DKI Jakarta", value: 1.95 },
      { label: "East Java", value: 2.25 },
      { label: "National Avg", value: 2.30 },
      { label: "Central Java", value: 2.35 },
      { label: "West Java", value: 2.40 },
      { label: "Bali (Denpasar)", value: 2.75 }
    ]
  },
  {
    id: "news-002",
    title: "Kick-off Sosialisasi Sensus Ekonomi 2026: Memetakan Peluang Ekonomi Digital dan Green Business",
    date: "2026-04-18",
    category: "Pengumuman Sensus ekonomi",
    content: "BPS resmi memulai tahapan sosialisasi Sensus Ekonomi 2026 (SE2026) secara masif di tingkat kota/kabupaten. SE2026 direncanakan menyasar lebih dari 28 juta pelaku usaha non-pertanian di Indonesia, mencakup sektor UMKM dan korporasi besar. Berbeda dari sensus sebelumnya, SE2026 akan menerapkan modul tambahan untuk merekam transformasi ekonomi digital, implementasi zero-waste / eco-friendly business practices, serta komposisi pimpinan usaha perempuan untuk memperkaya indikator SDG (Sustainable Development Goals). Sensus lapangan resmi akan dimulai serentak pada pertengahan 2026.",
    summary: "The 2026 Economic Census officially starts its regional dissemination phase. The census will survey over 28 million business units, focusing heavily on gig workers, digital economy networks, and sustainability measures.",
    author: "Sekretariat Utama SE2026",
    visualData: [
      { label: "Trade/Culinary", value: 45 },
      { label: "Services/Gig", value: 22 },
      { label: "Creative/ICT", value: 15 },
      { label: "Mfg/Crafts", value: 12 },
      { label: "Others", value: 6 }
    ]
  },
  {
    id: "news-003",
    title: "Ketenagakerjaan Q1 2026: Tingkat Pengangguran Terbuka Turun Menjadi 5.02%, Penyerapan Pariwisata Melejit",
    date: "2026-03-24",
    category: "Laporan Sosial & Tenaga Kerja",
    content: "Hasil Survei Angkatan Kerja Nasional (Sakernas) Triwulan I-2026 mengonfirmasi tren perbaikan pasar tenaga kerja Indonesia. Tingkat Pengangguran Terbuka (TPT) turun menjadi 5.02%, atau menyusut sekitar 0.18% dibandingkan periode yang sama tahun lalu. Sektor Penyediaan Akomodasi dan Penyediaan Makan Minum (Pariwisata) menjadi sektor penyerap tenaga kerja terbesar dengan tambahan 1.2 juta tenaga kerja, disusul sektor Perdagangan dan Jasa Logistik. Tingkat Partisipasi Angkatan Kerja (TPAK) juga meningkat mencapai rekor tertinggi baru di level 69.4%.",
    summary: "Open unemployment rate contracts to 5.02% in Q1 2026. The tourism and hospitality sectors lead worker absorption, driving global labor force participation to historical highs in rural and tourist destinations.",
    author: "Direktorat Statistik Kependudukan",
    visualData: [
      { label: "Q1 2024", value: 5.45 },
      { label: "Q3 2024", value: 5.30 },
      { label: "Q1 2025", value: 5.20 },
      { label: "Q3 2025", value: 5.12 },
      { label: "Q1 2026", value: 5.02 }
    ]
  },
  {
    id: "news-004",
    title: "Ekonomi Indonesia Tumbuh Progresif 5.12% Berkat Pengolahan Mineral dan Manufaktur Industri",
    date: "2026-02-15",
    category: "Laporan Produk Domestik Bruto",
    content: "BPS melaporkan pertumbuhan Produk Domestik Bruto (PDB) triwulan IV-2025 mencatatkan laju sebesar 5.12% (y-on-y). Dorongan utama berasal dari akselerasi aktivitas hilirisasi nikel, tembaga, dan bauksit di wilayah Indonesia Timur, serta resiliensi konsumsi rumah tangga domestik yang didorong oleh stabilitas harga konsumen yang mapan. Secara spasial, pertumbuhan mencolok diraih oleh Provinsi West Java (5.12%), South Sulawesi (5.25%), dan Bali (5.40%). Konsumsi domestik diproyeksikan terus menguat menopang target 2026.",
    summary: "Indonesian GDP expands at 5.12% YoY, heavily powered by industrial mining downstream, domestic consumption resilient trends, and tourism robust growth rates.",
    author: "Direktorat Neraca Wilayah",
    visualData: [
      { label: "Domestic Cons", value: 54 },
      { label: "Export Resources", value: 22 },
      { label: "Gov Spending", value: 12 },
      { label: "Investment", value: 10 },
      { label: "Others", value: 2 }
    ]
  }
];

export const STAT_TABLES: StatTable[] = [
  {
    id: "tbl-001",
    title: "Profil Inflasi Gabungan Provinsi (Y-on-Y) dan Indeks Harga Konsumen (IHK) Monitored",
    year: "2024 - 2026",
    source: "Sub-Direktorat Statistik Harga Konsumen BPS",
    regionLevel: "Provincial",
    columns: ["Region / Provinsi", "Rate 2024 (%)", "Rate 2025 (%)", "Q1 2026 (%)", "Status Kerawanan"],
    data: [
      { region: "DKI Jakarta", rate24: 2.25, rate25: 2.10, rate26: 1.95, status: "Rendah (Aman)" },
      { region: "West Java", rate24: 2.85, rate25: 2.65, rate26: 2.40, status: "Terkendali" },
      { region: "East Java", rate24: 2.55, rate25: 2.35, rate26: 2.25, status: "Terkendali" },
      { region: "Central Java", rate24: 2.70, rate25: 2.50, rate26: 2.35, status: "Terkendali" },
      { region: "Bali", rate24: 3.10, rate25: 2.90, rate26: 2.75, status: "Waspada Musiman" },
      { region: "North Sumatra", rate24: 3.00, rate25: 2.80, rate26: 2.60, status: "Terkendali" },
      { region: "South Sulawesi", rate24: 2.60, rate25: 2.40, rate26: 2.20, status: "Rendah (Aman)" },
      { region: "National Average", rate24: 2.61, rate25: 2.45, rate26: 2.30, status: "Target Stabil" }
    ],
    description: "Tabel ini menunjukkan perkembangan tingkat inflasi tahunan (Year-on-Year) pada tingkat provinsi di Indonesia. Penilaian indikator mengacu pada stabilitas harga indeks kosumsi komoditas utama pangan, energi, dan sandang penunjang hidup warga.",
    chartType: "line",
    xKey: "region",
    yKeys: ["rate24", "rate25", "rate26"],
    yLabel: "Tingkat Inflasi (%)"
  },
  {
    id: "tbl-002",
    title: "Sensus Ekonomi preliminary: Volume Estimasi Unit Usaha Non-Pertanian menurut Wilayah Mandiri",
    year: "SE2026 Target",
    source: "Direktorat Sensus Ekonomi BPS RI",
    regionLevel: "Provincial",
    columns: ["Region / Provinsi", "Usaha Kreatif/ICT (K)", "Culinary & Retail (K)", "Services & Logistics (K)", "Total Unit (K)"],
    data: [
      { region: "DKI Jakarta", creative: 380, retail: 1200, services: 920, total: 2500 },
      { region: "West Java", creative: 420, retail: 1850, services: 1100, total: 3370 },
      { region: "East Java", creative: 350, retail: 1680, services: 980, total: 3010 },
      { region: "Central Java", creative: 280, retail: 1420, services: 820, total: 2520 },
      { region: "Bali", creative: 190, retail: 450, services: 380, total: 1020 },
      { region: "North Sumatra", creative: 120, retail: 750, services: 420, total: 1290 },
      { region: "South Sulawesi", creative: 140, retail: 580, services: 350, total: 1070 }
    ],
    description: "Estimasi pra-Sensus Ekonomi 2026 (SE2026) mengenai sebaran unit bisnis formal dan informal berskala mikro, kecil, menengah, dan besar di luar sektor pertanian. Satuan dalam ribuan unit usaha (K).",
    chartType: "bar",
    xKey: "region",
    yKeys: ["creative", "retail", "services"],
    yLabel: "Jumlah Usaha (Ribu Unit)"
  },
  {
    id: "tbl-003",
    title: "Laju Pertumbuhan Produk Domestik Regional Bruto (PDRB) atas Dasar Harga Konstan (%)",
    year: "2024 - 2025",
    source: "Direktorat Neraca Wilayah & Analisis Desk BPS",
    regionLevel: "Provincial",
    columns: ["Region / Provinsi", "Pertumbuhan 2024 (%)", "Pertumbuhan 2025 (%)", "Kontribusi terhadap PDB Nasional"],
    data: [
      { region: "DKI Jakarta", growth24: 4.80, growth25: 4.85, contrib: "16.8%" },
      { region: "West Java", growth24: 5.08, growth25: 5.12, contrib: "13.2%" },
      { region: "East Java", growth24: 4.95, growth25: 4.98, contrib: "14.5%" },
      { region: "Central Java", growth24: 4.85, growth25: 4.90, contrib: "8.4%" },
      { region: "Bali", growth24: 5.25, growth25: 5.40, contrib: "1.8%" },
      { region: "North Sumatra", growth24: 4.65, growth25: 4.75, contrib: "4.9%" },
      { region: "South Sulawesi", growth24: 5.15, growth25: 5.25, contrib: "3.2%" },
      { region: "National Benchmark", growth24: 5.01, growth25: 5.05, contrib: "100.0%" }
    ],
    description: "Tabel menyajikan laju perubahan pertumbuhan ekonomi daerah tahun baseline 2024 dibandingkan dengan kalkulasi penuh tahun 2025. PDRB atas dasar harga konstan menyaring pengaruh inflasi nominal.",
    chartType: "area",
    xKey: "region",
    yKeys: ["growth24", "growth25"],
    yLabel: "Pertumbuhan PDRB (%)"
  }
];
