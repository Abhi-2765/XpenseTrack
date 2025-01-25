import React, { useState } from "react";
import { useForm } from "react-hook-form";

const PopUp = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [type, setType] = useState("Expense");
  const [submittedData, setSubmittedData] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const onSubmit = (data) => {
    const amount = parseFloat(data.amount);
    setSubmittedData((prevData) => [...prevData, { ...data, type }]);

    if (type === "Expense") {
      setExpense(expense + amount);
    } else {
      setIncome(income + amount);
    }

    reset();
  };

  const handleDelete = (index) => {
    const entryToDelete = submittedData[index];
    const amount = parseFloat(entryToDelete.amount);

    // Update income or expense total
    if (entryToDelete.type === "Expense") {
      setExpense((prevExpense) => prevExpense - amount);
    } else {
      setIncome((prevIncome) => prevIncome - amount);
    }

    // Remove the entry from submittedData
    setSubmittedData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h2 className="text-xl font-bold text-blue-600">Add {type}</h2>
        <div className="text-sm text-gray-600">
          <p className="font-medium">Track your {type.toLowerCase()} here</p>
        </div>
      </div>

      {/* Form Section */}
      <form className="overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
        {/* Type Selection */}
        <div className="flex justify-around mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              type === "Income"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setType("Income")}
          >
            Income
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              type === "Expense"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setType("Expense")}
          >
            Expense
          </button>
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label className="block mb-2 font-bold">{type} Category:</label>
          <select
            defaultValue=""
            {...register("category", { required: "Category is required" })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select category
            </option>
            {type === "Income" ? (
              <>
                <option value="Salary">Salary</option>
                <option value="Allowance">Allowance</option>
                <option value="Receivables">Receivables</option>
              </>
            ) : (
              <>
                <option value="Groceries">Groceries</option>
                <option value="Food">Food</option>
                <option value="Stationary">Stationary</option>
                <option value="Movie">Movie</option>
                <option value="Lending">Lending</option>
              </>
            )}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block mb-2 font-bold">Amount:</label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter Amount"
            {...register("amount", { required: "Amount is required" })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message}</p>
          )}
        </div>

        {/* Note Input */}
        <div className="mb-4">
          <label className="block mb-2 font-bold">Note:</label>
          <input
            type="text"
            placeholder="Enter Note"
            {...register("note", {
              maxLength: {
                value: 15,
                message: "No more than 15 characters is allowed",
              },
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.note && (
            <p className="text-red-500 text-sm">{errors.note.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Add
          </button>
        </div>
      </form>

      {/* Display Summary */}
      <div className="p-4 bg-gray-100 mt-6 rounded-md">
        <h3 className="text-lg font-bold mb-3 text-blue-600">Summary</h3>
        <p className="text-green-600 font-medium">
          Income: <span className="font-bold">₹{income.toFixed(2)}</span>
        </p>
        <p className="text-red-600 font-medium">
          Expenses: <span className="font-bold">₹{expense.toFixed(2)}</span>
        </p>
      </div>

      {/* Display Submitted Data */}
      <div className="p-4 bg-gray-50 mt-4 rounded-md">
        <h3 className="text-lg font-bold mb-3">Accounts</h3>
        {submittedData.map((entry, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-2 border-l-4 ${
              entry.type === "Income" ? "border-green-500" : "border-red-500"
            } bg-white shadow-sm rounded mb-2`}
          >
            <p className="flex-1">
              {entry.category}
              {entry.note ? `: ${entry.note}` : ""}
            </p>
            <span className="font-bold text-gray-700">₹{parseFloat(entry.amount).toFixed(2)}</span>
            <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopUp;
