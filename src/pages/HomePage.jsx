import { FaSearch, FaMicrophone } from "react-icons/fa";
import background from "../assets/background.jpg";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      
      <div className="relative w-full h-screen">
        <img
          src={background}
          alt="Homepage Background"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-3xl bg-white rounded-full shadow-xl flex items-center overflow-hidden h-16">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 h-full px-6 outline-none text-gray-700 text-lg placeholder-gray-400 bg-transparent"
            />
            <div className="px-4 text-gray-400 cursor-pointer hover:text-gray-600">
              <FaMicrophone size={20} />
            </div>
            <button className="bg-[#D9176C] hover:bg-[#c21560] text-white w-20 h-full flex justify-center items-center transition-all duration-300 cursor-pointer">
              <FaSearch size={22} />
            </button>
          </div>
        </div>
      </div>

      
      <div className="py-40 bg-white"> 
          <div className="container mx-auto px-10 text-center">
              
              <div className="h-96"></div> 
          </div>
      </div>

    </div>
  );
}