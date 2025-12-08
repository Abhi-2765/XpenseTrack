"use client";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";

export default function SpendingTrends() {
  const [period, setPeriod] = useState("monthly");

  const [monthlyData, setMonthlyData] = useState({
    x: [],
    income: [],
    expenses: []
  });

  const [dailyData, setDailyData] = useState({
    x: [],
    income: [],
    expenses: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      const response = await axios.get(
        "http://localhost:5000/report/fetchMonthlyData",
        { withCredentials: true }
      );
      setMonthlyData(response.data);
    };

    const fetchDailyData = async () => {
      const response = await axios.get(
        "http://localhost:5000/report/fetchDailyData",
        { withCredentials: true }
      );
      setDailyData(response.data);
    };

    setLoading(true);

    (async () => {
      if (period === "monthly") {
        await fetchMonthlyData();
      } else {
        await fetchDailyData();
      }
      setLoading(false);
    })();
  }, [period]);

  const current = period === "monthly" ? monthlyData : dailyData;

  if (loading || !current.x.length) {
    return (
      <div className="text-gray-400 text-center py-10">
        Loading chart...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full text-white">
      {/* Toggle Buttons */}
      <div className="flex justify-center sm:justify-end gap-2 mb-4 flex-wrap">
        {["monthly", "daily"].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all ${period === p
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:text-white"
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
