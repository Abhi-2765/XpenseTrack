"use client";
import { useNavigate } from "react-router-dom";
import BudgetChip from "../components/BudgetChip";
import { Plus } from "lucide-react";

const budgets = [
  { type: "Groceries", allotedAmount: 1000, spentAmount: 550, emoji: "🛒" },
  { type: "Dining Out", allotedAmount: 1000, spentAmount: 880, emoji: "🍔" },
  { type: "Entertainment", allotedAmount: 1000, spentAmount: 700, emoji: "🎬" },
  { type: "Transportation", allotedAmount: 800, spentAmount: 600, emoji: "🚗" },
  { type: "Shopping", allotedAmount: 1000, spentAmount: 1150, emoji: "🛍️" },
  { type: "Utilities", allotedAmount: 1000, spentAmount: 500, emoji: "💡" },
  { type: "Healthcare", allotedAmount: 1000, spentAmount: 850, emoji: "💖" },
  { type: "Miscellaneous", allotedAmount: 1000, spentAmount: 900, emoji: "🎁" },
];

const BudgetPage = () => {

  const navigate = useNavigate();

  const handleNewBudgetButton = () => {
    navigate("/add-budget");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white font-['Spline_Sans'] px-6 md:px-10 py-8">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <h1 className="text-3xl font-bold">Budgets</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-black font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
          onClick={handleNewBudgetButton}>
          <Plus className="w-4 h-4" />
          <span>New Budget</span>
        </button>
      </div>

      {/* Budgets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {budgets.map((budget, index) => (
          <BudgetChip key={index} {...budget} />
        ))}
      </div>
    </div>
  );
};

export default BudgetPage;
