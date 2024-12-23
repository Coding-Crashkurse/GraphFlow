import { memo, useState, useCallback } from "react";
import { Handle, Position, NodeProps, useReactFlow } from "reactflow";

/**
 * Custom Classifier Node
 * Ermöglicht das Hinzufügen, Speichern und Löschen von Kategorien.
 */
function ClassifierNode({ id, data, selected }: NodeProps) {
  const { setNodes } = useReactFlow();

  // Lokaler State für die Eingabe und die gespeicherten Kategorien
  const [inputValue, setInputValue] = useState("");
  const [categories, setCategories] = useState<string[]>(data.categories || []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddCategory = useCallback(() => {
    if (inputValue.trim() !== "") {
      const newCategories = [...categories, inputValue.trim()];
      setCategories(newCategories);
      setInputValue("");

      // Aktualisiere die Node-Daten im Flow
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                categories: newCategories,
              },
            };
          }
          return node;
        })
      );
    }
  }, [id, inputValue, categories, setNodes]);

  const handleDeleteCategory = useCallback(
    (index: number) => {
      const newCategories = categories.filter((_, i) => i !== index);
      setCategories(newCategories);

      // Aktualisiere die Node-Daten im Flow
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                categories: newCategories,
              },
            };
          }
          return node;
        })
      );
    },
    [id, categories, setNodes]
  );

  return (
    <div
      style={{
        padding: 10,
        border: selected ? "2px solid #000" : "1px solid #999",
        borderRadius: 6,
        minWidth: 160,
        textAlign: "left",
        position: "relative",
      }}
    >
      <div className="font-semibold mb-2">
        Classifier ({categories.length} categories)
      </div>
      <div>
        <label className="text-sm">Add Category:</label>
        <div className="flex items-center space-x-2 mt-1">
          <input
            type="text"
            className="input input-bordered input-xs w-full"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="btn btn-xs btn-primary"
            onClick={handleAddCategory}
          >
            Add
          </button>
        </div>
      </div>

      {/* Zeige gespeicherte Kategorien */}
      <ul className="mt-2 list-disc pl-4 text-sm">
        {categories.map((category, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{category}</span>
            <button
              className="btn btn-xs btn-error ml-2"
              onClick={() => handleDeleteCategory(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Handles links/rechts */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "#555",
          width: 16,
          height: 16,
          borderRadius: "50%",
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: "#555",
          width: 16,
          height: 16,
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

export default memo(ClassifierNode);
