import axios from "axios";
import { useForm } from "react-hook-form";
import { DollarSign, FileText, Smile } from "lucide-react";

const AddBudget = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      type: "monthly",
      amount: "",
      notes: "",
      icon: "",
    },
  });

  const budgetType = watch("type", "monthly");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/budget/add",
        {
          name: data.notes,
          icon: data.icon,
          amount: Number(data.amount),
          type: data.type,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Budget added:", response.data);

      reset({
        type: "monthly",
        amount: "",
        notes: "",
        icon: "",
      });

    } catch (error) {
      console.log("Error adding budget:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 py-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            Add Budget
          </h1>
        </div>

        {/* Form Container */}
        <div className="backdrop-blur-xl bg-slate-800/60 rounded-3xl p-8 shadow-2xl border border-slate-700">
          <div className="space-y-6">

            {/* Budget Name */}
            <div className="space-y-2">
              <label className="block text-slate-200 font-medium text-sm uppercase tracking-wide">
                Name
              </label>

              <div className="relative group">
                <div className="absolute top-4 left-4 pointer-events-none">
                  <FileText className="h-5 w-5 text-blue-400 transition-colors" />
                </div>

                <input
                  placeholder="What is this budget for?"
                  {...register("notes", { required: "Name is required" })}
                  className="w-full pl-12 pr-4 pt-4 pb-4 bg-slate-900/60 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 backdrop-blur-sm"
                />
              </div>

              {errors.notes && (
                <p className="text-red-400 text-sm">{errors.notes.message}</p>
              )}
            </div>

            {/* Budget Icon */}
            <div className="space-y-2">
              <label className="block text-slate-200 font-medium text-sm uppercase tracking-wide">
                Icon
              </label>

              <div className="relative group">
                <div className="absolute top-4 left-4 pointer-events-none">
                  <Smile className="h-5 w-5 text-blue-400 transition-colors" />
                </div>

                <input
                  placeholder="Add an emoji..."
                  maxLength={1}
                  {...register("icon", {
                    required: "Icon is required",
                    maxLength: {
                      value: 1,
                      message: "Only one emoji allowed",
                    },
                  })}
                  className="w-full pl-12 pr-4 pt-4 pb-4 bg-slate-900/60 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 backdrop-blur-sm"
                />
              </div>

              {errors.icon && (
                <p className="text-red-400 text-sm">{errors.icon.message}</p>
              )}
            </div>

            {/* Amount Field */}
            <div className="space-y-2">
              <label className="block text-slate-200 font-medium text-sm uppercase tracking-wide">
                Amount Allotted
              </label>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-blue-400 transition-colors" />
                </div>

                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("amount", {
                    required: "Amount is required",
                    min: { value: 0.01, message: "Amount must be greater than 0" },
                  })}
                  className="w-full h-14 pl-12 pr-4 bg-slate-900/60 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 backdrop-blur-sm"
                />
              </div>

              {errors.amount && (
                <p className="text-red-400 text-sm">{errors.amount.message}</p>
              )}
            </div>

            {/* Monthly / Yearly Toggle */}
            <div className="space-y-2">
              <label className="block text-slate-200 font-medium text-sm uppercase tracking-wide">
                Budget Type
              </label>

              <div className="relative bg-slate-900/60 rounded-xl p-1 border border-slate-700">
                <div className="flex">

                  {/* Monthly */}
                  <input
                    id="monthly"
                    type="radio"
                    value="monthly"
                    {...register("type")}
                    className="sr-only"
                  />
                  <label
                    htmlFor="monthly"
                    className={`flex-1 text-center py-3 px-6 rounded-lg cursor-pointer transition-all duration-300 font-medium ${budgetType === "monthly"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-[0.98]"
                      : "text-slate-400 hover:bg-slate-800"
                      }`}
                  >
                    Monthly
                  </label>

                  {/* Yearly */}
                  <input
                    id="yearly"
                    type="radio"
                    value="yearly"
                    {...register("type")}
                    className="sr-only"
                  />
                  <label
                    htmlFor="yearly"
                    className={`flex-1 text-center py-3 px-6 rounded-lg cursor-pointer transition-all duration-300 font-medium ${budgetType === "yearly"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-[0.98]"
                      : "text-slate-400 hover:bg-slate-800"
                      }`}
                  >
                    Yearly
                  </label>

                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-300 focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding Budget...
                  </div>
                ) : (
                  "Add Budget"
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBudget;
