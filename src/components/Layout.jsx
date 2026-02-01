import { Outlet } from "react-router-dom"; // دي المسؤولة عن عرض محتوى الصفحات المتغير
import Navbar from "./Navbar"; // استيراد الناف بار اللي أنت عملته
import Footer from "./Footer"; // استيراد الفوتر اللي أنت عملته
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* 1. الناف بار ثابت فوق في كل الصفحات */}
      <Navbar />

      {/* 2. الـ Outlet هو المكان اللي هيتبدل فيه محتوى الصفحة (Home, Books, إلخ) */}
      <main className="flex-1">
        <Outlet />
      </main>
        <Footer />
    </div>
  );
}