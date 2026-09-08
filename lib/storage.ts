import { UserHistoryItem, LearningPath } from "@/types/atlas";
import { ErrorAnalysisResult } from "@/types/error";

const HISTORY_KEY = "atlas_history";
const LEARNING_KEY = "atlas_learning";
const THEME_KEY = "atlas_theme";
const SETTINGS_KEY = "atlas_settings";

export interface AtlasSettings {
  theme: "dark" | "light";
  defaultLanguage: string;
  defaultFramework: string;
}

const defaultSettings: AtlasSettings = {
  theme: "dark",
  defaultLanguage: "JavaScript",
  defaultFramework: "React",
};

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const storage = {
  getHistory(): UserHistoryItem[] {
    if (typeof window === "undefined") return [];
    return safeParse(localStorage.getItem(HISTORY_KEY), []);
  },

  saveToHistory(result: ErrorAnalysisResult): UserHistoryItem {
    const item: UserHistoryItem = {
      id: result.id,
      errorType: result.errorType,
      message: result.message,
      language: result.language,
      framework: result.framework,
      timestamp: result.timestamp,
      learnedConcept: result.learningConcept.title,
      fullResult: result,
    };
    const history = this.getHistory().filter((h) => h.id !== item.id);
    const next = [item, ...history].slice(0, 50);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    return item;
  },

  clearHistory(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(HISTORY_KEY);
  },

  getLearningPaths(): LearningPath[] {
    if (typeof window === "undefined") return [];
    return safeParse(localStorage.getItem(LEARNING_KEY), []);
  },

  saveLearningPaths(paths: LearningPath[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(LEARNING_KEY, JSON.stringify(paths));
  },

  getSettings(): AtlasSettings {
    if (typeof window === "undefined") return defaultSettings;
    return safeParse(localStorage.getItem(SETTINGS_KEY), defaultSettings);
  },

  saveSettings(settings: Partial<AtlasSettings>): void {
    if (typeof window === "undefined") return;
    const next = { ...this.getSettings(), ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  },

  getTheme(): "dark" | "light" {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem(THEME_KEY) as "dark" | "light") || "dark";
  },

  setTheme(theme: "dark" | "light"): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(THEME_KEY, theme);
  },
};
