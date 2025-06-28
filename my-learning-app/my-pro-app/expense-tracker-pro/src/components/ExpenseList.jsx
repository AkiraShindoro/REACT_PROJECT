import Spinner from "./Spinner";

function ExpenseList({ expenses, loading, onDelete, onEdit}) {
 
    if (loading) return <Spinner />;
    return (
        <div>
            <ul>
                {  
                   expenses.length !== 0 ?
                   ( expenses.map((expense) => (
                        <li key={expense._id}>
                          <p>Title: {expense.title}</p>
                          <p>Amount: {expense.amount}</p>
                          <p>Date: {expense.date}</p>
                          <p>Category: {expense.category}</p>
                          <button onClick={()=> onDelete(expense._id)}>🗑️</button>
                          <button onClick={() => onEdit(expense)}>EDIT✏️</button>
                        </li>
                    ) )): (<p>No Expense yet!!!</p>)
                }
            </ul>
            
        </div>
    );
}

export default ExpenseList;