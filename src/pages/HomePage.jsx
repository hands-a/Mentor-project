import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaMicrophone, FaStar, FaShoppingCart, FaRegHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdLocalShipping, MdPayment, MdAssignmentReturn, MdHeadsetMic } from "react-icons/md";
import background from "../assets/background.jpg";
import bookPlaceholder from "../assets/1.jpg";

export default function HomePage() {
  const navigate = useNavigate();
  const [sliderBooks, setSliderBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axios.get("https://bookstore.eraasoft.pro/api/home")
      .then((res) => {
        const data = res.data.data;
        
        const mapBooks = (items) => (items || []).map(item => ({
            id: item.bookId,
            title: item.bookName,
            author: item.author,
            price: parseFloat(item.price) || 0,
            image: item.image || bookPlaceholder,
            rating: item.rating || 5
        }));

        setSliderBooks(mapBooks(data.slider));
        setLatestBooks(mapBooks(data.latest));
        setRecommendedBooks(mapBooks(data.recommended)); 
      })
      .catch((err) => console.error(err));
  }, []);

  const addToCartHandler = (bookId) => {
    const token = localStorage.getItem("userToken");
    if (!token) { navigate("/login"); return; }
    
    const formData = new FormData();
    formData.append("qty", 1);

    axios.post(`https://bookstore.eraasoft.pro/api/cart/store/${bookId}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      window.dispatchEvent(new Event("storageUpdated"));
      alert("Added to Cart Successfully");
    }).catch((err) => {
      console.error(err);
      alert("Failed to add to cart");
    });
  };

  const addToWishlistHandler = (bookId) => {
    const token = localStorage.getItem("userToken");
    if (!token) { navigate("/login"); return; }

    axios.post(`https://bookstore.eraasoft.pro/api/wishlist/store/${bookId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      window.dispatchEvent(new Event("storageUpdated"));
      alert("Added to Wishlist Successfully");
    }).catch((err) => {
      console.error(err);
      alert("Failed to add to wishlist");
    });
  };

  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? (sliderBooks.length || 1) - 1 : prev - 1));
  const nextSlide = () => setCurrentSlide(prev => (prev === (sliderBooks.length || 1) - 1 ? 0 : prev + 1));

  return (
    <div className="flex flex-col font-sans overflow-x-hidden">
      
      <div className="relative w-full h-screen">
        <img src={background} alt="Hero" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-3xl bg-white rounded-full shadow-xl flex items-center h-16 overflow-hidden">
            <input type="text" placeholder="Search for books..." className="flex-1 h-full px-6 outline-none text-gray-700 bg-transparent" />
            <div className="px-4 text-gray-400"><FaMicrophone size={20} /></div>
            <button className="bg-[#D9176C] text-white w-20 h-full flex justify-center items-center"><FaSearch size={22} /></button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3"><MdLocalShipping size={40} className="text-[#2E2548]" /><h3 className="font-bold text-[#2E2548]">Fast Delivery</h3><p className="text-sm text-gray-500">Shipping in 24 hours.</p></div>
          <div className="flex flex-col gap-3"><MdPayment size={40} className="text-[#2E2548]" /><h3 className="font-bold text-[#2E2548]">Secure Payment</h3><p className="text-sm text-gray-500">100% Secure Transaction.</p></div>
          <div className="flex flex-col gap-3"><MdAssignmentReturn size={40} className="text-[#2E2548]" /><h3 className="font-bold text-[#2E2548]">Easy Returns</h3><p className="text-sm text-gray-500">10 days return policy.</p></div>
          <div className="flex flex-col gap-3"><MdHeadsetMic size={40} className="text-[#2E2548]" /><h3 className="font-bold text-[#2E2548]">24/7 Support</h3><p className="text-sm text-gray-500">Call us anytime.</p></div>
        </div>
      </div>

      <div className="w-full bg-[#2E2548] py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Best Seller</h2>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
             {(latestBooks.length > 0 ? latestBooks : [1,2,3,4,5,6]).slice(0, 6).map((book, i) => (
                <div key={book.id || i} onClick={() => navigate(`/books/${book.id}`)} className="w-36 h-56 bg-white rounded-md border border-white/10 overflow-hidden shadow-lg transform hover:scale-105 transition cursor-pointer">
                   <img src={book.image || bookPlaceholder} alt="book" className="w-full h-full object-cover" />
                </div>
             ))}
          </div>
          <button onClick={() => navigate("/books")} className="bg-[#F04C88] text-white px-10 py-3 rounded-md font-bold hover:bg-[#d63d76] transition">Shop Now</button>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-20">
         <h2 className="text-2xl font-bold text-[#2E2548] mb-8">Recommended For You</h2>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(recommendedBooks.length > 0 ? recommendedBooks : [1,2]).slice(0, 2).map((book, i) => (
                <div key={book.id || i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-40 h-60 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden cursor-pointer" onClick={() => navigate(`/books/${book.id}`)}>
                        <img src={book.image || bookPlaceholder} alt="book" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                            <h3 className="text-xl font-bold text-[#2E2548] cursor-pointer" onClick={() => navigate(`/books/${book.id}`)}>{book.title || "Rich Dad Poor Dad"}</h3>
                            <p className="text-sm text-gray-500 mb-3">Author: <span className="text-black">{book.author || "Robert Kiyosaki"}</span></p>
                            <div className="flex items-center gap-1 text-yellow-400 text-sm mb-2"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar className="text-gray-300" /></div>
                            <div className="text-2xl font-bold text-[#2E2548]">${book.price || "50.00"}</div>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button onClick={() => addToCartHandler(book.id || 1)} className="flex-1 bg-[#F04C88] text-white py-2.5 rounded-md font-bold hover:bg-[#d63d76] flex items-center justify-center gap-2 text-sm">
                                <FaShoppingCart /> Add To Cart
                            </button>
                            <button onClick={() => addToWishlistHandler(book.id || 1)} className="px-3 py-2 border border-gray-300 rounded-md text-[#F04C88] hover:bg-red-50 transition">
                                <FaRegHeart size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
         </div>
      </div>

      <div className="w-full bg-gray-50 py-16">
          <div className="container mx-auto px-6 md:px-12 flex flex-col gap-10">
            <div className="flex justify-between items-center">
                <h2 className="text-4xl font-bold text-[#2E2548]">Flash Sale</h2>
                <div className="text-[#F04C88] font-bold border-2 border-[#F04C88] rounded-full px-4 py-2">30:00:00</div>
            </div>
            <div className="relative w-full flex items-center justify-center">
                <button onClick={prevSlide} className="absolute left-0 z-10 bg-white text-[#2E2548] w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-[#F04C88] hover:text-white transition -ml-6"><FaChevronLeft size={20} /></button>
                <div className="w-full overflow-hidden py-4">
                  <div className="flex transition-transform duration-500 gap-6" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                      {(sliderBooks.length > 0 ? sliderBooks : [1,2]).map((book, i) => (
                        <div key={book.id || i} className="min-w-full md:min-w-[calc(50%-12px)] flex-shrink-0">
                            <div className="bg-[#2E2548] p-5 rounded-xl flex gap-5 text-white shadow-xl h-full group text-left">
                              <div className="w-32 h-48 bg-gray-500 rounded-md flex-shrink-0 overflow-hidden cursor-pointer" onClick={() => navigate(`/books/${book.id}`)}>
                                  <img src={book.image || bookPlaceholder} alt="book" className="w-full h-full object-cover transition group-hover:scale-110" />
                              </div>
                              <div className="flex-1 flex flex-col justify-center">
                                    <h3 className="font-bold text-lg mb-1 cursor-pointer" onClick={() => navigate(`/books/${book.id}`)}>{book.title || "The Psychology of Money"}</h3>
                                    <p className="text-xs text-gray-300 mb-2">Author: {book.author || "Morgan Housel"}</p>
                                    <div className="text-xl font-bold mb-4">${book.price || "40.00"}</div>
                                    <div className="flex justify-end"><button onClick={() => addToCartHandler(book.id || 1)} className="bg-[#F04C88] w-10 h-10 rounded-lg flex items-center justify-center text-white hover:bg-[#d63d76]"><FaShoppingCart size={18} /></button></div>
                              </div>
                            </div>
                        </div>
                      ))}
                  </div>
                </div>
                <button onClick={nextSlide} className="absolute right-0 z-10 bg-white text-[#2E2548] w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-[#F04C88] hover:text-white transition -mr-6"><FaChevronRight size={20} /></button>
            </div>
          </div>
      </div>
    </div>
  );
}