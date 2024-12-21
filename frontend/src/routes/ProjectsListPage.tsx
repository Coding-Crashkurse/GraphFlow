import { useNavigate } from "react-router-dom";

export default function ProjectsListPage() {
  const navigate = useNavigate();

  const projects = [
    { id: "proj1", name: "Project Alpha" },
    { id: "proj2", name: "Project Beta" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="space-y-2">
        {projects.map((p) => (
          <button
            key={p.id}
            className="btn w-full justify-start"
            onClick={() => navigate(`/projects/${p.id}`)}
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
