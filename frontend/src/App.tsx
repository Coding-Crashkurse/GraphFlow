import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./routes/HomePage";
import ProjectsListPage from "./routes/ProjectsListPage";
import ProjectDetailPage from "./routes/ProjectDetailPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-base-100">
        {/* Obere Navbar */}
        <Navbar />

        {/* Haupt-Inhalt je nach Route */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsListPage />} />
            <Route
              path="/projects/:projectId"
              element={<ProjectDetailPage />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
