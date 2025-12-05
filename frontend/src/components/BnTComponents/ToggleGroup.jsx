const ToggleGroup = ({ options, register, name, watchValue }) => {
    return (
        <div className="space-y-2">
            <label className="block text-slate-200 font-medium text-sm uppercase tracking-wide">
                {name} TYPE
            </label>

            <div className="relative bg-slate-900/60 rounded-xl p-1 border border-slate-700 flex">
                {options.map(opt => (
                    <React.Fragment key={opt.value}>
                        <input
                            type="radio"
                            id={opt.value}
                            value={opt.value}
                            {...register(name)}
                            className="sr-only"
                        />
                        <label
                            htmlFor={opt.value}
                            className={`flex-1 text-center py-3 px-6 rounded-lg cursor-pointer font-medium transition-all
                ${watchValue === opt.value
                                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-[0.98]"
                                    : "text-slate-400 hover:bg-slate-800"}
              `}
                        >
                            {opt.label}
                        </label>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default ToggleGroup;
