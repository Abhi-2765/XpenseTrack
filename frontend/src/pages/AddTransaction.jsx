import axios from "axios";
import { useForm } from "react-hook-form";
import { DollarSign, Calendar, Tag, FileText } from "lucide-react";


const categories = {
  expense: [
    { label: "🍔 Food", value: "food" },
    { label: "🚌 Transport", value: "transport" },
    { label: "🛍️ Shopping", value: "shopping" },
    { label: "💡 Utilities", value: "utilities" },
    { label: "🏠 Housing", value: "housing" },
    { label: "💊 Healthcare", value: "healthcare" },
    { label: "🎯 Entertainment", value: "entertainment" },
    { label: "📋 Other", value: "other" },
  ],
  income: [
    { label: "💼 Salary", value: "salary" },
    { label: "📈 Investments", value: "investments" },
    { label: "🧑‍💻 Freelance", value: "freelance" },
    { label: "🎁 Gifts", value: "gifts" },
    { label: "💰 Business", value: "business" },
    { label: "📋 Other", value: "other" },
  ],
};

const AddTransaction = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const transactionType = watch("type", "expense");

  const onSubmit = async (data) => {
    try {
      const userId = "68ba6ccf871220643b830137";
      const response = await axios.post("http://localhost:5000/transactions/add", 
        {
          userId: userId,
          amount: data.amount,
          type: data.type, 
          category: data.category,
          date: data.date,
          note: data.notes
        }
      )

      reset({
        type: "expense",
        date: new Date().toISOString().split("T")[0],
        amount: "",
        category: "",
        notes: "",
      });

      console.log(response); // delete later

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            Add Transaction
          </h1>
        </div>

        {/* Form Container */}
        <div className="backdrop-blur-xl bg-slate-800/60 rounded-3xl p-8 shadow-2xl border border-slate-700">
          <div className="space-y-6">
            {/* Amount Field */}
            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="block text-slate-200 font-medium text-sm uppercase tracking-wide"
              >
                Amount
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-blue-400 group-focus-within:text-blue-300 transition-colors" />
                </div>
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("amount", {
                    required: "Amount is required",
                    min: { value: 0.01, message: "Amount must be greater than 0" },
                  })}
                  className="w-full h-14 pl-12 pr-4 bg-slate-900/60 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 backdrop-blur-sm"
                />
              </div>
              {errors.amount && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <span>⚠️</span> {errors.amount.message}
                </p>
              )}
            </div>

            {/* Transaction Type Toggle */}
            <div className="space-y-2">
              <label className="block text-slate-200 font-medium text-sm uppercase tracking-wide">
                Transaction Type
              </label>
              <div className="relative bg-slate-900/60 rounded-xl p-1 border border-slate-700">
                <div className="flex relative">
                  <input
                    id="expense"
                    type="radio"
                    value="expense"
                    {...register("type", { required: true })}
                    className="sr-only"
                  />
                  <label
                    htmlFor="expense"
                    className={`flex-1 text-center py-3 px-6 rounded-lg cursor-pointer transition-all duration-300 font-medium ${
                      transactionType === "expense"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-[0.98]"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    📉 Expense
                  </label>

                  <input
                    id="income"
                    type="radio"
                    value="income"
                    {...register("type", { required: true })}
                    className="sr-only"
                  />
                  <label
                    htmlFor="income"
                    className={`flex-1 text-center py-3 px-6 rounded-lg cursor-pointer transition-all duration-300 font-medium ${
                      transactionType === "income"
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-[0.98]"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    📈 Income
                  </label>
                </div>
              </div>
            </div>

            {/* Date Field */}
            <div className="space-y-2">
              <label
                htmlFor="date"
                className="block text-slate-200 font-medium text-sm uppercase tracking-wide"
              >
                Date
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-blue-400 group-focus-within:text-blue-300 transition-colors" />
                </div>
                <input
                  id="date"
                  type="date"
                  {...register("date", { required: "Date is required" })}
                  className="w-full h-14 pl-12 pr-4 bg-slate-900/60 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 backdrop-blur-sm"
                />
              </div>
              {errors.date && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <span>⚠️</span> {errors.date.message}
                </p>
              )}
            </div>

            {/* Category Field */}
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-slate-200 font-medium text-sm uppercase tracking-wide"
              >
                Category
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-blue-400 group-focus-within:text-blue-300 transition-colors" />
                </div>
                <select
                  id="category"
                  {...register("category", { required: "Category is required" })}
                  className="w-full h-14 pl-12 pr-4 bg-slate-900/60 border border-slate-700 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 backdrop-blur-sm cursor-pointer"
                >
                  <option value="" className="bg-slate-800 text-slate-400">
                    Select a category
                  </option>
                  {categories[transactionType].map((cat) => (
                    <option
                      key={cat.value}
                      value={cat.value}
                      className="bg-slate-800 text-white"
                    >
                      {cat.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {errors.category && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <span>⚠️</span> {errors.category.message}
                </p>
              )}
            </div>

            {/* Notes Field */}
            <div className="space-y-2">
              <label
                htmlFor="notes"
                className="block text-slate-200 font-medium text-sm uppercase tracking-wide"
              >
                Notes <span className="text-slate-500 text-xs">(Optional)</span>
              </label>
              <div className="relative group">
                <div className="absolute top-4 left-4 pointer-events-none">
                  <FileText className="h-5 w-5 text-blue-400 group-focus-within:text-blue-300 transition-colors" />
                </div>
                <textarea
                  id="notes"
                  rows={4}
                  placeholder="Add any additional details about this transaction..."
                  {...register("notes")}
                  className="w-full pl-12 pr-4 pt-4 pb-4 bg-slate-900/60 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 backdrop-blur-sm resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Adding Transaction...
                    </div>
                  ) : (
                    "Add Transaction"
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
