import { NextRequest, NextResponse } from "next/server";
import { analyzeErrorDeterministically } from "@/core/deterministic-analyzer";
import type { SupportedFramework, SupportedLanguage } from "@/types/error";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { errorText, language, framework } = body ?? {};

    if (!errorText || typeof errorText !== "string" || !errorText.trim()) {
      return NextResponse.json({ error: "Error text is required" }, { status: 400 });
    }

    const result = analyzeErrorDeterministically(
      errorText,
      language as SupportedLanguage | undefined,
      framework as SupportedFramework | undefined
    );

    return NextResponse.json({ success: true, data: result });
  } catch (err: unknown) {
    console.error("Investigation error:", err);
    return NextResponse.json({ error: "Failed to analyze error" }, { status: 500 });
  }
}
