"use client";
import { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

/**
 * SpendingTrends
 * Displays income vs expense trends (monthly or daily)
 * Uses MUI LineChart and adapts to all screen sizes
 */
export default function SpendingTrends() {
  const [period, setPeriod] = useState("monthly");

  // Sample data
  const monthlyData = {
    x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    income: [4000, 4200, 4600, 4800, 5000, 5300, 5500, 5600, 5800, 6000, 6200, 6400],
    expenses: [2000, 2500, 2400, 2800, 3000, 3100, 3200, 3300, 3400, 3600, 3700, 3900],
  };

  const dailyData = {
    x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    income: [200, 250, 300, 280, 320, 400, 350],
    expenses: [150, 180, 220, 210, 250, 300, 280],
  };

  const current = period === "monthly" ? monthlyData : dailyData;

  return (
    <div className="flex flex-col w-full h-full text-white">
      {/* Toggle Buttons */}
      <div className="flex justify-center sm:justify-end gap-2 mb-4 flex-wrap">
        {["monthly", "daily"].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all ${
              period === p ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300 hover:text-white"
            }`}
          >
            {p[0].toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full h-[250px] sm:h-[320px]">
        <LineChart
          xAxis={[
            {
              data: current.x,
              scaleType: "point",
              tickLabelStyle: { fill: "#d1d5db", fontSize: 12 },
            },
          ]}
          yAxis={[
            {
              tickLabelStyle: { fill: "#d1d5db", fontSize: 12 },
            },
          ]}
          series={[
            {
              data: current.income,
              label: "Income",
              color: "#22c55e",
              curve: "monotoneX",
              showMark: false,
            },
            {
              data: current.expenses,
              label: "Expenses",
              color: "#ef4444",
              curve: "monotoneX",
              showMark: false,
            },
          ]}
          grid={{ horizontal: true, vertical: true }}
          slotProps={{
            legend: {
              labelStyle: { fill: "#e5e7eb", fontSize: 12 },
              position: { vertical: "bottom", horizontal: "middle" },
            },
          }}
          sx={{
            "& .MuiLineElement-root": { strokeWidth: 2 },
            "& .MuiChartsLegend-root": { marginTop: 8 },
            "& .MuiChartsAxis-line": { stroke: "#374151" },
            "& .MuiChartsAxis-tick": { stroke: "#374151" },
          }}
        />
      </div>
    </div>
  );
}
