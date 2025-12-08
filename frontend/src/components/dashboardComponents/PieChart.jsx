"use client";
import { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";

export default function PieCharts({ defaultPeriod = "monthly" }) {
  const [period, setPeriod] = useState(defaultPeriod);

  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  const COLORS = [
    "#4f46e5", "#a855f7", "#22c55e", "#eab308", "#f97316",
    "#ef4444", "#14b8a6", "#0ea5e9", "#8b5cf6", "#f59e0b",
    "#10b981", "#6366f1", "#ec4899", "#3b82f6", "#84cc16",
    "#f43f5e", "#2dd4bf", "#c084fc", "#fb923c", "#94a3b8"
  ];

  useEffect(() => {
    const fetchMonthly = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/report/fetchMonthlyCategoricalSpendings",
          { withCredentials: true }
        );

        setLabels(res.data.labels || []);
        setValues(res.data.data || []);
      } catch (error) {
        console.error("Error fetching monthly category spendings", error);
        setLabels([]);
        setValues([]);
      }
    };

    const fetchYearly = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/report/fetchYearlyCategoricalSpendings",
          { withCredentials: true }
        );

        setLabels(res.data.labels || []);
        setValues(res.data.data || []);
      } catch (error) {
        console.error("Error fetching yearly category spendings", error);
        setLabels([]);
        setValues([]);
      }
    };

    period === "monthly" ? fetchMonthly() : fetchYearly();
  }, [period]);

  const total = values.reduce((sum, v) => sum + v, 0);

  const pieData = labels.map((label, i) => ({
    label,
    value: values[i],
    color: COLORS[i % COLORS.length],
  }));

  return (
    <div className="w-full max-w-md mx-auto bg-[#1f2937] text-white rounded-2xl p-6 flex flex-col items-center">

      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-4 bg-gray-800 rounded-full p-1">
        {["monthly", "yearly"].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-1 text-sm font-medium rounded-full transition-all duration-200 ${period === p ? "bg-blue-500 text-white shadow-md" : "text-gray-400 hover:text-white"
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
              data: pieData,
            },
          ]}
          margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
          slotProps={{ legend: { hidden: true } }}
        />

        {/* Total in Center */}
        {(labels.length > 0) && <div className="absolute flex flex-col items-center justify-center">
          <p className="text-gray-400 text-sm">Total Spent</p>
          <p className="text-2xl font-bold text-white">
            ${total.toFixed(2)}
          </p>
        </div>}
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-3 text-sm w-full">
        {pieData.map((item, idx) => (
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
