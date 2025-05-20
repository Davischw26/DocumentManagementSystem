import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Generate unique ID and preserve file extension
    const fileExtension = file.name.split(".").pop();
    const uniqueId = uuidv4();
    const fileName = `files/${uniqueId}.${fileExtension}`;

    // Create metadata object
    const metadata = {
      id: uniqueId,
      originalName: file.name,
      type: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      url: null as string | null, // Will be updated after upload
    };

    // Upload the file
    const { url } = await put(fileName, file, {
      access: "public",
    });

    // Update the URL in metadata
    metadata.url = url;

    // Create and upload the metadata JSON file
    const metadataBlob = new Blob([JSON.stringify(metadata, null, 2)], {
      type: "application/json",
    });
    await put(`data/${uniqueId}.json`, metadataBlob, {
      access: "public",
    });

    return NextResponse.json({ url, metadata });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}
