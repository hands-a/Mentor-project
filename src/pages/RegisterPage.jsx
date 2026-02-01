import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import background from "../assets/background.jpg";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      const data = {
        username: `${values.firstName} ${values.lastName}`,
        email: values.email,
        password: values.password,
      };
      const res = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        data
      );
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const registerSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* Header Image */}
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
            Create Account
          </h2>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={registerSchema}
            onSubmit={handleRegister}
          >
            <Form className="flex flex-col gap-5">

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
                  First Name
                </label>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="John"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-md outline-none"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1 py-2"/>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
                  Last Name
                </label>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Smith"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-md outline-none"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1 py-2"/>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-md outline-none"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1 py-2"/>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  autoComplete="new-password"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-md outline-none"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1 py-2"/>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-md outline-none"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1 py-2"/>
              </div>

              <button
                type="submit"
                className="bg-[#F04C88] text-white py-3 rounded-md font-bold hover:bg-[#d63d76] transition"
              >
                Sign Up
              </button>

            </Form>
          </Formik>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#F04C88] font-bold hover:underline">
              Login
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
              Sign up with Google
            </button>

            <button className="flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-md hover:bg-gray-50 transition text-sm font-medium text-gray-700 cursor-pointer">
              <FaFacebook size={20} className="text-[#1877F2]" />
              Sign up with Facebook
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
