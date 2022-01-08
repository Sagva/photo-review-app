import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/Auth/SignupPage";
import LoginPage from "./pages/Auth/LoginPage";
import LogoutPage from "./pages/Auth/LogoutPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import Navigation from "./components/Navigation";
import AllAlbumsPage from "./pages/AllAlbumsPage";
function App() {
  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path={`/login`} element={<LoginPage />} />
        <Route path={`/logout`} element={<LogoutPage />} />
        <Route path={`/logout`} element={<LogoutPage />} />
        <Route path={`/forgot-password`} element={<ForgotPasswordPage />} />
        <Route path={`/all-albums`} element={<AllAlbumsPage />} />
      </Routes>
    </div>
  );
}

export default App;
