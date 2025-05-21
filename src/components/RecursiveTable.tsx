import React from "react";

interface RecursiveTableProps {
  data: any;
  level?: number;
}

export const RecursiveTable: React.FC<RecursiveTableProps> = ({
  data,
  level = 0,
}) => {
  if (data === null || data === undefined) {
    return <span className="text-[var(--foreground)]/50">null</span>;
  }

  if (typeof data !== "object") {
    return <span>{String(data)}</span>;
  }

  if (Array.isArray(data)) {
    return (
      <div className="pl-4 border-l border-[var(--foreground)]/10">
        {data.map((item, index) => (
          <div
            key={index}
            className="mb-2 p-2 border border-[var(--foreground)]/10 rounded"
          >
            <RecursiveTable data={item} level={level + 1} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <table className="min-w-full divide-y divide-[var(--foreground)]/10 border border-[var(--foreground)]/10 rounded">
      <tbody className="bg-[var(--background)] divide-y divide-[var(--foreground)]/10">
        {Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--foreground)]/90 border-r border-[var(--foreground)]/10">
              {key}
            </td>
            <td className="px-6 py-4 text-sm text-[var(--foreground)]/70">
              <RecursiveTable data={value} level={level + 1} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
