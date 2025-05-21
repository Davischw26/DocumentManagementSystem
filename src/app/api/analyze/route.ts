import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { content, schema } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }
    if (!schema) {
      return NextResponse.json(
        { error: "Schema is required" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Du bist ein Dokumentenanalyseassistent. Analysiere den bereitgestellten Inhalt und extrahiere wichtige Informationen.",
        },
        {
          role: "user",
          content: content,
        },
      ],
      response_format: schema,
    });

    const result = JSON.parse(response.choices[0]?.message?.content || "{}");

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in analyze route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
