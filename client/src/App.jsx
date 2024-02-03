import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import PackagePage from "./pages/PackagePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/package" element={<PackagePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
