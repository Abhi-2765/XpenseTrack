import {
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  PiggyBank,
} from "lucide-react";

const DashboardSummaryChips = ({ info }) => {
  const cards = [
    {
      label: "Total Balance",
      value: info.balance,
      icon: <Wallet className="w-6 h-6" />,
      bg: "bg-blue-600/20",
      color: "text-blue-400",
    },
    {
      label: "Total Income",
      value: info.income,
      icon: <ArrowUpCircle className="w-6 h-6" />,
      bg: "bg-green-600/20",
      color: "text-green-400",
    },
    {
      label: "Total Expenses",
      value: info.expenses,
      icon: <ArrowDownCircle className="w-6 h-6" />,
      bg: "bg-red-600/20",
      color: "text-red-400",
    },
    {
      label: "Savings",
      value: info.savings,
      icon: <PiggyBank className="w-6 h-6" />,
      bg: "bg-purple-600/20",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="rounded-2xl bg-gray-800 p-6 shadow-lg flex items-center gap-4 
                     hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
        >
          <div className={`${card.bg} ${card.color} p-3 rounded-full`}>
            {card.icon}
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">{card.label}</p>
            <p className="text-white text-2xl font-bold mt-1">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummaryChips;
