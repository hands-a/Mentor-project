import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaFilter, FaSearch, FaMicrophone, FaStar, FaShoppingCart, FaHeart, 
  FaChevronDown, FaChevronRight, FaChevronLeft, FaCheck 
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
  },
];

const categoriesList = [
  { name: "Business", count: 140 },
  { name: "Self Help", count: 163 },
  { name: "History", count: 204 },
  { name: "Art", count: 102 },
];

const tabs = ["All", "Business", "Self Help", "History", "Fantasy", "Art"];

export default function BooksPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setCart(savedCart);
    setWishlist(savedWishlist);
  }, []);

  const handleAddToCart = (id) => {
    let newCart;
    if (cart.includes(id)) {
      newCart = cart.filter(item => item !== id);
    } else {
      newCart = [...cart, id];
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("storageUpdated"));
  };

  const handleAddToWishlist = (id) => {
    let newWishlist;
    if (wishlist.includes(id)) {
      newWishlist = wishlist.filter(item => item !== id);
    } else {
      newWishlist = [...wishlist, id];
    }
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    window.dispatchEvent(new Event("storageUpdated"));
  };

  const filteredBooks = booksData.filter((book) => {
    const matchCategory = activeCategory === "All" || book.category === activeCategory;
    const matchSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => { setCurrentPage(1); }, [activeCategory, searchQuery]);

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans">
      
      <div className="relative w-full h-64">
        <img src={headerBg} alt="Header" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white">
            <h1 className="text-4xl font-bold mb-2">Books</h1>
            <div className="flex gap-2 text-sm text-gray-300">
                 / <span className="text-[#F04C88]">Books</span>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <aside className="w-full lg:w-1/4 flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
                <FaFilter className="text-gray-700" />
                <h3 className="font-bold text-xl text-gray-800">Filter</h3>
            </div>

            <div className="border border-gray-100 rounded-lg p-5 shadow-sm bg-white">
                <div className="flex justify-between items-center mb-4 cursor-pointer">
                    <h4 className="font-bold text-[#F04C88]">Categories</h4>
                    <FaChevronDown className="text-[#F04C88] text-xs" />
                </div>
                <div className="flex flex-col gap-3">
                    <label className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <input 
                                type="radio" 
                                name="category"
                                checked={activeCategory === "All"}
                                onChange={() => setActiveCategory("All")}
                                className="w-4 h-4 accent-[#F04C88]" 
                            />
                            <span className={`text-sm transition ${activeCategory === "All" ? "text-[#F04C88] font-bold" : "text-gray-600"}`}>All Categories</span>
                        </div>
                        <span className="text-xs text-gray-400">({booksData.length})</span>
                    </label>

                    {categoriesList.map((cat, idx) => (
                        <label key={idx} className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <input 
                                    type="radio" 
                                    name="category"
                                    checked={activeCategory === cat.name}
                                    onChange={() => setActiveCategory(cat.name)}
                                    className="w-4 h-4 accent-[#F04C88]" 
                                />
                                <span className={`text-sm transition ${activeCategory === cat.name ? "text-[#F04C88] font-bold" : "text-gray-600"}`}>
                                    {cat.name}
                                </span>
                            </div>
                            <span className="text-xs text-gray-400">({cat.count})</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="border border-gray-100 rounded-lg p-4 shadow-sm bg-white flex justify-between items-center cursor-pointer hover:bg-gray-50">
                 <h4 className="font-bold text-gray-700">Publisher</h4>
                 <FaChevronRight className="text-gray-400 text-xs" />
            </div>
            <div className="border border-gray-100 rounded-lg p-4 shadow-sm bg-white flex justify-between items-center cursor-pointer hover:bg-gray-50">
                 <h4 className="font-bold text-gray-700">Year</h4>
                 <FaChevronRight className="text-gray-400 text-xs" />
            </div>
          </aside>

          <main className="w-full lg:w-3/4">
             
             <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div className="relative w-full md:w-2/3">
                    <input 
                        type="text" 
                        placeholder="Search by title or author..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border border-gray-200 rounded-full py-3 pl-6 pr-12 outline-none focus:border-[#F04C88] transition"
                    />
                    <FaMicrophone className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#F04C88] hover:bg-gray-50">
                        <FaSearch />
                    </button>
                </div>

                <div className="w-full md:w-1/3 relative">
                    <select 
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="w-full appearance-none bg-gray-50 px-4 py-3 rounded-full border border-gray-200 cursor-pointer outline-none focus:border-[#F04C88] text-sm text-gray-600"
                    >
                      <option value="">Sort by: Default</option>
                      <option value="lowToHigh">Price: Low to High</option>
                      <option value="highToLow">Price: High to Low</option>
                    </select>
                    <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                </div>
             </div>

             <div className="flex flex-wrap gap-3 mb-8">
                {tabs.map((tab, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setActiveCategory(tab)}
                        className={`px-6 py-2 rounded-full border text-sm transition
                        ${activeCategory === tab 
                            ? "bg-[#F04C88]/10 border-[#F04C88] text-[#F04C88] font-bold" 
                            : "border-gray-200 text-gray-600 hover:border-gray-400"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
             </div>

             {currentBooks.length > 0 ? (
               <div className="flex flex-col gap-6">
                  {currentBooks.map((book) => (
                      <div key={book.id} className="flex flex-col md:flex-row gap-6 p-6 bg-white border border-gray-100 rounded-xl hover:shadow-lg transition">
                          
                          <Link to={`/books/${book.id}`} className="w-full md:w-48 h-64 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 relative group cursor-pointer block">
                              <img 
                                src={book.image} 
                                alt={book.title} 
                                className="w-full h-full object-cover transition duration-300 group-hover:scale-110" 
                              />
                              <div className="absolute top-2 left-2 bg-[#2E2548] text-[#FFD700] text-[10px] px-2 py-1 rounded-full font-bold">
                                  {book.category}
                              </div>
                          </Link>

                          <div className="flex-1 flex flex-col justify-between">
                              <div>
                                  <div className="flex justify-between items-start mb-2">
                                        <Link to={`/books/${book.id}`} className="text-xl font-bold text-[#2E2548] hover:text-[#F04C88] transition cursor-pointer">
                                        {book.title}
                                        </Link>
                                        <span className="border border-[#FFD700] text-[#FFD700] text-xs px-3 py-1 rounded-full bg-[#FFD700]/10">
                                            25% Off: {book.discountCode}
                                        </span>
                                    </div>

                                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {book.desc}
                                    </p>
                                  
                                    <div className="flex items-center gap-6 mb-2">
                                        <div className="flex items-center gap-1">
                                            <div className="flex text-yellow-400 text-sm">
                                                {[...Array(5)].map((_, i) => (
                                                  <FaStar key={i} className={i < Math.floor(book.rating) ? "text-yellow-400" : "text-gray-300"} />
                                                ))}
                                            </div>
                                            <span className="text-gray-400 text-xs ml-1">({book.reviews})</span>
                                        </div>
                                        <span className="text-sm font-bold text-[#2E2548]">Rate: {book.rating}</span>
                                    </div>

                                    <div className="flex items-center gap-8 text-sm text-gray-600">
                                        <div>
                                            <span className="text-gray-400 block text-xs">Author</span>
                                            <span className="font-bold text-[#2E2548]">{book.author}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 block text-xs">Year</span>
                                            <span className="font-bold text-[#2E2548]">{book.year}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row md:flex-col justify-between items-end md:w-40 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                                <span className="text-2xl font-bold text-[#2E2548]">${book.price.toFixed(2)}</span>
                              
                                <div className="flex gap-2 w-full">
                                    <button 
                                    onClick={() => handleAddToCart(book.id)}
                                    className={`flex-1 py-2 rounded-md transition flex items-center justify-center gap-2 text-sm font-bold shadow-md
                                    ${cart.includes(book.id) ? "bg-green-600 text-white" : "bg-[#F04C88] text-white hover:bg-[#d63d76]"}`}
                                    >
                                        {cart.includes(book.id) ? (
                                            <>Added <FaCheck size={14} /></>
                                        ) : (
                                        <>Add <FaShoppingCart size={14} /></>
                                        )}
                                    </button>
                                    
                                    <button 
                                    onClick={() => handleAddToWishlist(book.id)}
                                    className={`w-10 h-10 border rounded-md flex items-center justify-center transition
                                    ${wishlist.includes(book.id) 
                                        ? "bg-[#F04C88] border-[#F04C88] text-white" 
                                        : "border-[#F04C88] text-[#F04C88] hover:bg-[#F04C88] hover:text-white"
                                    }`}
                                    >
                                        <FaHeart />
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
                ) : (
                    <div className="text-center py-20 text-gray-500">
                    No books found matching your criteria.
                    </div>
                )}

                {sortedBooks.length > itemsPerPage && (
                    <div className="mt-12 flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                        <button 
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="text-[#F04C88] font-bold text-sm flex items-center gap-1 hover:underline disabled:text-gray-300 disabled:no-underline"
                        >
                            <FaChevronLeft size={10} /> Previous
                      </button>
                      
                      <div className="flex gap-1">
                            {[...Array(totalPages)].map((_, i) => (
                            <button 
                                key={i}
                                onClick={() => paginate(i + 1)}
                                className={`w-8 h-8 rounded-md font-bold shadow-md transition
                                ${currentPage === i + 1 
                                ? "bg-[#F04C88] text-white" 
                                : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                                {i + 1}
                            </button>
                            ))}
                        </div>

                        <button 
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="text-[#F04C88] font-bold text-sm flex items-center gap-1 hover:underline disabled:text-gray-300 disabled:no-underline"
                        >
                            Next <FaChevronRight size={10} />
                        </button>
                        </div>
                        <p className="text-gray-400 text-xs">
                        Showing {indexOfFirstBook + 1}-{Math.min(indexOfLastBook, sortedBooks.length)} of {sortedBooks.length} Books
                        </p>
                    </div>
                )}

            </main>
        </div>
        </div>
    </div>
    );
}