import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  OnSelectionChangeParams,
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import { useState, useEffect, useCallback } from "react";
import ClassifierNode from "./ClassifierNode"; // Custom Node für "Classifier"

type CanvasEditorProps = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection) => void;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onSetEntrypoint: (nodeId: string) => void;
};

// 1) Mappe Node-Typen => Custom-Komponenten
const nodeTypes = {
  classifier: ClassifierNode,
};

export default function CanvasEditor({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  setNodes,
  setEdges,
  onSetEntrypoint,
}: CanvasEditorProps) {
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);
  const [selectedEdges, setSelectedEdges] = useState<Edge[]>([]);

  const onSelectionChange = useCallback((params: OnSelectionChangeParams) => {
    const { nodes: selNodes, edges: selEdges } = params;
    setSelectedNodes(selNodes);
    setSelectedEdges(selEdges);
  }, []);

  // Entf-Taste => löschen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        const selectedNodeIds = selectedNodes.map((n) => n.id);
        const selectedEdgeIds = selectedEdges.map((e) => e.id);

        setNodes((nds) => nds.filter((n) => !selectedNodeIds.includes(n.id)));
        setEdges((eds) => eds.filter((e) => !selectedEdgeIds.includes(e.id)));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNodes, selectedEdges, setNodes, setEdges]);

  return (
    <div className="relative w-full h-full">
      {/* Falls keine Nodes existieren => Hinweis */}
      {nodes.length === 0 && (
        <div className="absolute top-4 left-4 z-10 bg-base-200 p-2 rounded shadow">
          Bitte Nodes erstellen!
        </div>
      )}

      {/* Falls genau 1 Node selektiert => Entrypoint-Button */}
      {selectedNodes.length === 1 && (
        <div className="absolute top-4 right-4 z-10 bg-base-100 p-2 rounded shadow">
          <button
            className="btn btn-xs btn-accent"
            onClick={() => onSetEntrypoint(selectedNodes[0].id)}
          >
            Set as Entrypoint
          </button>
        </div>
      )}

      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        fitView
      >
        <Background variant="dots" gap={12} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
