"use client";

import Image from "next/image";
import FileDrop from "@/components/FileDrop";
import FileTable from "@/components/FileTable";
import SchemaPopup from "@/components/SchemaPopup";
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
  document: any;
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
      setUploadStatus("Schema für Datei auswählen...");
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

  const handleCloseSchemaPopup = () => {
    setShowSchemaPopup(false);
    setSelectedFile(null);
    setUploadStatus("");
  };

  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-center">
        <FileDrop onFilesDrop={handleFilesDrop} />
      </div>

      {showSchemaPopup && (
        <SchemaPopup
          onSchemaSelect={handleSchemaSelect}
          onClose={handleCloseSchemaPopup}
        />
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
