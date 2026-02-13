import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaMinus, FaPlus } from "react-icons/fa";
import headerBg from "../assets/background.jpg"; 
import bookPlaceholder from "../assets/1.jpg";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", city: "", state: "", zip: "", address: "", note: ""
  });

  const fetchCart = () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
        navigate("/login");
        return;
    }

    axios.get("https://bookstore.eraasoft.pro/api/cart", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const data = res.data.data;
      const items = (data.items || []).map(item => ({
        id: item.id,
        qty: item.qty,
        bookId: item.book.id,
        title: item.book.bookName || item.book.title,
        author: item.book.author,
        price: parseFloat(item.book.price),
        image: item.book.image || bookPlaceholder
      }));
      setCartItems(items);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty < 1) return;
    const token = localStorage.getItem("userToken");
    const data = new FormData();
    data.append("qty", newQty);

    axios.post(`https://bookstore.eraasoft.pro/api/cart/update/${cartItemId}`, 
        data, 
        { headers: { Authorization: `Bearer ${token}` } }
    ).then(() => {
        fetchCart();
    }).catch(err => console.error(err));
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    
    const orderData = new FormData();
    Object.keys(formData).forEach(key => orderData.append(key, formData[key]));
    orderData.append("payment_method", paymentMethod);

    axios.post("https://bookstore.eraasoft.pro/api/checkout", orderData, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
        alert("Order Placed Successfully!");
        window.dispatchEvent(new Event("storageUpdated")); 
        navigate("/order-history");
    })
    .catch((err) => {
        console.error(err);
        alert("Order failed. Please check your data.");
    });
  };

  const tax = 4.00;
  const total = cartTotal + tax;

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans pb-12">
      
      <div className="relative w-full h-64">
        <img src={headerBg} alt="Header" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white">
            <h1 className="text-4xl font-bold mb-2">Check out</h1>
            <div className="flex gap-2 text-sm text-gray-300">
                <Link to="/" className="hover:text-white">Home</Link> / 
                <Link to="/cart" className="hover:text-white">Cart</Link> / 
                <span className="text-[#F04C88]">Checkout</span>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <form onSubmit={handleConfirmOrder} className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-7/12 flex flex-col gap-6">
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#393280] text-lg mb-6">Shipping information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1 ml-1">Name</label>
                        <input name="name" onChange={handleChange} type="text" placeholder="John Smith" className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-[#F04C88]" required />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1 ml-1">Phone</label>
                        <input name="phone" onChange={handleChange} type="text" placeholder="123456789" className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-[#F04C88]" required />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1 ml-1">Email</label>
                        <input name="email" onChange={handleChange} type="email" placeholder="johnsmith@gmail.com" className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-[#F04C88]" required />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1 ml-1">City</label>
                        <input name="city" onChange={handleChange} type="text" placeholder="Maadi" className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-[#F04C88]" required />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1 ml-1">State</label>
                        <input name="state" onChange={handleChange} type="text" placeholder="Cairo" className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-[#F04C88]" required />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1 ml-1">Zip</label>
                        <input name="zip" onChange={handleChange} type="text" placeholder="11311" className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-[#F04C88]" required />
                    </div>
                </div>

                <div>
                    <label className="block text-xs text-gray-500 mb-1 ml-1">Address</label>
                    <input name="address" onChange={handleChange} type="text" placeholder="Maadi, Cairo, Egypt." className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-[#F04C88]" required />
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#393280] text-lg mb-6">Payment Method</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    
                    <label className={`flex-1 border rounded-md p-4 flex items-center gap-3 cursor-pointer transition ${paymentMethod === 'online' ? 'border-[#F04C88] bg-pink-50' : 'border-gray-200'}`}>
                        <input type="radio" name="payment" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} className="accent-[#F04C88]" />
                        <span className="text-sm font-medium text-gray-700">Online payment</span>
                    </label>

                    <label className={`flex-1 border rounded-md p-4 flex items-center gap-3 cursor-pointer transition ${paymentMethod === 'cod' ? 'border-[#F04C88] bg-pink-50' : 'border-gray-200'}`}>
                        <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-[#F04C88]" />
                        <span className="text-sm font-medium text-gray-700">Cash on delivery</span>
                    </label>

                    <label className={`flex-1 border rounded-md p-4 flex items-center gap-3 cursor-pointer transition ${paymentMethod === 'pos' ? 'border-[#F04C88] bg-pink-50' : 'border-gray-200'}`}>
                        <input type="radio" name="payment" value="pos" checked={paymentMethod === 'pos'} onChange={() => setPaymentMethod('pos')} className="accent-[#F04C88]" />
                        <span className="text-sm font-medium text-gray-700">POS on delivery</span>
                    </label>

                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#393280] text-lg mb-4">Note</h3>
                <textarea 
                    name="note"
                    onChange={handleChange}
                    placeholder="Add note" 
                    className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-[#F04C88] h-32 resize-none"
                ></textarea>
            </div>

          </div>

          <div className="w-full lg:w-5/12">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 sticky top-6">
                <h3 className="font-bold text-[#393280] text-lg mb-6">Order summary</h3>
                
                {loading ? <div className="text-center py-10">Loading Cart...</div> : (
                    <div className="flex flex-col gap-6 mb-8 max-h-96 overflow-y-auto pr-2">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="w-16 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <h4 className="font-bold text-[#393280] text-sm line-clamp-1">{item.title}</h4>
                                        <span className="text-xs text-gray-500">Author: {item.author}</span>
                                        <div className="text-xs text-gray-400 border border-gray-200 w-fit px-2 py-0.5 rounded mt-1">Free Shipping</div>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <span className="font-bold text-[#393280]">${item.price}</span>
                                        <div className="flex items-center gap-3">
                                            <button type="button" onClick={() => updateQuantity(item.id, item.qty - 1)} className="text-[#F04C88] bg-pink-50 rounded-full w-5 h-5 flex items-center justify-center text-[10px]"><FaMinus /></button>
                                            <span className="font-bold text-[#393280] text-sm">{item.qty}</span>
                                            <button type="button" onClick={() => updateQuantity(item.id, item.qty + 1)} className="text-[#F04C88] bg-pink-50 rounded-full w-5 h-5 flex items-center justify-center text-[10px]"><FaPlus /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mb-6">
                    <label className="text-xs text-gray-500 mb-2 block">Have a discount code?</label>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Enter Promo Code" className="border border-gray-200 rounded-md px-4 py-2.5 w-full text-sm outline-none focus:border-[#F04C88]" />
                        <button type="button" className="bg-[#393280] text-white px-6 py-2.5 rounded-md text-sm font-bold hover:bg-[#2a2455] transition">Apply</button>
                    </div>
                </div>

                <div className="space-y-3 mb-6 border-t border-gray-100 pt-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-bold text-[#393280]">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Tax</span>
                        <span className="font-bold text-[#393280]">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Shipping</span>
                        <span className="font-bold text-[#393280]">Free</span>
                    </div>
                    <div className="flex justify-between text-lg border-t border-gray-100 pt-3">
                        <span className="text-gray-500">Total (USD)</span>
                        <span className="font-bold text-[#F04C88]">${total.toFixed(2)}</span>
                    </div>
                </div>

                <button type="submit" className="w-full bg-[#F04C88] text-white py-3 rounded-md font-bold hover:bg-[#d63d76] transition shadow-md">
                    Confirm order
                </button>

            </div>
          </div>

        </form>
      </div>
    </div>
  );
}