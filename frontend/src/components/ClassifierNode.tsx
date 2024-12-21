import { memo, useState, useCallback } from "react";
import { Handle, Position, NodeProps, useReactFlow } from "reactflow";

/**
 * Custom Classifier Node
 * data.classes => CSV-String der Klassen.
 */
function ClassifierNode({ id, data, selected }: NodeProps) {
  const { setNodes } = useReactFlow();

  // Lokaler State, init mit data.classes
  const [inputValue, setInputValue] = useState(data.classes || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Wenn User das Inputfeld verlässt => Node-State updaten
  const handleBlur = useCallback(() => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              classes: inputValue,
            },
          };
        }
        return node;
      })
    );
  }, [id, inputValue, setNodes]);

  // Anzahl Klassen ermitteln
  const numClasses = inputValue
    ? inputValue
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean).length
    : 0;

  return (
    <div
      style={{
        padding: 10,
        border: selected ? "2px solid #000" : "1px solid #999",
        borderRadius: 6,
        minWidth: 140,
        textAlign: "left",
      }}
    >
      <div className="font-semibold mb-2">
        Classifier ({numClasses} classes)
      </div>
      <div>
        <label className="text-sm">Classes:</label>
        <input
          type="text"
          className="input input-bordered input-xs w-full mt-1"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </div>

      {/* Example handles (inputs/outputs) */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default memo(ClassifierNode);
