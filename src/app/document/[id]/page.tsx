"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface FileMetadata {
  id: string;
  originalName: string;
  type: string;
  size: number;
  uploadedAt: string;
  url: string;
  schema: string;
  document: any;
}

export default function DocumentPage() {
  const params = useParams();
  const [fileData, setFileData] = useState<FileMetadata | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await fetch(`/api/files/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch file data");
        const data = await response.json();
        setFileData(data);

        // Fetch file content
        const contentResponse = await fetch(`/api/files/${params.id}/content`);
        if (!contentResponse.ok)
          throw new Error("Failed to fetch file content");
        const content = await contentResponse.text();
        setFileContent(content);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchFileData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <p className="text-[var(--foreground)]/70">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (!fileData) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <p className="text-[var(--foreground)]/70">File not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
        {fileData.originalName}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Document Panel */}
        <div className="bg-[var(--background)] border border-[var(--foreground)]/10 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-[var(--foreground)]">
            Document
          </h2>
          <pre className="bg-[var(--foreground)]/5 p-4 rounded overflow-auto max-h-[calc(100vh-200px)] text-[var(--foreground)]/70">
            {JSON.stringify(fileData.document, null, 2)}
          </pre>
        </div>

        {/* File Content Panel */}
        <div className="bg-[var(--background)] border border-[var(--foreground)]/10 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-[var(--foreground)]">
            File Content
          </h2>
          {fileData.type.startsWith("image/") ? (
            <div className="flex justify-center">
              <img
                src={fileData.url}
                alt={fileData.originalName}
                className="max-w-full max-h-[calc(100vh-200px)] object-contain"
              />
            </div>
          ) : fileData.type === "application/pdf" ? (
            <iframe
              src={fileData.url}
              className="w-full h-[calc(100vh-200px)] bg-[var(--background)]"
              title={fileData.originalName}
            />
          ) : (
            <pre className="bg-[var(--foreground)]/5 p-4 rounded overflow-auto max-h-[calc(100vh-200px)] whitespace-pre-wrap text-[var(--foreground)]/70">
              {fileContent}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
