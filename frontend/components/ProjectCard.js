import { useState } from "react";
import styles from "./ProjectCard.module.css";

import ExpenseTable from "./ExpenseTable";
import AddExpenseForm from "./AddExpenseForm";

export default function ProjectCard({ project, reload }) {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);

  const loadDetails = async () => {
    const res = await fetch(`http://localhost:4000/projects/${project.id}`);
    setDetails(await res.json());
    reload();
  };

  const toggle = () => {
    setOpen(!open);
    if (!open) loadDetails();
  };

  const isOverBudget = Number(project.remaining_budget) < 0;

  return (
    <div className={styles.card}>
      <div className={styles.row} onClick={toggle}>

        {/* LEFT SIDE */}
        <div className={styles.left}>
          <div
            className={`${styles.arrow} ${open ? styles.rotate : ""}`}
          >
            ▾
          </div>

          <div>
            <div className={styles.title}>{project.name}</div>
            <div className={styles.client}>{project.client_name}</div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <div className={styles.stat}>
            <span className={styles.label}>Estimate</span>
            <span>${project.estimated_budget}</span>
          </div>

          <div className={styles.stat}>
            <span className={styles.label}>Expenses</span>
            <span>${project.total_expenses}</span>
          </div>

          <div className={styles.stat}>
            <span className={styles.label}>Remaining</span>
            <span className={isOverBudget ? styles.red : styles.green}>
              ${project.remaining_budget}
            </span>
          </div>
        </div>
      </div>

      {open && details && (
        <div className={styles.details}>
          <AddExpenseForm projectId={project.id} reload={loadDetails} />
          <ExpenseTable expenses={details.expenses} reload={loadDetails} />
        </div>
      )}
    </div>
  );
}
