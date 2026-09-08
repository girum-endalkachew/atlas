import { SupportedLanguage, SupportedFramework } from "@/types/error";

export interface ParsedErrorInput {
  raw: string;
  detectedType: string;
  detectedMessage: string;
  detectedLanguage: SupportedLanguage;
  detectedFramework: SupportedFramework;
  extractedCode?: string;
}

export function parseErrorInput(
  rawInput: string,
  userLang?: SupportedLanguage,
  userFramework?: SupportedFramework
): ParsedErrorInput {
  const text = rawInput.trim();

  // Detect Error Types
  let detectedType = "Error";
  const typeMatch = text.match(/(TypeError|ReferenceError|SyntaxError|RangeError|HydrationError|CorsError|DatabaseError|RuntimeError|KeyError|AttributeError|ValueError|Uncaught Exception)/i);
  if (typeMatch) {
    detectedType = typeMatch[1];
  }

  // Extract first message line
  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  const detectedMessage = lines[0] || text.slice(0, 120);

  // Language Detection
  let detectedLanguage: SupportedLanguage = userLang && userLang !== "General" ? userLang : "JavaScript";
  if (text.includes("def ") || text.includes("import ") && text.includes("print(")) {
    detectedLanguage = "Python";
  } else if (text.includes("interface ") || text.includes("type ") || text.includes(": string")) {
    detectedLanguage = "TypeScript";
  } else if (text.includes("fmt.Println") || text.includes("func ")) {
    detectedLanguage = "Go";
  }

  // Framework Detection
  let detectedFramework: SupportedFramework = userFramework && userFramework !== "None" ? userFramework : "React";
  if (text.includes("next/") || text.includes("Hydration") || text.includes("App Router")) {
    detectedFramework = "Next.js";
  } else if (text.includes("useState") || text.includes("useEffect") || text.includes("JSX")) {
    detectedFramework = "React";
  } else if (text.includes("express") || text.includes("app.get(")) {
    detectedFramework = "Node.js";
  }

  // Extract code snippet if formatted in backticks or multiline code
  let extractedCode: string | undefined = undefined;
  const codeMatch = text.match(/```(?:js|ts|jsx|tsx|python|go)?\n([\s\S]*?)```/);
  if (codeMatch) {
    extractedCode = codeMatch[1].trim();
  }

  return {
    raw: text,
    detectedType,
    detectedMessage,
    detectedLanguage,
    detectedFramework,
    extractedCode,
  };
}
