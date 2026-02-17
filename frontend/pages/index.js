import { useEffect, useState } from "react";
import styles from "./index.module.css";

import AddProjectModal from "../components/AddProjectModal";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);

  const loadProjects = async () => {
    const res = await fetch("http://localhost:4000/projects");
    setProjects(await res.json());
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <button className={styles.addBtn} onClick={() => setOpen(true)}>
          + Add Project
        </button>
      </div>

      <AddProjectModal open={open} onClose={() => setOpen(false)} reload={loadProjects} />

      <div>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} reload={loadProjects} />
        ))}
      </div>
    </div>
  );
}

