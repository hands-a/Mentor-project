import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import background from "../assets/background.jpg";

export default function NewPasswordPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      navigate("/login");
    },
  });

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
        <div className="w-full max-w-lg bg-white p-10 rounded-lg shadow-sm border border-gray-100">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#D9176C] mb-3">Create new password!</h2>
            <p className="text-gray-500 text-sm mb-1">
              Create a strong password
            </p>
            <p className="text-gray-400 text-xs">
              Your new password must be different from previous one
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
            
            <div>
              <label className="block text-gray-800 text-sm font-bold mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`w-full border px-4 py-3 rounded-md outline-none transition text-sm
                    ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-300 focus:border-[#F04C88] focus:ring-1 focus:ring-[#F04C88]"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-xs mt-1 ml-1 font-medium">
                  {formik.errors.password}
                </div>
              ) : (
                <p className="text-gray-400 text-xs mt-1 ml-1">Must be at least 8 characters</p>
              )}
            </div>

            <div>
              <label className="block text-gray-800 text-sm font-bold mb-2 ml-1">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className={`w-full border px-4 py-3 rounded-md outline-none transition text-sm
                    ${
                      formik.touched.confirmPassword && formik.errors.confirmPassword
                        ? "border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-300 focus:border-[#F04C88] focus:ring-1 focus:ring-[#F04C88]"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-500 text-xs mt-1 ml-1 font-medium">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 accent-[#D9176C] cursor-pointer" 
              />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="bg-[#D9176C] text-white py-3 rounded-md font-bold hover:bg-[#c21560] transition shadow-md mt-2 text-lg"
            >
              Reset password
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}