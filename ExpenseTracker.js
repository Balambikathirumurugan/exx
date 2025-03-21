import React, { useState } from "react";
import "./ExpenseTracker.css"; // Import the CSS file

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([
    { name: "travel", amount: 50.0, category: "Transport", date: "2024-07-21" },
  ]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("All");

  const addExpense = () => {
    if (name && amount && category && date) {
      setExpenses([...expenses, { name, amount: parseFloat(amount), category, date }]);
      setName("");
      setAmount("");
      setCategory("Food");
      setDate("");
    } else {
      alert("Please fill all fields before adding an expense.");
    }
  };

  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

  const filteredExpenses =
    filter === "All" ? expenses : expenses.filter((expense) => expense.category === filter);

  return (
    <div className="expense-tracker">
      <h2>Expense Tracker</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Expense Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.name}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn" onClick={() => deleteExpense(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total: ${totalAmount.toFixed(2)}</h3>
      <div className="filter-container">
        <label>Filter by Category: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default ExpenseTracker;