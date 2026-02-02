import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { MdLocalShipping, MdPayment, MdAssignmentReturn, MdHeadsetMic } from "react-icons/md";
import background from "../assets/background.jpg";
import background2 from "../assets/background2.jpg";

export default function AboutPage() {
  
  return (
    <div className="flex flex-col font-sans">
      
      
      <div className="relative w-full h-[650px]">
        <img
          src={background}
          alt="Library Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white z-10">
          <h1 className="text-5xl font-bold mb-4">About Bookshop</h1>
          <p className="max-w-2xl text-lg text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.
          </p>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="container mx-auto px-6 md:px-12 py-20">
        <h2 className="text-3xl font-bold text-[#2E2548] text-center mb-12">Our Mission</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
            <h3 className="text-xl font-bold text-[#2E2548] mb-4">Quality Selection</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
            <span className="text-[#F04C88] text-sm font-bold cursor-pointer hover:underline">View More</span>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
            <h3 className="text-xl font-bold text-[#2E2548] mb-4">Exceptional Service</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
            <span className="text-[#F04C88] text-sm font-bold cursor-pointer hover:underline">View More</span>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
            <h3 className="text-xl font-bold text-[#2E2548] mb-4">Set Up Stores</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
            <span className="text-[#F04C88] text-sm font-bold cursor-pointer hover:underline">View More</span>
          </div>
        </div>
      </div>

      <div className="relative w-full py-20 text-white bg-[#211055]">
        
        <img 
          src={background2} 
          alt="Contact Background"
          className="absolute inset-0 w-full h-full object-cover rotate-180 opacity-30 mix-blend-overlay" 
        />
        
        <div className="absolute inset-0 bg-[#2E2548]/80"></div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16">
          
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Have a Questions?</h2>
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-400 text-sm mb-10 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in justo varius, sagittis neque ut, malesuada leo.
            </p>

            <form className="flex flex-col gap-4 max-w-md">
              <div className="flex gap-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-1/2 bg-transparent border border-gray-600 rounded-md px-4 py-3 text-sm outline-none focus:border-[#F04C88] transition placeholder-gray-500"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-1/2 bg-transparent border border-gray-600 rounded-md px-4 py-3 text-sm outline-none focus:border-[#F04C88] transition placeholder-gray-500"
                />
              </div>
              <textarea 
                placeholder="Your Message" 
                rows="4"
                className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 text-sm outline-none focus:border-[#F04C88] transition placeholder-gray-500 resize-none"
              ></textarea>
              <button className="bg-[#F04C88] text-white px-8 py-3 rounded-md font-bold hover:bg-[#d63d76] transition shadow-lg w-fit mt-2">
                Send Message
              </button>
            </form>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-8 relative">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2E2548]">
                   <FaPhoneAlt size={20} className="text-red-400"/>
                </div>
                <div>
                   <p className="font-bold">01 123456789</p>
                </div>
             </div>

             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2E2548]">
                   <FaEnvelope size={20}  className="text-red-400"/>
                </div>
                <div>
                   <p className="font-bold">Example@gmail.com</p>
                </div>
             </div>

             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2E2548]">
                   <FaMapMarkerAlt size={20} className="text-red-400" />
                </div>
                <div>
                   <p className="font-bold">100 Ring Road, Mohandessin</p>
                   <p className="text-gray-400 text-sm">Cairo, Egypt</p>
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* Features Section */}
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

    </div>
  );
}