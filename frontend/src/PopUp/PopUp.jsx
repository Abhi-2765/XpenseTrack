import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserContext } from "../Context/UserProvider";
import axios from "axios";

const PopUp = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { userId, date } = useUserContext();

  const IncomeCategory = ["Salary", "Allowance", "Receivables"];
  const ExpenseCategory = ["Food", "Groceries", "Stationary", "Entertainment", "Social Life", "Lending"];

  const [type, setType] = useState("Expense");
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await axios.get(`http://localhost:3000/transactions?uid=${userId}&date=${date}`);
        setTransactions(response.data.transactions || []);
        let totalIncome = 0, totalExpense = 0;
        response.data.transactions.forEach((tx) => {
          tx.type === "Income" ? totalIncome += tx.amount : totalExpense += tx.amount;
        });
        setIncome(totalIncome);
        setExpense(totalExpense);
        
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }

    if (userId && date) fetchTransactions();
  }, [userId, date]);

  const onSubmit = async (data) => {
    const transaction = { ...data, type: type.toLowerCase(), amount: parseFloat(data.amount), note: data.note || "" };
    console.log(transaction);
    try {
      const response = await axios.post("http://localhost:3000/transactions", { uid: userId, date, transaction });
      if (response.status === 200) {
        setTransactions([...transactions, transaction]);
        if (type === "Expense") setExpense(expense + transaction.amount);
        else setIncome(income + transaction.amount);
        reset();
      }

    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  const handleDelete = async (index, id) => {
    try {
      await axios.delete(`http://localhost:3000/transactions?uid=${userId}&date=${date}&transactionId=${id}`);
      
      const entryToDelete = transactions[index];
      const amount = parseFloat(entryToDelete.amount);

      if (entryToDelete.type === "expense") setExpense(expense - amount);
      else setIncome(income - amount);

      setTransactions(transactions.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full p-6">
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h2 className="text-xl font-bold text-blue-600">Add {type}</h2>
        <div className="text-sm text-gray-600">
          <p className="font-medium">Track your {type.toLowerCase()} here</p>
        </div>
      </div>

      <form className="overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-around mb-4">
          <button type="button" 
            className={`px-4 py-2 rounded ${type === "Income" ? "bg-green-500 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setType("Income")}
          >
            Income
          </button>
          <button type="button" 
            className={`px-4 py-2 rounded ${type === "Expense" ? "bg-red-500 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setType("Expense")}
          >
            Expense
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">{type} Category:</label>
          <select defaultValue=""
            {...register("category", { required: "Category is required" })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select category</option>
            {(type === "Income" ? IncomeCategory : ExpenseCategory).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Amount:</label>
          <input type="number" step="0.01" placeholder="Enter Amount"
            {...register("amount", { required: "Amount is required" })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Note:</label>
          <input type="text" placeholder="Enter Note"
            {...register("note", { maxLength: { value: 15, message: "Max 15 characters allowed" }})}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.note && <p className="text-red-500 text-sm">{errors.note.message}</p>}
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
            Add
          </button>
        </div>
      </form>

      <div className="p-4 bg-gray-100 mt-6 rounded-md">
        <h3 className="text-lg font-bold mb-3 text-blue-600">Summary</h3>
        <p className="text-green-600 font-medium">Income: <span className="font-bold">₹{income.toFixed(2)}</span></p>
        <p className="text-red-600 font-medium">Expenses: <span className="font-bold">₹{expense.toFixed(2)}</span></p>
      </div>

      <div className="p-4 bg-gray-50 mt-4 rounded-md">
        <h3 className="text-lg font-bold mb-3">Accounts</h3>
        {transactions.map((entry, index) => (
          <div key={index} className={`flex justify-between items-center p-2 border-l-4 ${entry.type === "Income" ? "border-green-500" : "border-red-500"} bg-white shadow-sm rounded mb-2`}>
            <p className="flex-1">{entry.category}{entry.note ? `: ${entry.note}` : ""}</p>
            <span className="font-bold text-gray-700">₹{entry.amount.toFixed(2)}</span>
            <button onClick={() => handleDelete(index, entry._id)} className="text-red-500 hover:text-red-700">🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopUp;