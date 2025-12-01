"use client";
import { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PieCharts({ defaultPeriod = "monthly" }) {

    const data = [
        { label: "Food & Dining", value: 864.2, color: "#4f46e5" },
        { label: "Transportation", value: 518.52, color: "#a855f7" },
        { label: "Housing", value: 1210, color: "#22c55e" },
        { label: "Utilities", value: 345.68, color: "#eab308" },
        { label: "Entertainment", value: 518.52, color: "#f97316" },
    ];

    
    const [period, setPeriod] = useState(defaultPeriod);

    const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full max-w-md mx-auto bg-[#1f2937] text-white rounded-2xl p-6 flex flex-col items-center">
      {/* Period Buttons */}
      <div className="flex gap-2 mb-4 bg-gray-800 rounded-full p-1">
        {["monthly", "yearly"].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
              period === p
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="relative w-full flex justify-center items-center my-6">
        <PieChart
          width={260}
          height={260}
          series={[
            {
              innerRadius: 80,
              outerRadius: 120,
              paddingAngle: 2,
              data: data.map((item) => ({
                ...item,
                color: item.color,
              })),
            },
          ]}
          margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
          slotProps={{ legend: { hidden: true } }}
        />
        {/* Center Label */}
        <div className="absolute flex flex-col items-center justify-center">
          <p className="text-gray-400 text-sm">Total Spent</p>
          <p className="text-2xl font-bold text-white">
            ${(total / 1000).toFixed(1)}k
          </p>
        </div>
      </div>

      {/* Legend with Values */}
      <div className="mt-4 space-y-3 text-sm w-full">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b border-gray-700 pb-2"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-300">{item.label}</span>
            </div>
            <span className="text-white font-medium">
              ${item.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
