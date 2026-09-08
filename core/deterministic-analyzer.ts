import { PRESET_ERRORS } from "@/data/preset-errors";
import { ErrorAnalysisResult, SupportedLanguage, SupportedFramework } from "@/types/error";
import { parseErrorInput } from "./parser";
import { generateId } from "@/lib/utils";

export function analyzeErrorDeterministically(
  rawInput: string,
  userLanguage?: SupportedLanguage,
  userFramework?: SupportedFramework
): ErrorAnalysisResult {
  const parsed = parseErrorInput(rawInput, userLanguage, userFramework);

  // Check preset matches
  const textLower = rawInput.toLowerCase();

  if (textLower.includes("reading 'map'") || (textLower.includes("typeerror") && textLower.includes("map"))) {
    const preset = PRESET_ERRORS.find((p) => p.id === "preset-typeerror-map")!;
    return {
      ...preset,
      id: generateId(),
      timestamp: Date.now(),
      language: userLanguage || preset.language,
      framework: userFramework || preset.framework,
      rawErrorText: rawInput,
    };
  }

  if (textLower.includes("hydration") || textLower.includes("text content does not match")) {
    const preset = PRESET_ERRORS.find((p) => p.id === "preset-hydration-error")!;
    return {
      ...preset,
      id: generateId(),
      timestamp: Date.now(),
      language: userLanguage || preset.language,
      framework: userFramework || preset.framework,
      rawErrorText: rawInput,
    };
  }

  // Fallback Dynamic Deterministic Result
  return {
    id: generateId(),
    timestamp: Date.now(),
    errorType: parsed.detectedType,
    title: parsed.detectedMessage.slice(0, 80),
    message: parsed.detectedMessage,
    language: parsed.detectedLanguage,
    framework: parsed.detectedFramework,
    rawErrorText: rawInput,
    codeContext: parsed.extractedCode ? { code: parsed.extractedCode } : undefined,
    anatomy: [
      {
        step: "ERROR",
        label: parsed.detectedType,
        detail: parsed.detectedMessage,
        color: "#FF5C5C",
      },
      {
        step: "TRIGGER",
        label: "Invocation",
        detail: "Runtime context triggered the error condition.",
        color: "#C8F56A",
      },
      {
        step: "BAD_ASSUMPTION",
        label: "Invalid Assumption",
        detail: "Code assumed variable or state condition was valid.",
        color: "#A99BFF",
      },
      {
        step: "ROOT_CAUSE",
        label: "Type / State mismatch",
        detail: "Nullish value, unhandled promise, or missing property.",
        color: "#FF5C5C",
      },
      {
        step: "FAILURE",
        label: "Process Interrupted",
        detail: "Execution stopped at the exception boundary.",
        color: "#4969FF",
      },
      {
        step: "FIX",
        label: "Validation & Guard",
        detail: "Add optional chaining, default value, or null check.",
        color: "#C8F56A",
      },
      {
        step: "PREVENTION",
        label: "Defensive Coding",
        detail: "Add unit tests, strict types, and boundary checks.",
        color: "#A99BFF",
      },
    ],
    whatHappened: `Atlas analyzed your ${parsed.detectedType}: "${parsed.detectedMessage}".`,
    whyItHappened:
      "This runtime or syntax error occurs when code executes an operation on an unexpected data type, missing reference, or invalid state constraint.",
    likelyCause: `${parsed.detectedType} in ${parsed.detectedFramework}`,
    fixes: [
      {
        title: "Defensive Guard Check",
        code: `if (!value) {\n  console.warn("Value is missing or undefined");\n  return;\n}`,
        explanation: "Guards against unexpected null or undefined states before invoking operations.",
        isRecommended: true,
      },
      {
        title: "Optional Chaining & Nullish Coalescing",
        code: `const result = data?.property ?? defaultValue;`,
        explanation: "Safely handles optional references without throwing unhandled exceptions.",
      },
    ],
    howToPrevent: [
      "Use strict type definitions to enforce property existence at compile time.",
      "Wrap async calls in try/catch blocks or error boundaries.",
    ],
    learningConcept: {
      title: `${parsed.detectedLanguage} Defensive Error Handling`,
      description: "Best practices for preventing runtime crashes with guards, validation, and strict types.",
      relatedTopics: ["Type Guards", "Error Boundaries", "Defensive Programming"],
    },
  };
}
