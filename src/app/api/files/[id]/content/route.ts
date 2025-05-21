import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // List all files in the files directory
    const { blobs } = await list({ prefix: "files/" });

    // Find the file with the requested ID
    const fileBlob = blobs.find((blob) =>
      blob.pathname.startsWith(`files/${id}`)
    );

    if (!fileBlob) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Fetch the file content
    const response = await fetch(fileBlob.url);
    const contentType = response.headers.get("content-type") || "text/plain";

    // Handle content based on type
    let content;
    if (contentType.startsWith("text/") || contentType === "application/json") {
      content = await response.text();
      return new NextResponse(content, {
        headers: {
          "Content-Type": contentType,
        },
      });
    } else {
      // For binary content (images, etc.)
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Content-Length": buffer.length.toString(),
        },
      });
    }
  } catch (error) {
    console.error("Error fetching file content:", error);
    return NextResponse.json(
      { error: "Error fetching file content" },
      { status: 500 }
    );
  }
}
