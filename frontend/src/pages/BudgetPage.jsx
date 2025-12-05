"use client";
import { useNavigate } from "react-router-dom";
import BudgetChip from "../components/BudgetChip";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading.jsx"

const BudgetPage = () => {
  const navigate = useNavigate();

  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/budget/fetch", {
          withCredentials: true,
        });

        // API returns { budgets: [...] }
        setBudgets(response.data.budgets || []);
      } catch (error) {
        console.error("Error fetching budgets", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  const handleNewBudgetButton = () => {
    navigate("/add-budget");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white font-['Spline_Sans'] px-6 md:px-10 py-8">

      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <h1 className="text-3xl font-bold">Budgets</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-black font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
          onClick={handleNewBudgetButton}
        >
          <Plus className="w-4 h-4" />
          <span>New Budget</span>
        </button>
      </div>

      {/* Loading State */}
      {
        loading && <Loading />
      }

      {/* No Budgets Found */}
      {!loading && budgets.length === 0 && (
        <div className="mt-8 border-t border-gray-800 pt-10 text-gray-400 text-center">
          <p>No budgets found. Start by creating one!</p>
        </div>
      )}

      {/* Budgets Grid */}
      {!loading && budgets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {budgets.map((budget, index) => (
            <BudgetChip key={index} {...budget} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
