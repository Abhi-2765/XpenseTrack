const SubmitButton = ({ isSubmitting, handleSubmit, onSubmit, text }) => {
    return (
        <div className="pt-6">
            <button
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)();
                }}
                disabled={isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
            >
                <span className="relative z-10">
                    {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Adding {text}...
                        </div>
                    ) : (
                        `Add ${text}`
                    )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
        </div>
    );
};

export default SubmitButton;
