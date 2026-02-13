import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import headerBg from "../assets/background.jpg"; 
import bookPlaceholder from "../assets/1.jpg";

export default function WishlistPage() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = () => {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    setLoading(true);
    axios.get("https://bookstore.eraasoft.pro/api/wishlist", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setWishlistItems(res.data.data || []);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = (e, wishlistId) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    const token = localStorage.getItem("userToken");
    const formData = new FormData();
    formData.append("_method", "delete");

    // تحديث فوري للواجهة
    const oldItems = [...wishlistItems];
    setWishlistItems(prev => prev.filter(item => item.id !== wishlistId));

    axios.post(`https://bookstore.eraasoft.pro/api/wishlist/destroy/${wishlistId}`, 
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(() => {
      window.dispatchEvent(new Event("storageUpdated")); 
    })
    .catch(err => {
      console.error(err);
      setWishlistItems(oldItems); // تراجع في حالة الخطأ
    });
  };

  const moveToCart = (e, bookId, wishlistId) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (!bookId) return;

    const token = localStorage.getItem("userToken");
    const formData = new FormData();
    formData.append("book_id", bookId);
    formData.append("qty", 1);

    axios.post(`https://bookstore.eraasoft.pro/api/cart/store`, 
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(() => {
        alert("Moved to Cart!");
        window.dispatchEvent(new Event("storageUpdated")); 
        removeFromWishlist(null, wishlistId);
    })
    .catch(err => {
        console.error(err);
        alert("Failed to move to cart");
    });
  };

  if (loading && wishlistItems.length === 0) {
    return <div className="text-center py-20">Loading Wishlist...</div>;
  }

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans pb-12">
      
      <div className="relative w-full h-64">
        <img src={headerBg} alt="Header" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white">
            <h1 className="text-4xl font-bold mb-2">Wishlist</h1>
            <div className="flex gap-2 text-sm text-gray-300">
                <Link to="/" className="hover:text-white">Home</Link> / <span className="text-[#F04C88]">Wishlist</span>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {wishlistItems.length > 0 ? (
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200 text-[#393280]">
                            <th className="text-left py-4 pl-4">Product</th>
                            <th className="text-center py-4">Price</th>
                            <th className="text-center py-4">Stock Status</th>
                            <th className="text-center py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlistItems.map((item) => {
                            const bookId = item.book?.id;
                            return (
                                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td className="py-4 pl-4 flex items-center gap-4">
                                        <div className="w-16 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                            <img src={item.book?.image || bookPlaceholder} alt={item.book?.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#393280] text-sm md:text-base">{item.book?.title || item.book?.bookName}</h3>
                                            <p className="text-xs text-gray-500">Author: {item.book?.author || "Unknown"}</p>
                                        </div>
                                    </td>
                                    <td className="text-center font-bold text-[#393280]">
                                        ${item.book?.price}
                                    </td>
                                    <td className="text-center">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.book?.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            {item.book?.stock > 0 ? "In Stock" : "Out of Stock"}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            <button 
                                                onClick={(e) => moveToCart(e, bookId, item.id)}
                                                className="bg-[#393280] text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-[#2a2455] transition flex items-center gap-2"
                                            >
                                                <FaShoppingCart /> Add to Cart
                                            </button>
                                            <button 
                                                onClick={(e) => removeFromWishlist(e, item.id)}
                                                className="text-gray-400 hover:text-red-500 transition p-2"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        ) : (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-[#393280] mb-4">Your wishlist is empty</h2>
                <Link to="/books" className="bg-[#F04C88] text-white px-8 py-3 rounded-full font-bold hover:bg-[#d63d76] transition shadow-lg">Browse Books</Link>
            </div>
        )}
      </div>
    </div>
  );
}