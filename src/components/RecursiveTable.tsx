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
    return <span className="text-foreground">null</span>;
  }

  if (typeof data !== "object") {
    return <span>{String(data)}</span>;
  }

  if (Array.isArray(data)) {
    return (
      <div className="pl-2 border-l border-[var(--foreground)]/10">
        {data.map((item, index) => (
          <div
            key={index}
            className="mb-1 p-1 border border-[var(--foreground)]/10 rounded"
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
            <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-foreground border-r border-[var(--foreground)]/10">
              {key}
            </td>
            <td className="px-2 py-1 text-sm text-foreground">
              <RecursiveTable data={value} level={level + 1} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
