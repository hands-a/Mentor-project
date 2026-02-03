import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import background from "../assets/background.jpg";
import { useFormik } from "formik"; 
import * as Yup from "yup";

export default function LoginPage() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"), 
    password: Yup.string()
      .min(6, "Password must be at least 6 characters") 
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const userData = {
        name: "John Smith",
        email: values.email,
        token: "fake-jwt-token-123"
      };

      localStorage.setItem("user", JSON.stringify(userData));
      window.dispatchEvent(new Event("authUpdated"));
      navigate("/"); 
    },
  });

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
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-100">
          <h2 className="text-center text-[#D9176C] font-bold text-2xl mb-6">
            Welcome Back!
          </h2>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
                Email
              </label>
              <input
                type="email"
                name="email" 
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`w-full border px-4 py-2.5 rounded-md outline-none transition focus:ring-1 
                  ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-[#F04C88] focus:ring-[#F04C88]"
                  }`}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-xs mt-1 ml-1 font-medium">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`w-full border px-4 py-2.5 rounded-md outline-none transition focus:ring-1 
                  ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-[#F04C88] focus:ring-[#F04C88]"
                  }`}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-xs mt-1 ml-1 font-medium">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <div className="flex justify-between items-center text-sm mt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="accent-[#F04C88] w-4 h-4" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-[#F04C88] hover:underline font-medium">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit" 
              className="bg-[#F04C88] text-white py-3 rounded-md font-bold hover:bg-[#d63d76] transition shadow-md mt-2"
            >
              Log in
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#F04C88] font-bold hover:underline">
              Signup
            </Link>
          </p>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <span className="relative bg-white px-3 text-sm text-gray-400 italic">
              or
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-md hover:bg-gray-50 transition text-sm font-medium text-gray-700 cursor-pointer">
              <FcGoogle size={22} />
              <span>Login with Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-md hover:bg-gray-50 transition text-sm font-medium text-gray-700 cursor-pointer">
              <FaFacebook size={20} className="text-[#1877F2]" />
              <span>Login with Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}