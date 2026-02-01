import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import background from "../assets/background.jpg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

export default function LoginPage() {

    const handleLogin = async(values) => {
    console.log(values);
    try{
        const res =  await axios.post('http://localhost:1337/api/auth/local' , values);
        console.log(res);
    }catch(error){
        console.log(error)
    }
    };
    const loginSchema = Yup.object({
    identifier: Yup.string().email('Invaild email').required('Required'),
    password: Yup.string().required('Required'),
    })

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

          <Formik
  initialValues={{
    identifier: "",
    password: "",
  }}
  validationSchema={loginSchema}
  onSubmit={handleLogin}
>
  <Form className="flex flex-col gap-5">

    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
        Email
      </label>
      <Field
        type="email"
        name="identifier"
        placeholder="Enter your email"
        className="w-full border border-gray-300 px-4 py-2.5 rounded-md outline-none"
      />
      <ErrorMessage name='identifier' component="div" className="text-red-500 text-sm mt-1 py-2"/>
    </div>

    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
        Password
      </label>
      <Field
  type="password"
  name="password"
  placeholder="Enter password"
  autoComplete="current-password"
  className="w-full border border-gray-300 px-4 py-2.5 rounded-md outline-none"
/>
    </div>
      <ErrorMessage name='password' component="div" className="text-red-500 text-sm mt-1 py-2"/>

    <button
      type="submit"
      className="bg-[#F04C88] text-white py-3 rounded-md font-bold"
    >
      Log in
    </button>

  </Form>
</Formik>

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
            <button className="flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-md">
              <FcGoogle size={22} />
              Login with Google
            </button>

            <button className="flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-md">
              <FaFacebook size={20} className="text-[#1877F2]" />
              Login with Facebook
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
