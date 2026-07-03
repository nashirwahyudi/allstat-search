/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Message } from "../types";
import { Bot, Send, X, ArrowDown, HelpCircle, Loader, Landmark, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content: "Selamat datang di **Data Integrity AI Assistant**! Saya adalah asisten virtual resmi untuk Sensus Ekonomi 2026 (SE2026) dan Pusat Data BPS (Badan Pusat Statistik).\n\nAda yang bisa saya bantu terkait data inflasi terbaru, laju pertumbuhan ekonomi daerah (PDRB), ketenagakerjaan, atau persiapan sensus nasional?",
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Suggested quick prompts mapping to our database context
  const SUGGESTIONS = [
    { text: "Jelaskan tentang Sensus Ekonomi 2026 (SE2026)", q: "Jelaskan tentang Sensus Ekonomi 2026 (SE2026) dan apa manfaatnya bagi pengembangan UMKM di daerah?" },
    { text: "Bagaimana tingkat inflasi Q1 2026?", q: "Bagaimana analisis tingkat inflasi Q1 2026 menurut provinsi berdasarkan data BPS?" },
    { text: "Pertumbuhan PDRB Provinsi terkini", q: "Bagian provinsi mana yang mencatatkan pertumbuhan PDRB (Produk Domestik Regional Bruto) tertinggi dan faktor menggerakkannya?" },
    { text: "Angka Pengangguran terbaru", q: "Berapa tingkat pengangguran terbuka (TPT) nasional triwulan pertama 2026?" }
  ];

  // Scroll to bottom upon new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    setErrorNotice(null);
    const userMsg: Message = {
      id: Math.random().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.ok) {
        throw new Error("HTTP error connecting to statistics broker backend.");
      }

      const data = await response.json();
      
      const botMsg: Message = {
        id: Math.random().toString(),
        role: "assistant",
        content: data.text || "Saya mengalami kegagalan memproses respon statistik.",
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);

      // If response was a mock fallback, show a brief notice
      if (data.text.includes("[FALLBACK MODE]")) {
        setErrorNotice("Running in static demo fallback mode because GEMINI_API_KEY is not defined in development settings.");
      }

    } catch (err: any) {
      console.error(err);
      const errorMsg: Message = {
        id: Math.random().toString(),
        role: "assistant",
        content: "Error: Maaf, koneksi ke asisten AI terganggu atau kunci API belum dikonfigurasi. \n\n*Namun, data Sensus Ekonomi SE2026 dapat Anda amati secara penuh pada Panel Browse Data dan Publikasi di navigasi menu.*",
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans" id="ai-assistant-drawer">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full pl-10 flex">
        {/* Sliding Panel Window */}
        <div className="w-screen max-w-md bg-white border-l border-slate-200 flex flex-col justify-between shadow-2xl relative">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-primary-dark text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="rounded-lg bg-white/10 p-1.5 ring-1 ring-white/20">
                <Bot className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-tight flex items-center space-x-1">
                  <span>Data Integrity AI</span>
                  <span className="text-[10px] bg-secondary-dark px-1.5 py-0.5 rounded text-white font-mono uppercase tracking-widest font-normal scale-90">Beta</span>
                </h2>
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping" />
                  <span>Interactive Statistics Advisor</span>
                </div>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="text-slate-300 hover:text-white rounded-lg p-1.5 hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Fallback Notice Bar */}
          {errorNotice && (
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-[10px] text-amber-700 font-sans flex items-center space-x-1.5 leading-tight">
              <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
              <span>{errorNotice}</span>
            </div>
          )}

          {/* Message List */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-slate-50">
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar Icons */}
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg shadow-inner flex-shrink-0 ${
                    isUser ? "bg-slate-200 text-slate-700" : "bg-tertiary text-primary"
                  }`}>
                    {isUser ? <UserIcon /> : <Bot className="h-4 w-4" />}
                  </div>

                  {/* Bubble */}
                  <div className={`flex flex-col max-w-[77%] space-y-1`}>
                    <div className={`rounded-xl px-3.5 py-2.5 text-xs font-sans leading-relaxed shadow-sm border ${
                      isUser
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-slate-800 border-slate-200/80"
                    }`}>
                      {/* Simple custom regex bold formatting */}
                      <span className="whitespace-pre-wrap">
                        {m.content.split("\n").map((line, lIdx) => {
                          const boldFormattedLine = line.split("**").map((part, pIdx) => {
                            if (pIdx % 2 === 1) {
                              return <strong key={pIdx} className="font-bold underline decoration-primary/40">{part}</strong>;
                            }
                            return part;
                          });
                          return <span key={lIdx} className="block mt-1 first:mt-0">{boldFormattedLine}</span>;
                        })}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-slate-400 self-end px-1">{m.timestamp}</span>
                  </div>
                </div>
              );
            })}

            {/* Pulsing loading dots */}
            {loading && (
              <div className="flex items-start gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-tertiary text-primary shadow-inner">
                  <Bot className="h-4 w-4 animate-bounce" />
                </div>
                <div className="rounded-xl px-4 py-3 bg-white border border-slate-200 flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            
            <div ref={bottomRef} />
          </div>

          {/* Interactions Control Footing */}
          <div className="bg-white border-t border-slate-150 p-4 space-y-3">
            {/* Direct suggestions chips (Scrollable list at top of input box) */}
            {messages.length < 4 && (
              <div className="space-y-1.5">
                <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1 leading-none">
                  <HelpCircle className="h-3 w-3" />
                  <span>Frequently Queried Questions</span>
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pb-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s.text}
                      onClick={() => handleSendMessage(s.q)}
                      className="rounded-full bg-tertiary/60 border border-slate-200/50 px-3 py-1 text-left font-sans text-[10px] font-medium text-primary-dark hover:bg-primary hover:text-white transition-colors"
                    >
                      {s.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Ask Integrity AI Advisor..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={loading}
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 font-sans text-xs outline-none focus:border-primary disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="rounded-lg bg-primary p-2 text-white hover:bg-action-hover disabled:bg-slate-300 disabled:text-slate-400 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
