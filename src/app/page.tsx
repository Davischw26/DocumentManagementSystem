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
      setShowSchemaPopup(false);
      setUploadStatus("Datei wird hochgeladen...");
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
      console.log(`Datei erfolgreich hochgeladen: ${data.url}`);
      setUploadStatus("Datei erfolgreich hochgeladen!");
      setSelectedFile(null);
      fetchFiles();
      // Redirect to the document page using the ID from metadata
      window.location.href = `/document/${data.metadata.id}`;
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus(
        "Fehler beim Hochladen der Datei. Bitte versuchen Sie es erneut."
      );
    }
  };

  const handleCloseSchemaPopup = () => {
    setShowSchemaPopup(false);
    setSelectedFile(null);
    setUploadStatus("");
  };

  const handleDelete = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 py-8 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-center mb-8">
          <FileDrop onFilesDrop={handleFilesDrop} />
        </div>

        {showSchemaPopup && (
          <SchemaPopup
            onSchemaSelect={handleSchemaSelect}
            onClose={handleCloseSchemaPopup}
          />
        )}

        <main className="flex flex-col gap-4">
          {uploadStatus && (
            <div className="text-center w-full">
              <p className="text-gray-600">{uploadStatus}</p>
            </div>
          )}

          <div className="w-full">
            <FileTable files={files} onDelete={handleDelete} />
          </div>
        </main>
      </div>
    </div>
  );
}
