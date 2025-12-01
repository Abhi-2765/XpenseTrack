import AddButton from "../components/AddButton";
import DashboardSummaryChips from "../components/DashboardSummaryChips";
import ExportButton from "../components/ExportButton";
import PieChart from "../components/PieChart";
import SpendingTrends from "../components/SpendingTrends";

/**
 * Dashboard
 * Main analytics view showing key summaries and visual trends.
 */
const Dashboard = () => {
  return (
    <div className="relative min-h-screen bg-[#111827] text-white font-['Spline_Sans']">
      <main className="flex-1 px-6 sm:px-10 py-8 max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <ExportButton />
        </div>

        {/* Summary Cards */}
        <DashboardSummaryChips
          info={{
            balance: 12345.67,
            income: 5678.9,
            expenses: 3456.78,
            savings: 2222.12,
          }}
        />

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
