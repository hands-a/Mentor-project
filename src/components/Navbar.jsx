import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBookOpen, FaHeart, FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [userName, setUserName] = useState("");

  const updateAll = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLogin(true);
      setUserName(user.name);
    } else {
      setIsLogin(false);
      setUserName("");
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setCartCount(cart.length);
    setWishlistCount(wishlist.length);
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

  return (
    <nav className="absolute top-0 left-0 w-full z-50 text-white font-sans border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-wide">
            <FaBookOpen className="text-2xl" />
            <span>Bookshop</span>
          </Link>

          <div className="h-6 w-px bg-gray-400 hidden md:block"></div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-200">
            <NavLink to="/" className={({isActive}) => isActive ? "text-white font-bold" : "hover:text-white transition"}>Home</NavLink>
            <NavLink to="/books" className={({isActive}) => isActive ? "text-white font-bold" : "hover:text-white transition"}>Books</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? "text-white font-bold" : "hover:text-white transition"}>About us</NavLink>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {isLogin ? (
            <>
              <div className="relative cursor-pointer hover:scale-105 transition">
                <FaHeart className="text-xl text-gray-200 hover:text-white transition" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#F04C88] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {wishlistCount}
                  </span>
                )}
              </div>

              <div className="relative cursor-pointer mr-4 hover:scale-105 transition">
                <FaShoppingCart className="text-xl text-gray-200 hover:text-white transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#F04C88] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-500">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-400">
                  <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-full h-full object-cover"/>
                </div>
                <div className="hidden lg:flex flex-col">
                  <span className="text-sm font-bold leading-tight">{userName}</span>
                  <span className="text-xs text-gray-300">Member</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-white hover:text-[#F04C88] transition font-medium text-sm">Login</Link>
              <Link to="/register" className="bg-[#F04C88] text-white px-5 py-2 rounded-md font-bold text-sm hover:bg-[#d63d76] transition shadow-md">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}