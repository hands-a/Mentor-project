import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  FaStar, FaHeart, FaShoppingCart, FaFacebookF, FaTwitter, FaWhatsapp, 
  FaShareAlt, FaInstagram, FaCheck, FaMinus, FaPlus, FaChevronLeft, FaChevronRight 
} from "react-icons/fa";
import headerBg from "../assets/background.jpg"; 

import book1 from "../assets/1.jpg";    
import book2 from "../assets/2.jpg";
import book3 from "../assets/3.jpg";
import book4 from "../assets/4.jpg";

const booksData = [
  {
    id: 1,
    title: "Rich Dad And Poor Dad",
    author: "Robert T. Kiyosaki",
    price: 40.00,
    rating: 4.2,
    reviews: 210,
    year: 1997,
    category: "Business",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
    discountCode: "Nx212",
    image: book1,
    pages: 336,
    language: "English",
    sku: "B09TWSRMCB",
    stock: "In Stock"
  },
  {
    id: 2,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: 35.00,
    rating: 4.8,
    reviews: 500,
    year: 1937,
    category: "Self Help",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
    discountCode: "Nx212",
    image: book2,
    pages: 280,
    language: "English",
    sku: "TGR1937NH",
    stock: "In Stock"
  },
  {
    id: 3,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 42.00,
    rating: 4.7,
    reviews: 320,
    year: 2020,
    category: "Business",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
    discountCode: "Nx212",
    image: book3,
    pages: 250,
    language: "English",
    sku: "POM2020MH",
    stock: "In Stock"
  },
  {
    id: 4,
    title: "Atomic Habits",
    author: "James Clear",
    price: 25.00,
    rating: 4.9,
    reviews: 1200,
    year: 2018,
    category: "Self Help",
    desc: "An easy & proven way to build good habits & break bad ones.",
    discountCode: "Habit20",
    image: book4,
    pages: 320,
    language: "English",
    sku: "AH2018JC",
    stock: "Out of Stock"
  },
];

export default function BookDetailsPage() {
  const { id } = useParams();
  const product = booksData.find((b) => b.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setCart(savedCart);
    setWishlist(savedWishlist);
  }, []);

  const updateStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event("storageUpdated"));
  };

  if (!product) {
    return <div className="text-center py-20 text-2xl font-bold text-gray-500">Book Not Found!</div>;
  }

  const handleAddToCart = (item) => {
    const targetId = item ? item.id : product.id;
    let newCart;

    if (cart.includes(targetId)) {
      newCart = cart.filter(cartId => cartId !== targetId);
    } else {
      newCart = [...cart, targetId];
    }
    
    setCart(newCart);
    updateStorage("cart", newCart);
  };

  const handleToggleWishlist = () => {
    let newWishlist;
    if (wishlist.includes(product.id)) {
      newWishlist = wishlist.filter(item => item !== product.id);
    } else {
      newWishlist = [...wishlist, product.id];
    }
    setWishlist(newWishlist);
    updateStorage("wishlist", newWishlist);
  };

  const incrementQty = () => setQuantity(prev => prev + 1);
  const decrementQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const isAddedToCart = cart.includes(product.id);
  const isAddedToWishlist = wishlist.includes(product.id);

  const recommendedBooks = booksData.filter(b => b.id !== product.id).slice(0, 2);

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans pb-12">
      
      <div className="relative w-full h-64">
        <img src={headerBg} alt="Header" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white">
            <h1 className="text-4xl font-bold mb-2">Product Details</h1>
            <div className="flex gap-2 text-sm text-gray-300">
                <Link to="/" className="hover:text-white">Home</Link> / 
                <Link to="/books" className="hover:text-white">Books</Link> / 
                <span className="text-[#F04C88] line-clamp-1">{product.title}</span>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className="w-full h-[500px] bg-gray-100 border border-gray-200 p-8 flex items-center justify-center rounded-sm">
                <img src={product.image} alt="Cover" className="max-h-full shadow-xl" />
            </div>
            <div className="flex gap-4 overflow-x-auto">
                {[1, 2, 3].map((item) => (
                    <div key={item} className={`w-24 h-32 border p-2 cursor-pointer ${item === 1 ? 'border-[#F04C88]' : 'border-gray-200'}`}>
                        <img src={product.image} alt="Thumb" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-3xl font-bold text-[#393280]">{product.title}</h2>
                <div className="flex items-center gap-3 text-gray-400">
                    <FaFacebookF className="hover:text-[#3b5998] cursor-pointer" />
                    <FaInstagram className="hover:text-[#E1306C] cursor-pointer" />
                    <FaTwitter className="hover:text-[#1DA1F2] cursor-pointer" />
                    <FaWhatsapp className="hover:text-[#25D366] cursor-pointer" />
                    <FaShareAlt className="cursor-pointer" />
                </div>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {product.desc}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                <div>
                    <span className="text-gray-400 block text-xs mb-1">Author</span>
                    <span className="font-bold text-[#393280]">{product.author}</span>
                </div>
                <div>
                    <span className="text-gray-400 block text-xs mb-1">Publication Year</span>
                    <span className="font-bold text-[#393280]">{product.year}</span>
                </div>
                <div>
                    <span className="text-gray-400 block text-xs mb-1">Book / Pages</span>
                    <span className="font-bold text-[#393280]">1 Of 1 / {product.pages}</span>
                </div>
                <div>
                    <span className="text-gray-400 block text-xs mb-1">Language</span>
                    <span className="font-bold text-[#393280]">{product.language}</span>
                </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1">
                    <div className="flex text-[#FFD700]">
                        {[...Array(5)].map((_, i) => (
                           <FaStar key={i} className={i < Math.floor(product.rating) ? "text-[#FFD700]" : "text-gray-300"} />
                        ))}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">({product.reviews} Review)</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <span className="bg-[#E6F8F3] text-[#00BFA6] text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                    <FaCheck size={10} /> {product.stock}
                </span>
                <span className="border border-gray-200 text-gray-500 text-xs px-3 py-1 rounded-full">Free Shipping Today</span>
                <span className="border border-[#F04C88] text-[#F04C88] text-xs px-3 py-1 rounded-full bg-white">Discount code: {product.discountCode}</span>
            </div>

            <div className="flex items-baseline gap-3 mb-8">
                <span className="text-4xl font-bold text-[#393280]">${product.price.toFixed(2)}</span>
                <span className="text-xl text-gray-400 line-through">${(product.price + 10).toFixed(2)}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-12">
                <div className="flex items-center border border-[#F04C88] rounded-full px-4 py-2 gap-4">
                    <button onClick={decrementQty} className="text-[#F04C88] hover:bg-pink-50 rounded-full p-1"><FaMinus size={12} /></button>
                    <span className="text-[#393280] font-bold w-4 text-center">{quantity}</span>
                    <button onClick={incrementQty} className="text-[#F04C88] hover:bg-pink-50 rounded-full p-1"><FaPlus size={12} /></button>
                </div>

                <button 
                    onClick={() => handleAddToCart()}
                    className={`flex-1 px-8 py-3 rounded-md font-bold text-white flex items-center justify-center gap-2 transition shadow-md
                    bg-[#F04C88] hover:bg-[#d63d76]"}`}
                >
                    {isAddedToCart ? <>Added to Cart <FaCheck /></> : <>Add To Cart <FaShoppingCart /></>}
                </button>

                <button 
                    onClick={handleToggleWishlist}
                    className={`w-12 h-12 border rounded-md flex items-center justify-center transition
                    ${isAddedToWishlist 
                        ? "bg-[#F04C88] border-[#F04C88] text-white" 
                        : "border-[#F04C88] text-[#F04C88] hover:bg-pink-50"
                    }`}
                >
                    <FaHeart />
                </button>
            </div>

          </div>
        </div>

        <div className="mt-16">
            <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
                <button 
                    onClick={() => setActiveTab("details")}
                    className={`pb-4 text-lg font-bold transition whitespace-nowrap
                    ${activeTab === "details" ? "text-[#393280] border-b-2 border-[#393280]" : "text-gray-400 hover:text-gray-600"}`}
                >
                    Product Details
                </button>
                <button 
                    onClick={() => setActiveTab("customer")}
                    className={`pb-4 text-lg font-bold transition whitespace-nowrap
                    ${activeTab === "customer" ? "text-[#393280] border-b-2 border-[#393280]" : "text-gray-400 hover:text-gray-600"}`}
                >
                    Customer Reviews
                </button>
                <button 
                    onClick={() => setActiveTab("recommended")}
                    className={`pb-4 text-lg font-bold transition whitespace-nowrap
                    ${activeTab === "recommended" ? "text-[#393280] border-b-2 border-[#393280]" : "text-gray-400 hover:text-gray-600"}`}
                >
                    Recommended For You
                </button>
            </div>

            <div className="bg-[#F8F8F8] p-8 rounded-xl border border-gray-100 min-h-[300px]">
                
                {activeTab === "details" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-sm">
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-bold text-[#393280]">Book Title :</span>
                            <span className="text-gray-600">{product.title}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-bold text-[#393280]">Author :</span>
                            <span className="text-gray-600">{product.author}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-bold text-[#393280]">Publication Date :</span>
                            <span className="text-gray-600">{product.year}</span>
                        </div>
                         <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-bold text-[#393280]">Publisher :</span>
                            <span className="text-gray-600">Printer</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-bold text-[#393280]">ASIN :</span>
                            <span className="text-gray-600">{product.sku}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-bold text-[#393280]">Pages :</span>
                            <span className="text-gray-600">{product.pages}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-bold text-[#393280]">Language :</span>
                            <span className="text-gray-600">{product.language}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-bold text-[#393280]">Book Format :</span>
                            <span className="text-gray-600">Hard Cover</span>
                        </div>
                    </div>
                )}

                {activeTab === "customer" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                    <img src="https://i.pravatar.cc/150?img=11" alt="User" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#393280] text-sm">John Smith</h4>
                                    <span className="text-xs text-[#00BFA6] font-medium">Verified Purchase</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold text-sm">Excellent Book</span>
                                <div className="flex text-[#FFD700] text-xs">
                                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                                </div>
                            </div>
                            <p className="text-gray-500 text-xs leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                             <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                    <img src="https://i.pravatar.cc/150?img=12" alt="User" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#393280] text-sm">Sarah Jones</h4>
                                    <span className="text-xs text-[#00BFA6] font-medium">Verified Purchase</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold text-sm">Great Read</span>
                                <div className="flex text-[#FFD700] text-xs">
                                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                                </div>
                            </div>
                            <p className="text-gray-500 text-xs leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                    <img src="https://i.pravatar.cc/150?img=13" alt="User" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#393280] text-sm">Mike Ross</h4>
                                    <span className="text-xs text-[#00BFA6] font-medium">Verified Purchase</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold text-sm">Highly Recommended</span>
                                <div className="flex text-[#FFD700] text-xs">
                                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                                </div>
                            </div>
                            <p className="text-gray-500 text-xs leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                             <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                    <img src="https://i.pravatar.cc/150?img=14" alt="User" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#393280] text-sm">Emily Clark</h4>
                                    <span className="text-xs text-[#00BFA6] font-medium">Verified Purchase</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold text-sm">Loved it!</span>
                                <div className="flex text-[#FFD700] text-xs">
                                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                                </div>
                            </div>
                            <p className="text-gray-500 text-xs leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut.
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === "recommended" && (
                     <div className="flex justify-center items-center gap-8 relative px-12">
                        <button className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#F04C88] text-[#F04C88] flex items-center justify-center hover:bg-[#F04C88] hover:text-white transition">
                            <FaChevronLeft size={12} />
                        </button>

                        {recommendedBooks.map((book) => (
                            <div key={book.id} className="bg-[#393280] rounded-xl p-6 flex items-center gap-6 w-[400px] text-white relative overflow-hidden group">
                                <div className="w-24 h-36 flex-shrink-0 shadow-lg">
                                    <img src={book.image} alt={book.title} className="w-full h-full object-cover rounded-sm" />
                                </div>
                                
                                <div className="flex-1 z-10">
                                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{book.title}</h3>
                                    <p className="text-xs text-gray-300 mb-2">{book.author}</p>
                                    
                                    <div className="flex items-center gap-1 text-yellow-400 text-xs mb-3">
                                        {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                                        <span className="text-gray-300 ml-1">({book.reviews})</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-xl">${book.price}</span>
                                        <span className="text-sm text-gray-400 line-through">${book.price + 10}</span>
                                    </div>
                                    
                                    <button 
                                        onClick={() => handleAddToCart(book)}
                                        className={`mt-4 w-8 h-8 rounded-full flex items-center justify-center transition absolute bottom-4 right-4
                                        ${cart.includes(book.id) 
                                            ? "bg-green-600 text-white" 
                                            : "bg-[#F04C88] hover:bg-white hover:text-[#F04C88]"
                                        }`}
                                    >
                                        {cart.includes(book.id) ? <FaCheck size={12} /> : <FaShoppingCart size={12} />}
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#F04C88] text-[#F04C88] flex items-center justify-center hover:bg-[#F04C88] hover:text-white transition">
                            <FaChevronRight size={12} />
                        </button>
                     </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}