"use client";

import Image from "next/image";
import FileDrop from "@/components/FileDrop";
import FileTable from "@/components/FileTable";
import { useState, useEffect } from "react";
import { schemas } from "@/data/schemas";

interface FileMetadata {
  id: string;
  originalName: string;
  type: string;
  size: number;
  uploadedAt: string;
  url: string;
  schema: string;
  analysis: any;
}

export default function Home() {
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [showSchemaPopup, setShowSchemaPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/files");
      if (!response.ok) throw new Error("Failed to fetch files");
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFilesDrop = async (files: File[]) => {
    try {
      setUploadStatus("Select schema for file...");
      setSelectedFile(files[0]); // For now, handle only the first file
      setShowSchemaPopup(true);
    } catch (error) {
      console.error("Error handling files:", error);
      setUploadStatus("Error handling files. Please try again.");
    }
  };

  const handleSchemaSelect = async (schemaName: string) => {
    if (!selectedFile) return;

    try {
      setUploadStatus("Uploading file...");
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("schema", schemaName);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log(`File uploaded successfully: ${data.url}`);
      setUploadStatus("File uploaded successfully!");
      setShowSchemaPopup(false);
      setSelectedFile(null);
      fetchFiles();
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file. Please try again.");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-center">
        <FileDrop onFilesDrop={handleFilesDrop} />
      </div>

      {showSchemaPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[var(--background)] p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Select Schema</h2>
            <div className="space-y-2">
              {Object.keys(schemas).map((schemaName) => (
                <button
                  key={schemaName}
                  onClick={() => handleSchemaSelect(schemaName)}
                  className="w-full text-left px-4 py-2 rounded hover:bg-[var(--foreground)]/10 transition-colors"
                >
                  {schemaName}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setShowSchemaPopup(false);
                setSelectedFile(null);
                setUploadStatus("");
              }}
              className="mt-4 px-4 py-2 text-sm text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <main className="flex flex-col gap-[32px] items-center sm:items-start mt-8">
        {uploadStatus && (
          <div className="text-center w-full">
            <p className="text-gray-600">{uploadStatus}</p>
          </div>
        )}

        <FileTable files={files} />
      </main>
    </div>
  );
}
