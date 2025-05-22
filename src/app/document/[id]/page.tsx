"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { RecursiveTable } from "@/components/RecursiveTable";
import { DocumentViewer } from "@/components/DocumentViewer";

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

  const handleDownloadMedia = () => {
    if (fileData?.url) {
      window.open(fileData.url, "_blank");
    }
  };

  const handleDownloadJson = () => {
    if (fileData?.document) {
      const jsonString = JSON.stringify(fileData.document, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileData.document?.titel || "document"}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

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
        <p className="text-foreground">Loading...</p>
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
        <p className="text-foreground">File not found</p>
      </div>
    );
  }

  return (
    <div className="h-screen p-2 sm:p-4 overflow-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-foreground truncate">
          {fileData.document?.titel || fileData.originalName}
        </h1>
        <div className="flex gap-2 sm:gap-4 mb-2">
          <button
            onClick={handleDownloadMedia}
            className="px-3 sm:px-4 py-1.5 bg-[var(--foreground)] text-[var(--background)] rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
          >
            Dokument Herunterladen
          </button>
          <button
            onClick={handleDownloadJson}
            className="px-3 sm:px-4 py-1.5 bg-[var(--foreground)] text-[var(--background)] rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
          >
            JSON Herunterladen
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
        <div className="bg-[var(--background)] border border-[var(--foreground)]/10 rounded-lg shadow p-2 sm:p-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-1 text-foreground">
            JSON Inhalt
          </h2>
          <div>
            <RecursiveTable data={fileData.document} />
          </div>
        </div>

        <div>
          <DocumentViewer fileData={fileData} fileContent={fileContent} />
        </div>
      </div>
    </div>
  );
}
