import Link from "next/link";
import { formatFileSize } from "@/utils/format";

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
              Dateiname
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--foreground)]/70 uppercase tracking-wider border-b border-[var(--foreground)]/10">
              Schema
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--foreground)]/70 uppercase tracking-wider border-b border-[var(--foreground)]/10">
              Hochgeladen am
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr
              key={file.id}
              className="hover:bg-[var(--foreground)]/5 transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--foreground)]">
                <Link href={`/document/${file.id}`} className="block">
                  {file.originalName}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--foreground)]/70">
                <Link href={`/document/${file.id}`} className="block">
                  {file.schema}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--foreground)]/70">
                {new Date(file.uploadedAt).toLocaleString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
