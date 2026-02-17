import { useState } from "react";
import styles from "./AddProjectModal.module.css";

export default function AddProjectModal({ open, onClose, reload }) {
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [budget, setBudget] = useState("");

  const save = async () => {
    await fetch("http://localhost:4000/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        client_name: client,
        estimated_budget: budget,
      }),
    });

    reload();
    onClose();
  };

  if (!open) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Add Project</h2>

        <input
          className={styles.input}
          placeholder="Project Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Client Name"
          onChange={(e) => setClient(e.target.value)}
        />

        <input
          className={styles.input}
          type="number"
          placeholder="Estimated Budget"
          onChange={(e) => setBudget(e.target.value)}
        />

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.saveBtn} onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}

