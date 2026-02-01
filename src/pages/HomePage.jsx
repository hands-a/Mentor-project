import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FaSearch, FaMicrophone, FaStar, FaShoppingCart, FaRegHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdLocalShipping, MdPayment, MdAssignmentReturn, MdHeadsetMic } from "react-icons/md";
import background from "../assets/background.jpg";
import book1 from "../assets/1.jpg";
import book2 from "../assets/2.jpg";
import book3 from "../assets/3.jpg";
import book4 from "../assets/4.jpg";
import book5 from "../assets/5.jpg";
import book6 from "../assets/6.png";

const flashSaleBooks = [
  {
    id: 1,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    price: "$30.00",
    oldPrice: "$45.00",
    booksLeft: 4,
    rating: 180,
    image: book1,
  },
  {
    id: 2,
    title: "Thinking Fast and Slow",
    author: "Daniel Kahneman",
    price: "$30.00",
    oldPrice: "$55.00",
    booksLeft: 2,
    rating: 210,
    image: book2,
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    price: "$20.00",
    oldPrice: "$35.00",
    booksLeft: 10,
    rating: 500,
    image: book3,
  },
  {
    id: 4,
    title: "The Power of Habit",
    author: "Charles Duhigg",
    price: "$15.00",
    oldPrice: "$28.00",
    booksLeft: 5,
    rating: 120,
    image: book4,
  },
];

const bestSellerImages = [book1, book2, book3, book4, book5, book6];

export default function HomePage() {
  
  const { addToCart, addToWishlist } = useOutletContext();
  
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(flashSaleBooks.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide === flashSaleBooks.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className="flex flex-col font-sans">
      
      <div className="relative w-full h-screen">
        <img
          src={background}
          alt="Homepage Background"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-3xl bg-white rounded-full shadow-xl flex items-center overflow-hidden h-16">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 h-full px-6 outline-none text-gray-700 text-lg placeholder-gray-400 bg-transparent"
            />
            <div className="px-4 text-gray-400 cursor-pointer hover:text-gray-600">
              <FaMicrophone size={20} />
            </div>
            <button className="bg-[#D9176C] hover:bg-[#c21560] text-white w-20 h-full flex justify-center items-center transition-all duration-300 cursor-pointer">
              <FaSearch size={22} />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3">
              <MdLocalShipping size={40} className="text-[#2E2548]" />
              <h3 className="font-bold text-lg text-[#2E2548]">Fast & Reliable Shipping</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="flex flex-col gap-3">
              <MdPayment size={40} className="text-[#2E2548]" />
              <h3 className="font-bold text-lg text-[#2E2548]">Secure Payment</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="flex flex-col gap-3">
              <MdAssignmentReturn size={40} className="text-[#2E2548]" />
              <h3 className="font-bold text-lg text-[#2E2548]">Easy Returns</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="flex flex-col gap-3">
              <MdHeadsetMic size={40} className="text-[#2E2548]" />
              <h3 className="font-bold text-lg text-[#2E2548]">24/7 Customer Support</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#2E2548] py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Best Seller</h2>
          <p className="text-gray-300 mb-12 max-w-2xl mx-auto text-sm">
            Lorem ipsum dolor sit amet.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
             {bestSellerImages.map((imgSrc, index) => (
                <div key={index} className="w-36 h-56 bg-white rounded-md border border-white/10 flex items-center justify-center overflow-hidden relative shadow-lg transform hover:scale-105 transition duration-300">
                   <img src={imgSrc} alt={`Book ${index + 1}`} className="w-full h-full object-cover" />
                </div>
             ))}
          </div>
          <button className="bg-[#F04C88] text-white px-10 py-3 rounded-md font-bold hover:bg-[#d63d76] transition shadow-lg">
             Shop now
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-20">
         <h2 className="text-2xl font-bold text-[#2E2548] mb-8">Recomended For You</h2>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6">
               <div className="w-full sm:w-40 h-60 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                  <img src={book1} alt="Rich Dad Poor Dad" className="w-full h-full object-cover" />
               </div>
               <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#2E2548]">Rich Dad Poor Dad</h3>
                    <p className="text-sm text-gray-500 font-medium mb-3">Author: <span className="text-black">Robert T. Kiyosaki</span></p>
                    <div className="flex items-center gap-1 text-yellow-400 text-sm mb-2">
                       <FaStar /><FaStar /><FaStar /><FaStar /><FaStar className="text-gray-300" />
                       <span className="text-gray-400 text-xs ml-2">(120 Review)</span>
                    </div>
                    <div className="text-2xl font-bold text-[#2E2548]">$30.00</div>
                  </div>
                  <div className="flex gap-3 mt-4">
                      <button onClick={() => addToCart()} className="flex-1 bg-[#F04C88] text-white py-2.5 rounded-md font-bold hover:bg-[#d63d76] transition flex items-center justify-center gap-2 text-sm">
                        <FaShoppingCart /> Add To Cart
                      </button>
                      <button onClick={() => addToWishlist()} className="px-3 py-2 border border-gray-300 rounded-md text-[#F04C88] hover:bg-red-50 transition">
                        <FaRegHeart size={20} />
                      </button>
                  </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-40 h-60 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                  <img src={book5} alt="The Design of Books" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#2E2548]">The Design of Books</h3>
                    <p className="text-sm text-gray-500 font-medium mb-3">Author: <span className="text-black">Debbie Berne</span></p>
                    <div className="flex items-center gap-1 text-yellow-400 text-sm mb-2">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar className="text-gray-300" />
                        <span className="text-gray-400 text-xs ml-2">(210 Review)</span>
                    </div>
                    <div className="text-2xl font-bold text-[#2E2548]">$40.00</div>
                  </div>
                  <div className="flex gap-3 mt-4">
                      <button onClick={() => addToCart()} className="flex-1 bg-[#F04C88] text-white py-2.5 rounded-md font-bold hover:bg-[#d63d76] transition flex items-center justify-center gap-2 text-sm">
                        <FaShoppingCart /> Add To Cart
                      </button>
                      <button onClick={() => addToWishlist()} className="px-3 py-2 border border-gray-300 rounded-md text-[#F04C88] hover:bg-red-50 transition">
                        <FaRegHeart size={20} />
                      </button>
                  </div>
                </div>
            </div>
          </div>
      </div>

      <div className="w-full bg-gray-50 py-16">
          <div className="container mx-auto px-6 md:px-12 flex flex-col gap-10">
            
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="max-w-xl">
                    <h2 className="text-4xl font-bold text-[#2E2548] mb-4">Flash Sale</h2>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    
                    <div className="relative w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-md">
                      <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-[#F04C88]  "></div>
                      <span className="text-[#2E2548] font-bold text-sm z-10">30:00:00</span>
                    </div>
                </div>
            </div>

            <div className="relative w-full flex items-center justify-center">
                
                <button 
                  onClick={prevSlide}
                  className="absolute left-0 z-10 bg-white text-[#2E2548] w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-[#F04C88] hover:text-white transition-all transform hover:scale-110 cursor-pointer -ml-4 md:-ml-6"
                >
                  <FaChevronLeft size={20} />
                </button>

                <div className="w-full overflow-hidden py-4 px-2">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out gap-6"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                      {flashSaleBooks.map((book) => (
                        <div key={book.id} className="min-w-full md:min-w-[calc(50%-12px)] flex-shrink-0">
                            
                            <div className="bg-[#2E2548] p-5 rounded-xl flex gap-5 text-white shadow-xl relative overflow-hidden h-full group">
                              <div className="absolute top-4 right-4 w-10 h-10 bg-[#FFC107] rounded-full flex flex-col items-center justify-center text-[#2E2548] text-[8px] font-bold leading-tight z-10 shadow-sm">
                                  <span>BEST</span><span>SELLER</span>
                              </div>

                              <div className="w-32 h-48 bg-gray-500 rounded-md flex-shrink-0 overflow-hidden relative">
                                  {book.image ? (
                                    <img src={book.image} alt={book.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs bg-gray-600">
                                        No Image
                                    </div>
                                  )}
                              </div>

                              <div className="flex-1 flex flex-col justify-center">
                                    <h3 className="font-bold text-lg mb-1 leading-tight">{book.title}</h3>
                                    <p className="text-xs text-gray-300 mb-2">Author: {book.author}</p>
                                
                                  <div className="flex items-center gap-1 text-[#FFC107] text-xs mb-3">
                                    {[...Array(5)].map((_, i) => (
                                      <FaStar key={i} className={i < 4 ? "" : "text-gray-500"} />
                                    ))}
                                    <span className="text-gray-400 ml-1">({book.rating} Review)</span>
                                  </div>

                                  <div className="flex items-center gap-3 mb-2">
                                      <span className="text-gray-400 line-through text-xs">{book.oldPrice}</span>
                                      <span className="text-xl font-bold">{book.price}</span>
                                  </div>

                                  <div className="w-full mb-1">
                                    <div className="w-full h-1.5 bg-gray-600 rounded-full overflow-hidden">
                                        <div 
                                          className="h-full bg-[#FFC107] rounded-full" 
                                          style={{ width: `${(book.booksLeft / 10) * 100}%` }}
                                        ></div>
                                    </div>
                                  </div>
                                  <p className="text-[10px] text-gray-300 mb-3">{book.booksLeft} books left</p>

                                  <div className="flex justify-end">
                                    <button onClick={() => addToCart()} className="bg-[#F04C88] w-10 h-10 rounded-lg flex items-center justify-center text-white hover:bg-[#d63d76] transition shadow-md hover:shadow-lg transform active:scale-95">
                                        <FaShoppingCart size={18} />
                                    </button>
                                  </div>
                              </div>
                            </div>
                        </div>
                      ))}
                  </div>
                </div>
                <button 
                  onClick={nextSlide}
                  className="absolute right-0 z-10 bg-white text-[#2E2548] w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-[#F04C88] hover:text-white transition-all transform hover:scale-110 cursor-pointer -mr-4 md:-mr-6"
                  >
                  <FaChevronRight size={20} />
                </button>
            </div>
          </div>
      </div>
    </div>
  );
}