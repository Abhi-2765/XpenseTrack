"use client";
import { useNavigate } from 'react-router-dom';
import { Plus } from "lucide-react";

const AddButton = () => {
  
  const navigate = useNavigate()
  const onClick = () => {
    navigate('/add-transaction');
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-14 h-14 rounded-[50%] bg-sky-500 hover:bg-sky-600 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <Plus className="w-6 h-6 text-black" strokeWidth={2.5} />
    </button>
  );
};

export default AddButton;
