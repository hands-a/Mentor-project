import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage"; 
import ForgotPasswordPage from "../pages/ForgetPassword"; 
import SendCode from "../pages/SendCode"; 
import NewPasswordPage from "../pages/NewPasswordPage"; 
import AboutPage from "../pages/AboutPage"; 

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
        <Route index element={<HomePage />} />
        
        <Route path="login" element={<LoginPage />} />
        
        
        <Route path="register" element={<RegisterPage />} />
        
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<SendCode />} />
        <Route path="new-password" element={<NewPasswordPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="books" element={<div className="h-screen pt-40 text-center">Books Soon</div>} />
       
      </Route>
    </Routes>
  );
};

export default AppRoutes;