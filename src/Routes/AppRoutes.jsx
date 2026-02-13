import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage"; 
import ForgotPasswordPage from "../pages/ForgetPassword"; 
import SendCode from "../pages/SendCode"; 
import NewPasswordPage from "../pages/NewPasswordPage"; 
import AboutPage from "../pages/AboutPage"; 
import BooksPage from "../pages/BooksPage";
import BookDetailsPage from "../pages/BookDetailsPage";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderHistoryPage from "../pages/OrderHistoryPage";

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
        <Route path="books" element={<BooksPage />} />
<Route path="books/:id" element={<BookDetailsPage />} />  
<Route path="cart" element={<CartPage />} />
<Route path="wishlist" element={<WishlistPage />} />
<Route path="checkout" element={<CheckoutPage />} />
<Route path="order-history" element={<OrderHistoryPage />} />
      <Route path="books" element={<div className="h-screen pt-40 text-center">Books Soon</div>} />
       
      </Route>
    </Routes>
  );
};

export default AppRoutes;