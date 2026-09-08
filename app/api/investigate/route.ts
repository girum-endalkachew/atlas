import { NextRequest, NextResponse } from "next/server";
import { analyzeErrorDeterministically } from "@/core/deterministic-analyzer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { errorText, language, framework } = body;

    if (!errorText || typeof errorText !== "string") {
      return NextResponse.json(
        { error: "Error text is required" },
        { status: 400 }
      );
    }

    // Always fast, deterministic analysis (backed by Groq if API key is present later)
    const result = analyzeErrorDeterministically(
      errorText,
      language,
      framework
    );

    return NextResponse.json({ success: true, data: result });
  } catch (err: unknown) {
    console.error("Investigation error:", err);
    return NextResponse.json(
      { error: "Failed to analyze error" },
      { status: 500 }
    );
  }
}
