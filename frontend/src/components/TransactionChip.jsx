const TransactionChip = ({ note, date, category, amount, type }) => {

  const amountClass =
    type === "income"
      ? "text-green-400 font-medium"
      : "text-red-400 font-medium";

  return (
    <div
      className="flex items-center gap-4 mx-2 rounded-xl bg-gray-900 p-4 shadow-md 
                 transition-all hover:shadow-lg hover:ring-2 hover:ring-blue-400/50"
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-blue-400 text-2xl">
        <span className="material-symbols-outlined">{"😂"}</span>
      </div>

      <div className="flex-1">
        <p className="text-md font-bold text-white">{note ? note : category[0].toUpperCase() + category.slice(1)}</p>
        <p className="text-sm text-gray-400">{date}</p>
      </div>

      <div className="text-right">
        <p className={amountClass}>
          {type === "income" ? `+$${amount}` : `-$${amount}`}
        </p>
        <p className="text-xs text-gray-500">{category}</p>
      </div>
    </div>
  );
};

export default TransactionChip;
