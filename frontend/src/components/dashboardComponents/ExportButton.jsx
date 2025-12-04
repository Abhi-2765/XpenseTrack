import { Download } from "lucide-react";

const ExportButton = () => {
  const handleClick = () => {
    alert("Hi");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1 sm:gap-2 rounded-md bg-[#1f2937] px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm text-white hover:bg-gray-500 active:scale-95 transition-all duration-200"
    >
      <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      <span className="hidden xs:inline sm:inline">Export</span>
    </button>
  );
};

export default ExportButton;
