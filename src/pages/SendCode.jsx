import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import background from "../assets/background.jpg";

export default function SendCode() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const validationSchema = Yup.object({
    code: Yup.string()
      .length(4, "Code must be 4 digits")
      .required("Code is required"),
  });

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      navigate("/new-password");
    },
  });

  useEffect(() => {
    formik.setFieldValue("code", otp.join(""));
  }, [otp]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4).split("");
    if (pastedData.every(char => !isNaN(char))) {
      const newOtp = [...otp];
      pastedData.forEach((val, i) => {
        if (i < 4) newOtp[i] = val;
      });
      setOtp(newOtp);
      const nextFocusIndex = pastedData.length < 4 ? pastedData.length : 3;
      inputRefs.current[nextFocusIndex].focus();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      
      <div className="relative w-full h-60 md:h-72">
        <img
          src={background}
          alt="Library Background"
          className="w-full h-full object-cover brightness-50"
        />
      </div>

      <div className="flex-1 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-sm border border-gray-100 text-center">
          
          <h2 className="text-[#D9176C] font-bold text-2xl mb-4">
            Reset your password!
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Enter the 4 dights code that you received on your email
          </p>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8 items-center">
            
            <div className="flex gap-4 justify-center" onPaste={handlePaste}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  className={`w-14 h-14 border-2 rounded-lg text-center text-2xl font-bold outline-none transition
                    ${
                      formik.touched.code && formik.errors.code && !data
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-[#F04C88]"
                    } bg-white text-gray-800`}
                />
              ))}
            </div>
            
            {formik.touched.code && formik.errors.code ? (
              <div className="text-red-500 text-sm font-medium mt-2">
                {formik.errors.code}
              </div>
            ) : null}

            <button
              type="submit"
              className="bg-[#D9176C] text-white py-3 rounded-md font-bold hover:bg-[#c21560] transition shadow-md w-full max-w-xs text-lg"
            >
              Reset password
            </button>
          </form>

          <div className="mt-8 text-gray-600 text-sm">
            Didn’t receive a code?{" "}
            <button className="text-[#D9176C] font-bold hover:underline">
              Send again
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}