import { Link, NavLink } from "react-router-dom";
import { MdOutlineBookOnline } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

function Navbar({ cartCount, wishlistCount, isLogin }) {
  
  const userData = {
    name: "John Smith",
    email: "johnsmith@gmail.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  };

  const navLinkStyles = ({ isActive }) =>
    isActive ? "text-[#EAA451] font-bold text-lg" : "text-white hover:text-gray-300 transition text-lg";

  return (
    <nav className="absolute top-0 left-0 w-full z-50 py-4 bg-white/10 backdrop-blur-md">
      <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
        
        <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-white text-2xl font-bold">
              <MdOutlineBookOnline size={30} className="text-white" />
              <span>Bookshop</span>
            </Link>
            <div className="hidden md:block w-px h-8 bg-gray-400/50"></div>
            <div className="hidden md:flex items-center gap-6">
              <NavLink to="/" className={navLinkStyles}>Home</NavLink>
              <NavLink to="/books" className={navLinkStyles}>Books</NavLink>
              <NavLink to="/about" className={navLinkStyles}>About us</NavLink>
            </div>
        </div>

        <div className="flex items-center gap-6">
          {isLogin ? (
            <>
              <div className="relative cursor-pointer text-white hover:text-[#EAA451] transition">
                 <FaRegHeart size={24} />
                 <div className="absolute -top-2 -right-2 bg-[#F04C88] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#2E2548]">
                    {wishlistCount}
                 </div>
              </div>

              <div className="relative cursor-pointer text-white hover:text-[#EAA451] transition mr-4">
                 <FiShoppingCart size={24} />
                 <div className="absolute -top-2 -right-2 bg-[#F04C88] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#2E2548]">
                    {cartCount}
                 </div>
              </div>

              <div className="hidden md:block w-px h-8 bg-gray-400/30"></div>

              <div className="flex items-center gap-3 cursor-pointer">
                 <div className="relative">
                    <img src={userData.avatar} alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-white/20"/>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#2E2548] rounded-full"></div>
                 </div>
                 <div className="hidden lg:block">
                    <p className="text-white text-sm font-bold leading-tight">{userData.name}</p>
                    <p className="text-gray-400 text-xs">{userData.email}</p>
                 </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login"><button className="bg-[#F04C88] text-white px-6 py-2 rounded-md font-medium hover:bg-[#d63d76] transition shadow-md">Log in</button></Link>
              <Link to="/register"><button className="bg-white text-[#F04C88] px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition shadow-md">Sign Up</button></Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;