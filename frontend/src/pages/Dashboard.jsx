import AddButton from "../components/dashboardComponents/AddButton";
import DashboardSummaryChips from "../components/dashboardComponents/DashboardSummaryChips";
import ExportButton from "../components/dashboardComponents/ExportButton";
import PieChart from "../components/dashboardComponents/PieChart";
import SpendingTrends from "../components/dashboardComponents/SpendingTrends";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen bg-[#111827] text-white font-['Spline_Sans']">
      <main className="flex-1 px-6 sm:px-10 py-8 max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-3">
            <ExportButton />
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <DashboardSummaryChips />

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 my-8">
          <div className="rounded-2xl bg-[#1f2937] p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Expense Breakdown</h2>
            <PieChart />
          </div>

          <div className="rounded-2xl bg-[#1f2937] p-6 shadow-lg xl:col-span-2">
            <h2 className="text-xl font-bold mb-4">Spending Trends</h2>
            <SpendingTrends />
          </div>
        </div>
      </main>

      {/* Floating Add Button */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
        <AddButton />
      </div>
    </div>
  );
};

export default Dashboard;
