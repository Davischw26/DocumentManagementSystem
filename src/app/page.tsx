"use client";

import Image from "next/image";
import FileDrop from "@/components/FileDrop";
import { useState } from "react";

export default function Home() {
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFilesDrop = async (files: File[]) => {
    try {
      setUploadStatus("Uploading files...");

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        console.log(`File uploaded successfully: ${data.url}`);
      }

      setUploadStatus("Files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadStatus("Error uploading files. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-center">
        <FileDrop onFilesDrop={handleFilesDrop} />
      </div>
      <main className="flex flex-col gap-[32px] items-center sm:items-start mt-8">
        {uploadStatus && (
          <div className="text-center w-full">
            <p className="text-gray-600">{uploadStatus}</p>
          </div>
        )}
      </main>
    </div>
  );
}
