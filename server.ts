import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily to avoid crashing if key is not active on startup
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined in the environment. AI features will fallback to mock responses.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// BPS Stats & SE2026 Context to feed the Gemini API so it provides accurate answers
const STATS_CONTEXT = `
You are the Data Integrity AI Assistant, a professional statistics spokesman for the Indonesian Bureau of Statistics (Badan Pusat Statistik - BPS) and the upcoming Sensus Ekonomi 2026 (SE2026).
Your goal is to explain and clarify statistical indicators, economic indicators, and census concepts with an authoritative and helpful tone.

Here is the official simulated data from our system:

1. Inflation Rate (2025-2026, Year-on-Year):
   - National Average: 2.45% (Year 2025), 2.30% (Q1 2026)
   - DKI Jakarta: 2.10% (Year 2025), 1.95% (Q1 2026)
   - West Java: 2.65% (Year 2025), 2.40% (Q1 2026)
   - East Java: 2.35% (Year 2025), 2.25% (Q1 2026)
   - Central Java: 2.50% (Year 2025), 2.35% (Q1 2026)
   - Bali: 2.90% (Year 2025), 2.75% (Q1 2026)
   - North Sumatra: 2.80% (Year 2025), 2.60% (Q1 2026)
   - South Sulawesi: 2.40% (Year 2025), 2.20% (Q1 2026)

2. Gross Regional Domestic Product (GRDP) Growth Rates (2025, %):
   - National: 5.05%
   - DKI Jakarta: 4.85%
   - West Java: 5.12%
   - East Java: 4.98%
   - Central Java: 4.90%
   - Bali: 5.40% (driven by tourism recovery)
   - North Sumatra: 4.75%
   - South Sulawesi: 5.25%

3. Sensus Ekonomi 2026 (SE2026) facts:
   - It is the 10-yearly economic census of Indonesia.
   - Purpose: To register all economic entities (excluding agriculture) to create an accurate map of Micro, Small, Medium, and Large Enterprises (MSMEs and UMB).
   - Expected number of businesses registered: over 28 million.
   - Key focuses: Digital economy integration, gig economy, women-led enterprises, and green business practices.
   - Slogan: "Kinetic Horizon - Mapping Tomorrow's Economy Today".

4. Labor & Population Indicators (Q1 2026):
   - Labor Force Participation Rate (TPAK): 69.4%
   - Unemployment Rate (TPT): 5.02% (down from 5.20% in 2025)
   - Productive working population (15-64): 192.5 million.

Provide highly professional, concise, and structural answers. Use formatting like bullet points or small formatted markdown tables if you are displaying figures. Speak in Indonesian or English depending on how the user asks, but maintain the highest standard of a public statistics spokesman. Always attribute facts to the BPS (Badan Pusat Statistik) & SE2026 guidelines.
`;

// API Routes
app.post("/api/gemini/generate", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request. messages array is required." });
  }

  // Get last message content
  const lastMessage = messages[messages.length - 1];
  if (!lastMessage || !lastMessage.content) {
    return res.status(400).json({ error: "Empty prompt is not allowed." });
  }

  try {
    const ai = getGeminiClient();
    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not defined
      const mockResponses = [
        "Terima kasih atas pertanyaan Anda kepada Allstat Search. Sensus Ekonomi 2026 (SE2026) merupakan program prioritas nasional BPS untuk memetakan seluruh aktivitas usaha non-pertanian di Indonesia, guna memperkuat kebijakan ekonomi nasional.",
        "Berdasarkan Berita Resmi Statistik (BRS) Maret 2026 terbaru, tingkat inflasi nasional tetap terjaga stabil pada kisaran 2.30% secara tahunan (year-on-year), didukung oleh stabilitas harga bahan pangan pokok.",
        "Sensus Ekonomi SE2026 akan mencakup cakupan digital usaha, kemitraan teknologi, dan partisipasi usaha kreatif dalam rangka menyongsong Indonesia Emas 2045.",
        "Provinsi Bali mencatatkan pertumbuhan PDRB yang sangat progresif mencapai 5.40% seiring pemulihan penuh sektor pariwisata dan industri kreatif lokal."
      ];
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      return res.json({ text: `[FALLBACK MODE] ${randomResponse}` });
    }

    // Format chat history for Gemini API
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: STATS_CONTEXT,
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text || "I was not able to generate a response." });

  } catch (error: any) {
    console.error("Gemini API server error:", error);
    return res.status(500).json({ error: error.message || "An error occurred while connecting to Gemini API." });
  }
});

// Vite middleware for development or Static File serving for production
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Support single-page applications by routing unrecognized requests to index.html
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Allstat Search Server listening on http://localhost:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to start server and Vite middleware:", err);
});
