"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading"
import TransactionChip from "../../components/TransactionChip"
import { Plus, CalendarDays, Tags, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";

const TransactionPage = () => {

  const limit = 10;

  const [amountRange, setAmountRange] = useState({ min: "", max: "" });
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);

        const response = await axios.post(
          "http://localhost:5000/transactions/history",
          {
            page,
            limit,
            category: category || undefined,
            date: selectedDate || undefined,
          }, {
          withCredentials: true,
        }
        );

        const { transactions, totalPages } = response.data;
        setTransactions(transactions);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, [page, category, selectedDate]);


  const navigate = useNavigate();

  const handleAddButton = () => {
    navigate("/add-transaction");
  };

  const handleAmountChange = (e) => {
    const { name, value } = e.target;
    setAmountRange((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="px-6 md:px-10 py-8 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 min-h-screen font-['Spline_Sans'] text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <button
          className="flex items-center justify-center gap-2 rounded-full h-10 px-5 bg-sky-500 hover:bg-sky-600 text-gray-900 text-sm font-bold hover:brightness-110 transition-all shadow-md"
          onClick={handleAddButton}
        >
          <Plus className="w-4 h-4" />
          <span>New Transaction</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row flex-wrap gap-4 mb-6">
        {/* Search */}
        <div className="flex-1 min-w-[250px]">
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full rounded-full border-2 border-gray-800 bg-gray-900 py-2.5 px-5 text-white placeholder:text-gray-400 focus:border-[#38e07b] focus:ring-[#38e07b] transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 h-10 rounded-full bg-gray-900 px-4 text-sm text-gray-300">
            <Tags className="w-4 h-4 text-sky-500" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent text-white outline-none cursor-pointer"
            >
              <option value="">Category</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
            </select>
          </div>

          <div className="flex items-center h-10 rounded-full bg-gray-900 px-4 text-sm text-gray-300">
            <CalendarDays className="w-4 h-4 text-sky-500 mr-2" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-white outline-none cursor-pointer"
            />
          </div>

          <div className="flex items-center bg-gray-900 rounded-full px-4 h-10 text-sm text-gray-300">
            <DollarSign className="w-4 h-4 text-[#38e07b] mr-2" />
            <input
              name="min"
              type="number"
              placeholder="Min"
              value={0}
              onChange={handleAmountChange}
              className="w-16 bg-transparent outline-none text-white placeholder:text-gray-500 text-sm"
            />
            <DollarSign className="w-4 h-4 text-[#38e07b] mr-2" />
            <input
              name="max"
              type="number"
              placeholder="Max"
              value={amountRange.max}
              onChange={handleAmountChange}
              className="w-16 bg-transparent outline-none text-white placeholder:text-gray-500 text-sm"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Loading />
        </div>
      ) : transactions.length === 0 ? (
        <div className="mt-8 border-t border-gray-800 pt-10 text-gray-400 text-center">
          <p>No transactions found. Start by adding one!</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 mt-6">
            {transactions.map((tx) => (
              <TransactionChip
                key={tx._id}
                note={tx.note}
                date={tx.date.slice(0, 10).split("-").reverse().join("-")}
                category={tx.category}
                amount={tx.amount}
                type={tx.type}
              />
            ))}
          </div>
        </>
      )}

      <div className="mt-10 flex justify-center items-center gap-4 text-gray-300">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${page === 1
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "bg-gray-900 hover:bg-gray-800 text-white"
            }`}
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>

        <span className="text-sm">
          Page <span className="font-semibold text-sky-500">{page}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </span>

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${page === totalPages
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "bg-gray-900 hover:bg-gray-800 text-white"
            }`}
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TransactionPage;
