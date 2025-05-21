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
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "Du bist ein Dokumentenanalyseassistent. Analysiere das bereitgestellte Bild und extrahiere wichtige Informationen gemäß dem vorgegebenen Schema.",
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: content },
            },
          ],
        },
      ],
      response_format: { type: "json_schema", json_schema: schema },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in analyze route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
