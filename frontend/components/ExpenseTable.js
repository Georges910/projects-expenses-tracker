import { useState } from "react";
import styles from "./ExpenseTable.module.css";

export default function ExpenseTable({ expenses, reload }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ description: "", amount: "", category: "" });

  const startEdit = (expense) => {
    setEditing(expense.id);
    setForm({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
    });
  };

  const saveEdit = async () => {
    await fetch(`http://localhost:4000/expenses/${editing}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setEditing(null);
    reload();
  };

  const remove = async (id) => {
    await fetch(`http://localhost:4000/expenses/${id}`, { method: "DELETE" });
    reload();
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((e) => (
          <tr key={e.id}>
            <td>
              {editing === e.id ? (
                <input
                  value={form.description}
                  onChange={(x) => setForm({ ...form, description: x.target.value })}
                />
              ) : (
                e.description
              )}
            </td>

            <td>
              {editing === e.id ? (
                <select
                  value={form.category}
                  onChange={(x) => setForm({ ...form, category: x.target.value })}
                >
                  <option value="material">Material</option>
                  <option value="labor">Labor</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                e.category
              )}
            </td>

            <td>
              {editing === e.id ? (
                <input
                  type="number"
                  value={form.amount}
                  onChange={(x) => setForm({ ...form, amount: x.target.value })}
                />
              ) : (
                e.amount
              )}
            </td>

            <td className={styles.actions}>
              {editing === e.id ? (
                <>
                  <button className={styles.saveBtn} onClick={saveEdit}>Save</button>
                  <button className={styles.cancelBtn} onClick={() => setEditing(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button className={styles.editBtn} onClick={() => startEdit(e)}>Edit</button>
                  <button className={styles.deleteBtn} onClick={() => remove(e.id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}