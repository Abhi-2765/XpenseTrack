import { useState } from "react";
import PopUp from "../PopUp/PopUp";

const Home = () => {

  const [date, setDate] = useState("");

  return (
    <div className="p-6 max-w-screen-md mx-auto bg-gray-100 min-h-screen">
      <div className="mb-6">
        <label htmlFor="date-picker" className="block text-lg font-bold mb-2">
          Select Date:
        </label>
        <input
          type="date"
          id="date-picker"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {date && <PopUp Date={date}/>}
    </div>
  );
};

export default Home;