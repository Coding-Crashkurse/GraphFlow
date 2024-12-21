import { useParams, Link } from "react-router-dom";
import { useCallback, useState } from "react";
import {
  addEdge,
  useEdgesState,
  useNodesState,
  Connection,
  Edge,
  Node,
} from "reactflow";

import NodeLibrary from "../components/NodeLibrary";
import CanvasEditor from "../components/CanvasEditor";

export default function ProjectDetailPage() {
  const { projectId } = useParams();

  // 1) Initially keine Nodes/Edges
  const initialNodes: Node[] = [];
  const initialEdges: Edge[] = [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Entrypoint-Status
  const [entrypointId, setEntrypointId] = useState<string | null>(null);

  // Neues Edge-Connect
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  // 2) Node hinzufügen
  const handleAddNode = (nodeType: string) => {
    const nodeId = Math.random().toString(36).substring(2, 9);

    let bgColor = "#9ca3af"; // neutrales Grau
    let nodeReactFlowType: string = "default"; // React Flow node type (default/custom)

    switch (nodeType) {
      case "VectorDB":
        bgColor = "#34d399"; // grün
        break;
      case "LLM":
        bgColor = "#3b82f6"; // blau
        break;
      case "Rephraser":
        bgColor = "#f59e0b"; // orange
        break;
      case "END":
        bgColor = "#ef4444"; // rot
        break;
      case "Classifier":
        // Wir verwenden einen **Custom Node** (siehe CanvasEditor)
        nodeReactFlowType = "classifier";
        bgColor = "#10b981"; // z. B. grün
        break;
      default:
        bgColor = "#6b7280";
    }

    const newNode: Node = {
      id: nodeId,
      position: { x: 300, y: 200 },
      // 3) WICHTIG: "type" gibt den Node-Typ für ReactFlow an
      type: nodeReactFlowType,
      data: {
        label: nodeType,
        // Für Classifier: definieren wir anfänglich "classes"
        classes: "",
      },
      style: {
        background: bgColor,
        color: "#fff",
      },
    };

    setNodes((prev) => [...prev, newNode]);
  };

  // 4) Entrypoint setzen
  const handleSetEntrypoint = (nodeId: string) => {
    setEntrypointId(nodeId);
    setNodes((prev) =>
      prev.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            style: {
              ...node.style,
              boxShadow: "0 0 0 3px #f87171 inset",
            },
          };
        } else {
          return {
            ...node,
            style: {
              ...node.style,
              boxShadow: "none",
            },
          };
        }
      })
    );
  };

  return (
    <div className="w-full h-full flex">
      {/* Linke Sidebar */}
      <div className="w-64 bg-base-200 p-4 space-y-4">
        <Link to="/projects" className="btn">
          ← Back to Projects
        </Link>

        <h2 className="text-xl font-bold">Project: {projectId}</h2>

        <NodeLibrary onAddNode={handleAddNode} />
      </div>

      {/* Canvas */}
      <div className="flex-1" style={{ height: "calc(100vh - 4rem)" }}>
        <CanvasEditor
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          setNodes={setNodes}
          setEdges={setEdges}
          onSetEntrypoint={handleSetEntrypoint}
        />
      </div>
    </div>
  );
}
