import React from 'react'
import { ExpenseForm } from './Expenseforms';
import { ExpenseProvider } from '../src/Context/ExpenseContext';
// import ExpenseList from './ExpenseList';
import { Catagoryfilter } from './Catagoryfilter';
 
import "./App.css";
const App = () => {
  return (
<div className="app-container">
      <ExpenseProvider>
          <div  className="compo" >
            <Catagoryfilter/>
              <ExpenseForm/>
        {/* <ExpenseList/> */}</div>
      
        </ExpenseProvider>
  </div>
  )
}
export  default App;

