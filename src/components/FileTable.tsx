import Link from "next/link";

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
  onDelete?: (id: string) => void;
}

export default function FileTable({ files, onDelete }: FileTableProps) {
  // Sort files by uploadedAt date in descending order (newest first)
  const sortedFiles = [...files].sort(
    (a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/upload?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      if (onDelete) {
        onDelete(id);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Fehler beim Löschen der Datei. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full border border-[var(--foreground)]/10 rounded-lg">
        <thead>
          <tr className="bg-[var(--background)]">
            <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--foreground)]/70 uppercase tracking-wider border-b border-[var(--foreground)]/10">
              Titel
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--foreground)]/70 uppercase tracking-wider border-b border-[var(--foreground)]/10">
              Schema
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--foreground)]/70 uppercase tracking-wider border-b border-[var(--foreground)]/10">
              Hochgeladen am
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-[var(--foreground)]/70 uppercase tracking-wider border-b border-[var(--foreground)]/10">
              Aktionen
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedFiles.map((file) => (
            <tr
              key={file.id}
              className="hover:bg-[var(--foreground)]/5 transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--foreground)]/70">
                <Link href={`/document/${file.id}`} className="block">
                  {file.document?.titel || "-"}
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                <button
                  onClick={() => handleDelete(file.id)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-150"
                  title="Datei löschen"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
