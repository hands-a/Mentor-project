import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt, FaArrowRight, FaCheck } from "react-icons/fa";
import headerBg from "../assets/background.jpg"; 

const tabs = ["All", "Processing", "Delivered", "Canceled"];

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) { navigate("/login"); return; }

    setLoading(true);
    axios.get("https://bookstore.eraasoft.pro/api/order", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const data = res.data.data || [];
      const mappedOrders = data.map(order => ({
        id: order.id,
        orderNo: order.uuid || `#${order.id}`,
        status: order.status, 
        date: order.order_date,
        total: order.total,
        address: order.address,
        step: order.status === "Delivered" ? 3 : order.status === "Processing" ? 2 : 1 
      }));
      setOrders(mappedOrders);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const filteredOrders = orders.filter(order => {
    if (activeTab === "All") return true;
    return order.status === activeTab;
  });

  const handleDeleteOrder = (id) => {
    if(!window.confirm("Are you sure you want to delete this order?")) return;
    
    const token = localStorage.getItem("userToken");
    
    // Note: The API might not support deleting orders directly. 
    // This is a placeholder for the logic if supported.
    // For now, we'll just filter it from the UI.
    const updatedOrders = orders.filter(o => o.id !== id);
    setOrders(updatedOrders);
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading Orders...</div>;

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans pb-12">
      
      <div className="relative w-full h-64">
        <img src={headerBg} alt="Header" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white">
            <h1 className="text-4xl font-bold mb-2">Order History</h1>
            <div className="flex gap-2 text-sm text-gray-300">
                <Link to="/" className="hover:text-white">Home</Link> / 
                <span className="text-[#F04C88]">Order History</span>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        
        <div className="flex flex-wrap gap-4 mb-8">
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-md text-sm font-bold transition border
                    ${activeTab === tab 
                        ? "bg-[#F04C88] text-white border-[#F04C88]" 
                        : "bg-white text-gray-500 border-gray-200 hover:border-[#F04C88] hover:text-[#F04C88]"
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>

        <div className="flex flex-col gap-6">
            {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                    <div key={order.id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative group">
                        
                        {order.status === "Processing" && (
                            <button 
                                onClick={() => handleDeleteOrder(order.id)}
                                className="absolute top-6 right-6 text-[#F04C88] bg-pink-50 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F04C88] hover:text-white transition"
                            >
                                <FaTrashAlt size={12} />
                            </button>
                        )}

                        <div className="flex flex-col gap-4 mb-8 w-full md:w-3/4">
                            <div className="flex">
                                <span className="w-32 text-gray-400 text-sm">Order No.</span>
                                <span className="font-bold text-[#393280] text-sm">{order.orderNo}</span>
                            </div>
                            <div className="flex">
                                <span className="w-32 text-gray-400 text-sm">Status</span>
                                <span className={`font-bold text-sm ${
                                    order.status === 'Delivered' ? 'text-green-600' : 
                                    order.status === 'Canceled' ? 'text-red-500' : 'text-[#393280]'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="flex">
                                <span className="w-32 text-gray-400 text-sm">Date</span>
                                <span className="font-bold text-[#393280] text-sm">{order.date}</span>
                            </div>
                            <div className="flex">
                                <span className="w-32 text-gray-400 text-sm">Address</span>
                                <span className="font-bold text-[#393280] text-sm">{order.address || "N/A"}</span>
                            </div>
                             <div className="flex">
                                <span className="w-32 text-gray-400 text-sm">Total</span>
                                <span className="font-bold text-[#393280] text-sm">${order.total}</span>
                            </div>
                        </div>

                        {order.status !== "Canceled" ? (
                            <div className="relative flex justify-between items-center mt-10 px-2 md:px-8">
                                <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
                                
                                <div className="absolute top-4 left-0 h-1 bg-[#F04C88] -z-0 rounded-full transition-all duration-500"
                                     style={{ width: order.step === 1 ? '0%' : order.step === 2 ? '50%' : '100%' }}>
                                </div>

                                {[
                                    { id: 1, label: "Order placed" }, 
                                    { id: 2, label: "Processing" }, 
                                    { id: 3, label: "Delivered" }
                                ].map((step) => {
                                    const isCompleted = order.step >= step.id;
                                    return (
                                        <div key={step.id} className="flex flex-col items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 transition border-2
                                                ${isCompleted 
                                                    ? "bg-[#F04C88] border-[#F04C88] text-white" 
                                                    : "bg-[#e0e0e0] border-[#e0e0e0] text-white"
                                                }`}
                                            >
                                                <FaCheck />
                                            </div>
                                            <span className={`text-xs font-bold ${isCompleted ? "text-[#F04C88]" : "text-gray-400"}`}>
                                                {step.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-start">
                                <Link 
                                    to={`/order-history/${order.id}`} 
                                    className="text-[#F04C88] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                                >
                                    View order detail <FaArrowRight size={12} />
                                </Link>
                            </div>
                        )}

                    </div>
                ))
            ) : (
                <div className="text-center py-20 text-gray-500">No orders found.</div>
            )}
        </div>

      </div>
    </div>
  );
}