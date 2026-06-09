"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import vocabTranslations from "@/data/vocab-translation-vi.json";
import grammarTranslations from "@/data/grammar-translation-vi.json";
import headerFooterTranslations from "@/data/header_footer-translation-vi.json";
import aboutTranslations from "@/data/about-translation-vi.json";
import vocabTranslationsB2 from "@/data/vocab-translation-vi-b2.json";
import grammarTranslationsB2 from "@/data/grammar-translation-vi-b2.json";

const customTranslations = {
  ...vocabTranslations,
  ...grammarTranslations,
  ...headerFooterTranslations,
  ...aboutTranslations,
  ...vocabTranslationsB2,
  ...grammarTranslationsB2,
};

type Language = "en" | "vi";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  translate: (text: string) => string;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [cache, setCache] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const queueRef = useRef<Set<string>>(new Set());
  const activeRequestsRef = useRef<Set<string>>(new Set());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize lang and cache from localStorage (client-side only, after mounting)
  useEffect(() => {
    setIsMounted(true);
    const savedLang = localStorage.getItem("english4u-lang") as Language;
    if (savedLang === "en" || savedLang === "vi") {
      setLangState(savedLang);
    }

    const savedCache = localStorage.getItem("english4u-translation-cache");
    if (savedCache) {
      try {
        setCache(JSON.parse(savedCache));
      } catch (e) {
        console.error("Failed to parse translation cache", e);
      }
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("english4u-lang", newLang);
  };

  // Helper to store translations to localStorage
  const updateCache = (newTranslations: Record<string, string>) => {
    setCache((prev) => {
      const updated = { ...prev, ...newTranslations };
      localStorage.setItem("english4u-translation-cache", JSON.stringify(updated));
      return updated;
    });
  };

  // Process the translation queue
  const processQueue = async () => {
    if (queueRef.current.size === 0) return;
    
    // Extract up to 15 items to avoid URL length issues
    const itemsToTranslate = Array.from(queueRef.current).slice(0, 15);
    
    // Remove from queue and mark as active
    itemsToTranslate.forEach((item) => {
      queueRef.current.delete(item);
      activeRequestsRef.current.add(item);
    });

    setIsTranslating(true);
    
    try {
      const delimiter = " ||| ";
      const combined = itemsToTranslate.join(delimiter);
      
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(combined)}`
      );
      
      if (!res.ok) throw new Error("Translation request failed");
      
      const json = await res.json();
      const translatedCombined = json[0].map((part: any) => part[0]).join("");
      
      // We handle case where Google Translate splits the delimiter differently (e.g. spaces)
      const translatedParts = translatedCombined.split(/\s*\|\|\|\s*/);
      
      const newTranslations: Record<string, string> = {};
      
      if (translatedParts.length === itemsToTranslate.length) {
        for (let i = 0; i < itemsToTranslate.length; i++) {
          newTranslations[itemsToTranslate[i]] = translatedParts[i].trim();
        }
      } else {
        // Fallback to individual calls if split lengths don't match
        console.warn("Length mismatch in batch translation. Falling back to individual translation.");
        await Promise.all(
          itemsToTranslate.map(async (item) => {
            try {
              const itemRes = await fetch(
                `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(item)}`
              );
              if (itemRes.ok) {
                const itemJson = await itemRes.json();
                newTranslations[item] = itemJson[0].map((part: any) => part[0]).join("").trim();
              }
            } catch (err) {
              console.error("Individual translation failed for:", item, err);
            }
          })
        );
      }
      
      updateCache(newTranslations);
    } catch (error) {
      console.error("Batch translation failed", error);
      // Put items back in queue if we failed, but clear active status
      itemsToTranslate.forEach((item) => {
        queueRef.current.add(item);
      });
    } finally {
      itemsToTranslate.forEach((item) => {
        activeRequestsRef.current.delete(item);
      });
      setIsTranslating(false);
      
      // Schedule next batch if queue is not empty
      if (queueRef.current.size > 0) {
        timerRef.current = setTimeout(processQueue, 300);
      }
    }
  };

  const translate = (text: string): string => {
    if (!text) return "";
    
    // During hydration or if locale is EN, return the original text
    if (!isMounted || lang === "en") return text;

    // 1. Check custom overrides first
    const customDict = customTranslations as Record<string, string>;
    if (customDict[text]) {
      return customDict[text];
    }

    // 2. Check if we have it in cache
    if (cache[text]) {
      return cache[text];
    }

    // Otherwise, enqueue it for translation
    if (!activeRequestsRef.current.has(text) && !queueRef.current.has(text)) {
      queueRef.current.add(text);
      
      // Debounce the queue processing
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(processQueue, 100);
    }

    return text; // Return original text while loading
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, translate, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
