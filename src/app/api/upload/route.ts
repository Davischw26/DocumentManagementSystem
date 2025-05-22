import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { schemas } from "@/data/schemas";
import { list } from "@vercel/blob";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const schemaName = formData.get("schema") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!schemaName || !schemas[schemaName]) {
      return NextResponse.json({ error: "Invalid schema" }, { status: 400 });
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
      url: null as string | null,
      schema: schemaName,
      document: null as any,
    };

    // Upload the file
    const { url } = await put(fileName, file, {
      access: "public",
    });

    // Update the URL in metadata
    metadata.url = url;

    // Convert file to base64 for document
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    // Analyze the image using the selected schema
    const analyzeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/document`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: dataUrl,
          schema: schemas[schemaName],
        }),
      }
    );

    if (analyzeResponse.ok) {
      const documentResult = await analyzeResponse.json();
      metadata.document = documentResult;
    }

    // Create and upload the metadata JSON file
    const metadataBlob = new Blob([JSON.stringify(metadata, null, 2)], {
      type: "application/json",
    });
    await put(`data/${uniqueId}.json`, metadataBlob, {
      access: "public",
    });

    return NextResponse.json(
      { url, metadata },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "No file ID provided" },
        { status: 400 }
      );
    }

    // List all files to find the file and metadata
    const { blobs } = await list({ prefix: "files/" });
    const fileBlob = blobs.find((blob) =>
      blob.pathname.startsWith(`files/${id}`)
    );

    if (!fileBlob) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Delete the file
    await del(fileBlob.url);

    // Delete the metadata file
    const metadataUrl = `data/${id}.json`;
    await del(metadataUrl);

    return NextResponse.json(
      { success: true },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ error: "Error deleting file" }, { status: 500 });
  }
}
