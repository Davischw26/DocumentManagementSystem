import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    // List all files in the data directory
    const { blobs } = await list({ prefix: "data/" });

    // Find the metadata file for the requested ID
    const metadataBlob = blobs.find(
      (blob) => blob.pathname === `data/${id}.json`
    );

    if (!metadataBlob) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Fetch the metadata
    const response = await fetch(metadataBlob.url);
    const metadata = await response.json();

    return NextResponse.json(metadata, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json({ error: "Error fetching file" }, { status: 500 });
  }
}
