import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
function App() {
  return (
    <div className="App">
      Foto review app
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
