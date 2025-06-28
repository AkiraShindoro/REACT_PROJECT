import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import axios from "axios";
import LoginForm from "./components/LoginForm";

function App() {

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterTime, setFilterTime] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
  axios
    .get("http://localhost:5000/api/expenses")
    .then((res) => {
      setLoading(false);
      setExpenses(res.data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch expenses");
    });
}, []);

useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setExpenses(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [token]);

   if (!token) {
    return <LoginForm onLoginSuccess={(token) => setToken(token)} />;
  }


const handleDeleteExpense = (id) => {
  axios
    .delete(`http://localhost:5000/api/expenses/${id}`)
    .then(() => {
      setExpenses((prev) => prev.filter((exp) => exp._id !== id));
      toast.success("Expense deleted");
    })
    .catch((err) => {
      console.error("Delete error:", err);
      toast.error("Failed to delete expense");
    });
};



  function handleEditExpense(expense) {
    setEditingExpense(expense);
  }
  const filteredExpenses = expenses.filter(
    (expense) => {
      const month = new Date(expense.date).getMonth();
      return (
          
        (filterCategory === "" || expense.category === filterCategory) &&
        (filterTime === "" || month === Number(filterTime))
      );
    }
  );
  
  function addExpenseHandler(expenseObj) {
  axios
    .post("http://localhost:5000/api/expenses", expenseObj)
    .then((res) => {
      setExpenses((prev) => [...prev, res.data]);
      toast.success("Expense added successfully!");
    })
    .catch((error) => {
      console.error("Add Error:", error);
      toast.error("Failed to add expense");
    });
}



function updateExpenseHandler(updatedExpense) {
  axios
    .put(`http://localhost:5000/api/expenses/${updatedExpense._id}`, updatedExpense)
    .then((res) => {
      setExpenses((prev) =>
        prev.map((exp) => (exp._id === updatedExpense._id ? res.data : exp))
      );
      toast.success("Expense updated");
      setEditingExpense(null); // 👈 important
    })
    .catch((err) => {
      console.error("Update error:", err);
      toast.error("Failed to update expense");
    });
}





  

  return (
    <>
    <ExpenseFilter onChangeFilter={setFilterCategory} onMonthChange={setFilterTime}/>
    <ExpenseForm 
     onAddExpense={addExpenseHandler} 
     editingExpense={editingExpense}
     onUpdateExpense={updateExpenseHandler}
     onCancelEdit={() => setEditingExpense(null)} // 👈 new
    />
    <ExpenseList expenses={filteredExpenses} 
    loading={loading}
    onDelete={(handleDeleteExpense)}
    onEdit={handleEditExpense}/>
    <ToastContainer position="bottom-right" autoClose={1500}/>
    </>
  )
}

export default App;
