const BudgetChip = ({ type, allotedAmount, spentAmount, emoji }) => {
  const percentage = Math.round((spentAmount / allotedAmount) * 100);
  const remaining = allotedAmount - spentAmount;

  let statusText = "";
  let bgColor = "";
  let progressColor = "";
  let statusClass = "text-gray-400 text-sm";

  if (spentAmount > allotedAmount) {
    statusText = `Exceeded by $${spentAmount - allotedAmount}`;
    bgColor = "bg-red-900/50 border border-red-500";
    progressColor = "bg-red-500";
    statusClass = "text-red-400 text-sm font-bold";
  } else if (percentage >= 85) {
    statusText = "Nearing Limit";
    bgColor = "bg-yellow-900/50 border border-yellow-500";
    progressColor = "bg-yellow-500";
    statusClass = "text-yellow-400 text-sm font-bold";
  } else {
    statusText = `$${remaining} Remaining`;
    bgColor = "bg-blue-500/20 border border-blue-500/30";
    progressColor = "bg-sky-400";
  }

  return (
    <div
      className={`flex flex-col gap-4 px-6 pt-6 pb-0 rounded-lg ${bgColor} lg:w-[300px]`}
      style={{ fontFamily: "Manrope, 'Noto Sans', sans-serif" }}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-white text-lg font-semibold">{type}</p>
          <p className={statusClass}>{statusText}</p>
        </div>
        <span className="text-2xl">{emoji}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          className={`${progressColor} h-2.5 rounded-full`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>

      {/* Footer */}
      <div className="flex justify-between text-sm ">
        <p className="text-white">
          ${spentAmount} / ${allotedAmount}
        </p>
        <p
          className={
            spentAmount > allotedAmount
              ? "text-red-400 font-bold"
              : percentage >= 85
              ? "text-yellow-400 font-bold"
              : "text-gray-400"
          }
        >
          {percentage}%
        </p>
      </div>
    </div>
  );
};

export default BudgetChip;
