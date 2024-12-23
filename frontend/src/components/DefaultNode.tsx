import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";

/**
 * Default Node
 * Ein einfacher Node mit Label und Handles links/rechts.
 */
function DefaultNode({ data, selected }: NodeProps) {
  return (
    <div
      className={`
        bg-gray-100 border rounded-lg p-4 text-center shadow-sm
        ${selected ? "border-blue-500 shadow-lg" : "border-gray-300"}
      `}
    >
      {/* Label des Nodes */}
      <div className="font-bold text-gray-800">
        {data.label || "Default Node"}
      </div>

      {/* Handles links/rechts */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 bg-blue-500 border-none rounded-full"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 bg-blue-500 border-none rounded-full"
      />
    </div>
  );
}

export default memo(DefaultNode);
