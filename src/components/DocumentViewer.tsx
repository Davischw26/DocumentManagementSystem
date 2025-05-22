import React from "react";

interface DocumentViewerProps {
  fileData: {
    type: string;
    url: string;
    originalName: string;
  };
  fileContent: string;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  fileData,
  fileContent,
}) => {
  return (
    <div className="bg-[var(--background)] border border-[var(--foreground)]/10 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground">
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
        <pre className="bg-[var(--foreground)]/5 p-4 rounded overflow-auto max-h-[calc(100vh-200px)] whitespace-pre-wrap text-foreground">
          {fileContent}
        </pre>
      )}
    </div>
  );
};
