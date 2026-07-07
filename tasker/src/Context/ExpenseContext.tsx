// // 
// import React, { createContext, useContext, useState,useEffect} from "react";
// import type { ReactNode } from "react";
// // 1️⃣ Define the Expense type
// export interface Expense {
//   id: string;
//   title: string;
//   amount: number;
//   category: string;
//   date: string;
// }

// // 2️⃣ Define the context type
// interface ExpenseContextType {
//   expenses: Expense[];
//   addExpense: (expense: Expense) => void;
//   deleteExpense: (id: string) => void;
//   updateExpense: ( id:string,expense: Expense) => void;
// }

// // 3️⃣ Create the context
// const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

// // 4️⃣ Provider component
// export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   // const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [expenses, setExpenses] = useState<Expense[]>(() => {    // initila local storage backup data, or previous added expenses, stored in local from the previous useeffect load to localstorage.
//   const storedExpenses = localStorage.getItem("expenses");
//   return storedExpenses ? JSON.parse(storedExpenses) : [];
// });

//   // Every time expenses change, update localStorage
//   useEffect(() => {
//     localStorage.setItem("expenses", JSON.stringify(expenses));
//   }, [expenses]);

//   const addExpense = (expense: Expense) => {
//     setExpenses(prev => [...prev, expense]); // ✅ Always create a new array
//   };

//   const deleteExpense = (id: string) => {
//     setExpenses(prev => prev.filter(exp => exp.id !== id));
//   };
//   const updateExpense = (updatedExpense: Expense) => {
//   setExpenses(prev =>
//     prev.map(expense =>
//       expense.id === updatedExpense.id ? updatedExpense : expense
//     )
//   );
// };


//   return (
//     <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense , updateExpense }}>
//       {children}
//     </ExpenseContext.Provider>
//   );
// };

// // 5️⃣ Custom hook for easy access
// export const useExpenses = (): ExpenseContextType => {
//   const context = useContext(ExpenseContext);
//   if (!context) {
//     throw new Error("useExpenses must be used within an ExpenseProvider");
//   }
//   return context;
// };
// src/Context/ExpenseContext.tsx
import React, { createContext, useContext, useEffect, useState} from "react";
import type { Expense } from "../Expenseforms"; // ✅ Import Expense type
import type { ReactNode } from "react";
// Define the context type

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, updatedExpense: Expense) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    // ✅ Load from localStorage on first render
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Save to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // ➕ Add expense
  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  // ❌ Delete expense
  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  // ✏️ Update expense
  const updateExpense = (id: string, updatedExpense: Expense) => {
    setExpenses((prev) =>
      prev.map((expense) => (expense.id === id ? updatedExpense : expense))
    );
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, updateExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = (): ExpenseContextType => {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error("useExpenses must be used inside ExpenseProvider");
  return context;
};
