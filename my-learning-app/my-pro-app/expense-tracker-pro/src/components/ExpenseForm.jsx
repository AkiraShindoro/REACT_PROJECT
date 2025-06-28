import { useEffect, useState } from "react";

function ExpenseForm(props) {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        if(props.editingExpense) {
            setTitle(props.editingExpense.title);
            setAmount(props.editingExpense.amount);
            setDate(props.editingExpense.date);
            setCategory(props.editingExpense.category);
        }
    },[props.editingExpense]);

    const handleSubmit = (e) => {
  e.preventDefault();

  const newExpense = {
    title,
    amount,
    date,
    category,
  };

  if (props.editingExpense && props.editingExpense._id) {
    props.onUpdateExpense({ ...newExpense, _id: props.editingExpense._id });
  } else {
    props.onAddExpense(newExpense);
  }

  // Clear form and reset editing mode
  setTitle("");
  setAmount(0);
  setDate("");
  setCategory("");
  
  // ✅ This is the missing link
  if (props.onCancelEdit) props.onCancelEdit();
};


    return (
        <div>
            <h2>This is the Expense Form!!!</h2>
            <p>Title:</p>
            <input type="text" 
            value={title}
            placeholder="Enter title..."
            onChange={(e) => setTitle(e.target.value)}/>
            <p>Amount:</p>
            <input type="number" 
            value={amount}
            placeholder="Enter the amount..."
            onChange={(e) => setAmount(parseFloat(e.target.value))}/>
            <p>Date:</p>
            <input type="date"
            value={date}
            placeholder="Enter the date..." 
            onChange={(e) => setDate(e.target.value)}/>
            <label>
                Category:
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">--Select category--</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Rent">Rent</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Health">Health</option>
                </select>
            </label>
            <button onClick={handleSubmit}>
                ADD!!
            </button>
        </div>
    );
}

export default ExpenseForm;