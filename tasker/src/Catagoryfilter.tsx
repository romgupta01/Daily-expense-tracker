// // import React from 'react'
// // import { useExpenses } from './Context/ExpenseContext'

// // export const Catagoryfilter = () => {
// // const {expenses}=useExpenses();
// // const [selectedCatagory, setSelectedCatagory] = React.useState<string>("All");

// // const filterBycatagory=expenses.filter(expense=>selectedCatagory? expense.category===selectedCatagory:true);


// //   return (
// //     <>
// //     <select value={selectedCatagory} onChange={(e)=>setSelectedCatagory(e.target.value)}>
// //         <option value="All">All</option>
// //         <option value="food">food</option>
// //         <option value="personal">Personal</option>
// //         <option value="Shopping">Shopping</option>
// //         <option value="Others">Others</option>
// //     </select>
// //     { filterBycatagory.map((expense)=>(
// //         <div key={expense.id}>
// //             <h3>{expense.title}</h3>
// //             <p>{expense.amount}</p>
// //             <p>{expense.date}</p>
// //             </div>
// //     ))
    
    
// //     }
// //     </>
// //   )
// // }
// import React from "react";
// import { useExpenses } from "./Context/ExpenseContext";
// import "./Catagoryfilter.css";
// import { useState } from "react";

// export const Catagoryfilter = () => {
//   const { expenses } = useExpenses();
//   const [selectedCatagory, setSelectedCatagory] = React.useState<string>("All");

//   const filterBycatagory = expenses.filter((expense) =>
//     selectedCatagory === "All"
//       ? true
//       : expense.category === selectedCatagory
//   );

//   return (
//     <div className="category-filter-wrapper">
//       <select
//         value={selectedCatagory}
//         onChange={(e) => setSelectedCatagory(e.target.value)}
//         className="category-filter-select"
//       >
//         <option value="All">All</option>
//         <option value="food">Food</option>
//         <option value="personal">Personal</option>
//         <option value="Shopping">Shopping</option>
//         <option value="Others">Others</option>
//       </select>

//       {filterBycatagory.map((expense) => (
//         <div className="filtered-expense-item" key={expense.id}>
//           <h3>{expense.title}</h3>
//           <p>₹{expense.amount}</p>
//           <p>{expense.date}</p>
//         </div>
//       ))}
//     </div>
//   );
// };
//menu base updated dropdown
import React, { useState } from "react";
import { useExpenses } from "./Context/ExpenseContext";
import "./Catagoryfilter.css";

export const Catagoryfilter = () => {
  const { expenses } = useExpenses();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Food", "Personal", "Shopping", "Others"];

  const filteredExpenses = expenses.filter(exp =>
    selectedCategory === "All" ? true : exp.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div className="category-filter-wrapper">
      {/* ✅ Category menu buttons */}
      <div className="category-menu">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-button ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ✅ Filtered expenses */}
      <div className="expense-list">
        {filteredExpenses.map(exp => (
          <div className="filtered-expense-item" key={exp.id}>
            <h3>{exp.title}</h3>
            <p>₹{exp.amount}</p>
            <p>{exp.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

