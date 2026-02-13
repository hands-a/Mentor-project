import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBookOpen, FaHeart, FaShoppingCart, FaHistory, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [userName, setUserName] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const updateAll = () => {
    const token = localStorage.getItem("userToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token) {
      setIsLogin(true);
      setUserName(user ? user.name : "User");

      axios.get("https://bookstore.eraasoft.pro/api/cart", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const items = res.data.data.items || [];
        setCartCount(items.length);
      })
      .catch(() => setCartCount(0));

      axios.get("https://bookstore.eraasoft.pro/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const items = res.data.data || [];
        setWishlistCount(items.length);
      })
      .catch(() => setWishlistCount(0));

    } else {
      setIsLogin(false);
      setUserName("");
      setCartCount(0);
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    updateAll();
    window.addEventListener("storageUpdated", updateAll);
    window.addEventListener("authUpdated", updateAll);
    return () => {
      window.removeEventListener("storageUpdated", updateAll);
      window.removeEventListener("authUpdated", updateAll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    window.dispatchEvent(new Event("authUpdated"));
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 text-white font-sans border-b border-white/20 bg-white/10 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-4 md:gap-8">
          <Link to="/" className="flex items-center gap-2 text-lg md:text-xl font-bold tracking-wide">
            <FaBookOpen className="text-xl md:text-2xl" />
            <span>Bookshop</span>
          </Link>

          <div className="h-6 w-px bg-white/40 hidden md:block"></div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-100">
            <NavLink to="/" className={({isActive}) => isActive ? "text-white font-bold" : "hover:text-white transition"}>Home</NavLink>
            <NavLink to="/books" className={({isActive}) => isActive ? "text-white font-bold" : "hover:text-white transition"}>Books</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? "text-white font-bold" : "hover:text-white transition"}>About us</NavLink>
          </div>
        </div>

        <button 
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="hidden md:flex items-center gap-6">
          {isLogin ? (
            <>
              <Link to="/wishlist" className="relative cursor-pointer hover:scale-105 transition">
                <FaHeart className="text-xl text-gray-100 hover:text-white transition" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#F04C88] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative cursor-pointer mr-4 hover:scale-105 transition">
                <FaShoppingCart className="text-xl text-gray-100 hover:text-white transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#F04C88] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div 
                className="relative"
                onMouseEnter={() => setShowProfileMenu(true)}
                onMouseLeave={() => setShowProfileMenu(false)}
              >
                <div className="flex items-center gap-3 pl-4 border-l border-white/30 cursor-pointer">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/50">
                        <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-full h-full object-cover"/>
                    </div>
                    <div className="hidden lg:flex flex-col">
                        <span className="text-sm font-bold leading-tight">{userName}</span>
                        <span className="text-xs text-gray-200">Member</span>
                    </div>
                </div>

                {showProfileMenu && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-gray-800 animate-fadeIn border border-gray-100">
                        <Link to="/order-history" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition text-sm">
                            <FaHistory className="text-[#F04C88]" />
                            <span>Order History</span>
                        </Link>
                        <div className="h-px bg-gray-100 my-1"></div>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition text-sm text-red-500">
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </button>
                    </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-white hover:text-[#F04C88] transition font-medium text-sm">Login</Link>
              <Link to="/register" className="bg-[#F04C88] text-white px-5 py-2 rounded-md font-bold text-sm hover:bg-[#d63d76] transition shadow-md">Register</Link>
            </div>
          )}
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#2E2548] border-t border-white/10 shadow-lg md:hidden flex flex-col py-4 px-6 gap-4 animate-slideDown">
            <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-200 hover:text-white py-2 border-b border-white/10">Home</NavLink>
            <NavLink to="/books" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-200 hover:text-white py-2 border-b border-white/10">Books</NavLink>
            <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-200 hover:text-white py-2 border-b border-white/10">About us</NavLink>
            
            {isLogin ? (
              <>
                <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-200 hover:text-white py-2">
                  <FaHeart /> Wishlist ({wishlistCount})
                </Link>
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-200 hover:text-white py-2">
                  <FaShoppingCart /> Cart ({cartCount})
                </Link>
                <Link to="/order-history" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-200 hover:text-white py-2">
                  <FaHistory /> Order History
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 hover:text-red-300 py-2 mt-2 border-t border-white/10 pt-4">
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3 mt-2">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center py-2 text-white border border-white/20 rounded hover:bg-white/10 transition">Login</Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-center py-2 bg-[#F04C88] text-white rounded hover:bg-[#d63d76] transition">Register</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}