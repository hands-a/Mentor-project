import { Link, NavLink } from "react-router-dom";
import { MdOutlineBookOnline } from "react-icons/md";

function Navbar() {


const navLinkStyles = ({ isActive }) =>
    isActive
      ? "text-[#EAA451] font-bold text-lg" 
      : "text-white hover:text-gray-300 transition text-lg"; 

  return (
    <nav className="absolute top-0 left-0 w-full z-50 py-6 bg-[#FFFFFF33]">
      <div className="container mx-auto px-10 flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-2 text-white text-2xl font-bold">
            <MdOutlineBookOnline size={30} className="text-white" />
            <span>BookShop</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkStyles}>
            Home
            </NavLink>

            <NavLink to="/books" className={navLinkStyles}
            
            >
            Books
            </NavLink>

            <NavLink to="/about" className={navLinkStyles}>
            About Us
            </NavLink>
        </div>

        <div className="flex items-center gap-4">
        
    <Link to="/login">
            <button className="bg-[#F04C88] text-white px-6 py-2 rounded-md font-medium hover:bg-[#d63d76] transition">
            Log in
            </button>
            </Link>

            <Link to="/register">
            <button className="bg-white text-[#F04C88] px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition">
                Sign Up
            </button>
            </Link>
        </div>

        </div>
    </nav>
  );
}

export default Navbar;