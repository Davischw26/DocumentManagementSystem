import { schemas } from "@/data/schemas";

interface SchemaPopupProps {
  onSchemaSelect: (schemaName: string) => void;
  onClose: () => void;
}

export default function SchemaPopup({
  onSchemaSelect,
  onClose,
}: SchemaPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--background)] p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Select Schema</h2>
        <div className="space-y-2">
          {Object.keys(schemas).map((schemaName) => (
            <button
              key={schemaName}
              onClick={() => onSchemaSelect(schemaName)}
              className="w-full text-left px-4 py-2 rounded hover:bg-[var(--foreground)]/10 transition-colors"
            >
              {schemaName}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 text-sm text-foreground hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
