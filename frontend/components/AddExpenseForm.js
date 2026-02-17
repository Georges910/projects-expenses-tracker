import { useState } from "react";
import styles from "./AddExpenseForm.module.css";

export default function AddExpenseForm({ projectId, reload }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("material");

  const save = async () => {
    await fetch("http://localhost:4000/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_id: projectId,
        description,
        category,
        amount,
      }),
    });

    reload();
    setDescription("");
    setAmount("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Add Expense</div>

      <input
        className={styles.input}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className={styles.input}
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        className={styles.select}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="material">Material</option>
        <option value="labor">Labor</option>
        <option value="other">Other</option>
      </select>

      <button className={styles.addBtn} onClick={save}>Add Expense</button>
    </div>
  );
}