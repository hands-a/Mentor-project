import { useState, useRef } from "react";
import background from "../assets/background.jpg";

export default function ResetPassword() {
    const [code, setCode] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);


    const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    
    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    
    if (value && index < 3) {
        inputRefs.current[index + 1].focus();
    }
        };


    const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
        inputRefs.current[index - 1].focus();
    }
    };


    const handleSubmit = (e) => {
    e.preventDefault();
    const finalCode = code.join("");
    console.log("Final Code:", finalCode);
    alert(`Code Submitted: ${finalCode}`);
    };

    return (
    <div className="flex flex-col min-h-screen bg-gray-50">
    
        <div className="relative w-full h-60 md:h-72">
        <img
            src={background}
            alt="Library Background"
            className="w-full h-full object-cover brightness-50"
        />
        </div>

        <div className="flex-1 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-100 text-center">
            
            <h2 className="text-[#D9176C] font-bold text-xl mb-2">
            Reset your password
            </h2>
            <p className="text-gray-500 text-sm mb-8">
            Enter The 4 digits that you received in your email
            </p>

           <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex justify-center gap-4">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 text-center border border-gray-300 rounded-lg outline-none focus:border-[#F04C88] focus:ring-1 focus:ring-[#F04C88] transition text-2xl font-bold text-gray-700"
                />
              ))}
            </div>
            
            <button
              type="submit"
              className="bg-[#F04C88] text-white py-3 rounded-md font-bold hover:bg-[#d63d76] transition shadow-md"
            >
              Reset password
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6">
            Didn't receive a code?{" "}
            <button className="text-[#F04C88] font-bold hover:underline cursor-pointer">
              Send again
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}