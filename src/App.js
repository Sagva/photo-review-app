import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
function App() {
  return (
    <div className="App">
      Foto review app
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path={`/login`} element={<LoginPage />} />
        <Route path={`/logout`} element={<LogoutPage />} />
      </Routes>
    </div>
  );
}

export default App;
