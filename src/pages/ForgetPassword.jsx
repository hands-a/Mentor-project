
import { Link, useNavigate } from "react-router-dom"; 
import background from "../assets/background.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ForgotPassword() {
    const navigate = useNavigate(); 

    const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    });

    const formik = useFormik({
    initialValues: {
        email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        console.log("Reset Password Request:", values);
        alert(`Reset code sent to: ${values.email}`);
    
        navigate("/reset-password");
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
          
          <h2 className="text-center text-[#D9176C] font-bold text-2xl mb-2">
            Forget Password?
          </h2>
          <p className="text-center text-gray-500 text-sm mb-8">
            Enter your email to reset your password
          </p>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
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
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-xs mt-1 ml-1 font-medium">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#F04C88] text-white py-3 rounded-md font-bold hover:bg-[#d63d76] transition shadow-md"
            >
              Send reset code
            </button>

          </form>

          <div className="mt-6 text-center">
             <Link to="/login" className="text-sm text-gray-500 hover:text-[#F04C88] transition flex items-center justify-center gap-1">
                Back to Login
             </Link>
          </div>

        </div>
      </div>
    </div>
  );
}