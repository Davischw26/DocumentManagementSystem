"use client";

import Image from "next/image";
import FileDrop from "@/components/FileDrop";

export default function Home() {
  const handleFilesDrop = (files: File[]) => {
    console.log("Dropped files:", files);
    // Handle the dropped files here
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <FileDrop onFilesDrop={handleFilesDrop} />
      </main>
    </div>
  );
}
