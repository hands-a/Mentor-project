import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";
import headerBg from "../assets/background.jpg"; 
import bookPlaceholder from "../assets/1.jpg";

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCart = () => {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    setLoading(true);
    axios.get("https://bookstore.eraasoft.pro/api/cart", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const data = res.data.data;
      const mappedItems = (data.items || []).map(item => ({
        id: item.id,
        qty: item.qty,
        book: {
            id: item.book.id,
            title: item.book.bookName || item.book.title || "No Title",
            image: item.book.image || bookPlaceholder,
            author: item.book.author || "Unknown Author",
            price: parseFloat(item.book.price) || 0
        }
      }));
      setCartItems(mappedItems);
      setCartTotal(parseFloat(data.total) || 0);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = (cartItemId) => {
    const token = localStorage.getItem("userToken");
    
    axios.delete(`https://bookstore.eraasoft.pro/api/cart/destroy/${cartItemId}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { _method: "delete" } 
    })
    .then(() => {
      setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      fetchCart(); 
      window.dispatchEvent(new Event("storageUpdated"));
    })
    .catch(err => {
        console.error("Delete Error:", err);
        alert("Failed to remove item.");
    });
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty < 1) return;
    
    const token = localStorage.getItem("userToken");
    
    const formData = new FormData();
    formData.append("qty", newQty);

    axios.post(`https://bookstore.eraasoft.pro/api/cart/update/${cartItemId}`, 
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(() => {
      fetchCart(); 
    })
    .catch(err => console.error(err));
  };

  const tax = 4.00;
  const finalTotal = cartTotal + tax; 

  if (loading && cartItems.length === 0) {
    return <div className="text-center py-20">Loading Cart...</div>;
  }

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans pb-12">
      
      <div className="relative w-full h-64">
        <img src={headerBg} alt="Header" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white">
            <h1 className="text-4xl font-bold mb-2">My Cart</h1>
            <div className="flex gap-2 text-sm text-gray-300">
                <Link to="/" className="hover:text-white">Home</Link> / <span className="text-[#F04C88]">My Cart</span>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {cartItems.length > 0 ? (
          <>
            <div className="hidden md:grid grid-cols-12 gap-4 text-center font-bold text-[#393280] border-b border-gray-200 pb-4 mb-6">
                <div className="col-span-6 text-left pl-4">Item</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">Total Price</div>
            </div>

            <div className="flex flex-col gap-6 mb-12">
                {cartItems.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:grid md:grid-cols-12 gap-6 items-center">
                        <div className="col-span-6 flex gap-4 w-full">
                            <div className="w-24 h-32 flex-shrink-0 bg-gray-100 overflow-hidden rounded-md">
                                <img src={item.book.image} alt={item.book.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col justify-center gap-1">
                                <h3 className="font-bold text-[#393280] text-lg">{item.book.title}</h3>
                                <span className="text-xs text-gray-400 font-bold">Author: {item.book.author}</span>
                                <p className="text-xs text-gray-500 line-clamp-2 mt-1">Book details description here.</p>
                                <div className="mt-2 text-xs border border-gray-200 rounded px-2 py-1 w-fit text-gray-500">Free Shipping</div>
                            </div>
                        </div>

                        <div className="col-span-2 flex justify-center">
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => updateQuantity(item.id, item.qty - 1)}
                                    disabled={item.qty <= 1}
                                    className="w-6 h-6 rounded-full border border-[#F04C88] text-[#F04C88] flex items-center justify-center hover:bg-[#F04C88] hover:text-white transition disabled:opacity-50"
                                >
                                    <FaMinus size={10} />
                                </button>
                                <span className="font-bold text-[#393280] w-4 text-center">{item.qty}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, item.qty + 1)}
                                    className="w-6 h-6 rounded-full border border-[#F04C88] text-[#F04C88] flex items-center justify-center hover:bg-[#F04C88] hover:text-white transition"
                                >
                                    <FaPlus size={10} />
                                </button>
                            </div>
                        </div>

                        <div className="col-span-2 text-center font-bold text-[#393280] text-lg">
                            ${item.book.price.toFixed(0)}
                        </div>

                        <div className="col-span-2 flex items-center justify-between md:justify-center gap-8 w-full md:w-auto">
                            <span className="font-bold text-[#393280] text-lg">${(item.book.price * item.qty).toFixed(0)}</span>
                            <button onClick={() => removeItem(item.id)} className="text-[#F04C88] hover:text-red-600 transition bg-pink-50 p-2 rounded-full">
                                <FaTrashAlt size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-[#F2F2F2] rounded-xl p-8 max-w-4xl mx-auto">
                <h3 className="text-xl font-bold text-[#393280] mb-2">Payment Summary</h3>
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="flex-1">
                        <label className="text-sm text-gray-500 mb-2 block">Have a discount code?</label>
                        <div className="flex gap-2">
                            <input type="text" placeholder="Enter Promo Code" className="border border-gray-300 rounded-md px-4 py-3 w-full outline-none focus:border-[#F04C88]" />
                            <button className="bg-[#393280] text-white px-6 py-3 rounded-md font-bold hover:bg-[#2a2455] transition">Apply</button>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                        <div className="flex justify-between text-gray-600 text-sm">
                            <span>Subtotal</span>
                            <span className="font-bold text-[#393280]">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm">
                            <span>Tax</span>
                            <span className="font-bold text-[#393280]">${tax.toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-gray-300 my-2"></div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-bold text-[#393280]">Total</span>
                            <span className="text-2xl font-bold text-[#F04C88]">${finalTotal.toFixed(2)}</span>
                        </div>
                        <Link to="/checkout" className="w-full block text-center bg-[#F04C88] text-white py-3 rounded-full font-bold hover:bg-[#d63d76] transition shadow-md mb-3">
                            Check out
                        </Link>
                    </div>
                </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-[#393280] mb-4">Your cart is empty</h2>
            <Link to="/books" className="bg-[#F04C88] text-white px-8 py-3 rounded-full font-bold hover:bg-[#d63d76] transition shadow-lg">Go to Books</Link>
          </div>
        )}
      </div>
    </div>
  );
}