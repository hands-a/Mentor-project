import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { MdOutlineBookOnline } from "react-icons/md"; 
import { IoEarth } from "react-icons/io5"; 
import { MdKeyboardArrowRight } from "react-icons/md"; 
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    
    <footer className="bg-[#3B2F4A] text-white py-10 mt-auto">
      
      <div className="container mx-auto px-10">
        
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            
            <div className="flex items-center gap-2 text-2xl font-bold">
              <MdOutlineBookOnline size={30} />
              <span>Bookshop</span>
            </div>

            
            <div className="flex gap-6 font-medium text-lg">
                <a href="/" className="text-[#EAA451]">Home</a>
                <a href="/books" className="hover:text-gray-300 transition">Books</a>
                <a href="/about" className="hover:text-gray-300 transition">About Us</a>
            </div>

          </div>

          <div className="flex gap-5">
            <div className="bg-white/10 p-2 rounded-full cursor-pointer hover:bg-[#E76F51] transition">
                <FaFacebookF size={18} />
            </div>
            <div className="bg-white/10 p-2 rounded-full cursor-pointer hover:bg-[#E76F51] transition">
                <FaInstagram size={18} />
            </div>
            <div className="bg-white/10 p-2 rounded-full cursor-pointer hover:bg-[#E76F51] transition">
                <FaYoutube size={18} />
            </div>
            <div className="bg-white/10 p-2 rounded-full cursor-pointer hover:bg-[#E76F51] transition">
                <FaXTwitter size={18} />
            </div>
        </div>

        </div>

        <div className="border-t border-gray-600/50 my-6"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300 gap-4">
        
        <p>
            &lt;Developed By&gt; EraaSoft &lt;All Copy Rights Reserved @2026
        </p>
        <button className="flex items-center gap-2 border border-gray-500 rounded-full px-4 py-1.5 hover:border-white transition cursor-pointer">
            <IoEarth size={18} />
            <span>English</span>
            <MdKeyboardArrowRight size={20} />
        </button>

        </div>

    </div>
    </footer>
    );
}