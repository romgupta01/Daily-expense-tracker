// import React, { useState } from "react";
// import ExpenseList from "./ExpenseList";
// import { v4 as uuidv4 } from "uuid";
// import { useExpenses } from "./Context/ExpenseContext";
// import "./forms.css";

// export interface Expense {
//   id: string;
//   title: string;
//   amount: number;
//   date: string;
//   category: string;
// }

// export const ExpenseForm: React.FC = () => {
//   const { addExpense, updateExpense } = useExpenses();

//   const [title, setTitle] = useState<string>("");
//   const [amount, setAmount] = useState<number | "">("");
//   const [date, setDate] = useState<string>("");
//   const [category, setCategory] = useState<string>("");
//   const [editId, setEditId] = useState<string | null>(null);

//   // ✅ Called when you click "Edit" from ExpenseList
//   const startEdit = (expense: Expense) => {
//     setEditId(expense.id);
//     setTitle(expense.title);
//     setAmount(expense.amount);
//     setDate(expense.date);
//     setCategory(expense.category);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!title || !amount || !date || !category) {
//       alert("Please fill in all fields!");
//       return;
//     }

//     const expenseData: Expense = {
//       id: editId ?? uuidv4(),
//       title,
//       amount: Number(amount),
//       date,
//       category,
//     };

//     if (editId) {
//       updateExpense(editId, expenseData); // ✅ FIXED
//       setEditId(null);
//     } else {
//       addExpense(expenseData);
//     }

//     console.log("✅ Expense Saved:", expenseData);

//     // Reset form
//     setTitle("");
//     setAmount("");
//     setDate("");
//     setCategory("");
//   };

//   return (
//     <div>
//       <form className="expense-form" onSubmit={handleSubmit}>
//         <h2>{editId ? "Edit Expense" : "Add New Expense"}</h2>

//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />

//         <input
//           type="number"
//           placeholder="Amount"
//           value={amount}
//           onChange={(e) =>
//             setAmount(e.target.value === "" ? "" : Number(e.target.value))
//           }
//           required
//         />

//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         />

//         <button type="submit">
//           {editId ? "Update Expense" : "Add Expense"}
//         </button>
//       </form>

//       {/* ✅ Passing edit handler to ExpenseList */}
//       <ExpenseList onEdit={startEdit} />
//     </div>
//   );
// };
import React, { useState } from "react";
import ExpenseList from "./ExpenseList";
import { v4 as uuidv4 } from "uuid";
import { useExpenses } from "./Context/ExpenseContext";
import "./forms.css";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}

export const ExpenseForm: React.FC = () => {
  const { addExpense, updateExpense, expenses } = useExpenses();

  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);

  // ✅ New: toggle form visibility
  const [showForm, setShowForm] = useState<boolean>(false);

  // ✅ Called when you click "Edit" from ExpenseList
  const startEdit = (expense: Expense) => {
    setEditId(expense.id);
    setTitle(expense.title);
    setAmount(expense.amount);
    setDate(expense.date);
    setCategory(expense.category);
    setShowForm(true); // show form when editing
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !amount || !date || !category) {
      alert("Please fill in all fields!");
      return;
    }

    const expenseData: Expense = {
      id: editId ?? uuidv4(),
      title,
      amount: Number(amount),
      date,
      category,
    };

    if (editId) {
      updateExpense(editId, expenseData);
      setEditId(null);
    } else {
      addExpense(expenseData);
    }

    console.log("✅ Expense Saved:", expenseData);

    // Reset form
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
    setShowForm(false); // hide form after submit
  };

  return (
    <div>
      {/* Button to toggle Add Expense form */}
      <button
        className="toggle-form-button"
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? "Close Form" : editId ? "Edit Expense" : "Add New Expense"}
      </button>

      {/* Conditionally render the form */}
      {showForm && (
        <form className="expense-form" onSubmit={handleSubmit}>
          <h2>{editId ? "Edit Expense" : "Add New Expense"}</h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
            min="0"
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <button type="submit">
            {editId ? "Update Expense" : "Add Expense"}
          </button>
        </form>
      )}

      {/* ✅ Passing edit handler to ExpenseList */}
      <ExpenseList onEdit={startEdit} />
    </div>
  );
};
