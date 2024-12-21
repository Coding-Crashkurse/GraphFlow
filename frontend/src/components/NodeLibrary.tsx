type NodeLibraryProps = {
  onAddNode: (nodeType: string) => void;
};

export default function NodeLibrary({ onAddNode }: NodeLibraryProps) {
  return (
    <div className="dropdown dropdown-right w-full relative z-50">
      <label tabIndex={0} className="btn btn-primary w-full">
        Add Node
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 bg-base-100 shadow rounded-box w-44 z-50"
      >
        <li>
          <button onClick={() => onAddNode("VectorDB")}>VectorDB</button>
        </li>
        <li>
          <button onClick={() => onAddNode("LLM")}>LLM</button>
        </li>
        <li>
          <button onClick={() => onAddNode("Rephraser")}>Rephraser</button>
        </li>
        <li>
          <button onClick={() => onAddNode("END")}>END</button>
        </li>
        <li>
          <button onClick={() => onAddNode("Classifier")}>Classifier</button>
        </li>
      </ul>
    </div>
  );
}
