import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // List all files in the data directory
    const { blobs } = await list({ prefix: "data/" });

    // Fetch and parse each metadata file
    const files = await Promise.all(
      blobs.map(async (blob) => {
        const response = await fetch(blob.url);
        const metadata = await response.json();
        return metadata;
      })
    );

    return NextResponse.json(files, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Error fetching files" },
      { status: 500 }
    );
  }
}
