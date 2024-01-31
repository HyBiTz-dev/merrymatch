import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import RegisterMainPage from "./pages/RegisterMainPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterMainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
