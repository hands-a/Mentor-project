import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes"; // استدعينا ملف الراوتس اللي عملناه فوق

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;