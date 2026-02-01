import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isLogin, setIsLogin] = useState(false);

  const addToCart = () => setCartCount((prev) => prev + 1);
  const addToWishlist = () => setWishlistCount((prev) => prev + 1);

  const login = () => setIsLogin(true);

  return (
    <>
      <Navbar cartCount={cartCount} wishlistCount={wishlistCount} isLogin={isLogin} />
      <Outlet context={{ addToCart, addToWishlist, login }} />
      <Footer />
    </>
  );
};

export default Layout;