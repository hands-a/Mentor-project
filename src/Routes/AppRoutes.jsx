
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const AppRoutes = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        
        
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
<Route path="reset-password" element={<ResetPassword />} />
        <Route path="reset-password-page" element={<ResetPasswordPage />} />        
        
        <Route path="books" element={<div className="h-screen pt-40 text-center">Soon</div>} />
        <Route path="about" element={<div className="h-screen pt-40 text-center"> Soon</div>} />
       
      </Route>
    </Routes>
  );
};

export default AppRoutes;