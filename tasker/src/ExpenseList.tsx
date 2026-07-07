// 
import React from "react";
import { useExpenses } from "../src/Context/ExpenseContext";
import "./ExpenseList.css"; // ✅ Import CSS
import type { Expense } from "./Expenseforms";
interface ExpenseListProps {
  onEdit: (expense: Expense) => void;
}
const ExpenseList: React.FC<ExpenseListProps> = ({onEdit}) => {
  const { expenses, deleteExpense} = useExpenses();
  // ✅ Calculate total
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="expense-list">
      <h3>Expense List</h3>
      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {expenses.map((expense: any) => (
            <li key={expense.id} className="expense-item">
              <div className="expense-info">
                <strong>{expense.title}</strong> — ₹{expense.amount}
                <br />
                <small>
                  {expense.category} | {expense.date}
                </small>
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteExpense(expense.id)}
              >
                Delete
              </button>
              <button onClick={() => onEdit(expense)}>Edit</button>

            </li>
          ))}
        </ul>
      )}
      
          {/* ✅ Total Summary Card */}
          <div className="expense-summary">
            <h4>Total Spent: ₹{total}</h4>
          </div>
    </div>
  );
};

export default ExpenseList;
