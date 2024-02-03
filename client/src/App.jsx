import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import MatchingPage from "./pages/MatchingPage";

function App() {
  return (
    <>
      <MatchingPage />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
