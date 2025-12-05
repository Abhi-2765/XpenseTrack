const InputField = ({
    name,
    label,
    placeholder,
    icon: Icon,
    register,
    errors,
    validation = {},
    ...rest
}) => {
    return (
        <div className="space-y-2">
            <label className="block text-slate-200 font-medium text-sm uppercase tracking-wide">
                {label}
            </label>

            <div className="relative group">
                {Icon && (
                    <div className="absolute top-4 left-4 pointer-events-none">
                        <Icon className="h-5 w-5 text-blue-400 transition-colors" />
                    </div>
                )}

                <input
                    placeholder={placeholder}
                    {...register(name, validation)}
                    {...rest}
                    className="w-full pl-12 pr-4 pt-4 pb-4 bg-slate-900/60 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 backdrop-blur-sm"
                />
            </div>

            {errors[name] && (
                <p className="text-red-400 text-sm">{errors[name]?.message}</p>
            )}
        </div>
    );
};

export default InputField;
