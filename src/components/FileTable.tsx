import { formatFileSize } from "@/utils/format";

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

interface FileTableProps {
  files: FileMetadata[];
}

export default function FileTable({ files }: FileTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full border border-[var(--foreground)]/10 rounded-lg">
        <thead>
          <tr className="bg-[var(--background)]">
            <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--foreground)]/70 uppercase tracking-wider border-b border-[var(--foreground)]/10">
              File Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--foreground)]/70 uppercase tracking-wider border-b border-[var(--foreground)]/10">
              Type
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--foreground)]/70 uppercase tracking-wider border-b border-[var(--foreground)]/10">
              Size
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--foreground)]/70 uppercase tracking-wider border-b border-[var(--foreground)]/10">
              Schema
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--foreground)]/70 uppercase tracking-wider border-b border-[var(--foreground)]/10">
              Analysis
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--foreground)]/70 uppercase tracking-wider border-b border-[var(--foreground)]/10">
              Uploaded At
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--foreground)]/70 uppercase tracking-wider border-b border-[var(--foreground)]/10">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--foreground)]/10">
          {files.map((file) => (
            <tr
              key={file.id}
              className="hover:bg-[var(--foreground)]/5 transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--foreground)]">
                {file.originalName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--foreground)]/70">
                {file.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--foreground)]/70">
                {formatFileSize(file.size)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--foreground)]/70">
                {file.schema}
              </td>
              <td className="px-6 py-4 text-sm text-[var(--foreground)]/70">
                {file.analysis ? (
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(file.analysis, null, 2)}
                  </pre>
                ) : (
                  "No analysis available"
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--foreground)]/70">
                {new Date(file.uploadedAt).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-[var(--foreground)]/80 hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/10 rounded-md transition-colors duration-150"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
