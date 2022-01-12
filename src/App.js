import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/Auth/SignupPage";
import LoginPage from "./pages/Auth/LoginPage";
import LogoutPage from "./pages/Auth/LogoutPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import Navigation from "./components/Navigation";
import AllAlbumsPage from "./pages/AllAlbumsPage";
import AlbumPage from "./pages/AlbumPage";
import PageNotFound from "./pages/PageNotFound";
import { useAuthContext } from "./contexts/AuthContext";
function App() {
  const { currentUser } = useAuthContext();
  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path={`/login`} element={<LoginPage />} />
        <Route path={`/logout`} element={<LogoutPage />} />
        <Route path={`/logout`} element={<LogoutPage />} />
        <Route path={`/forgot-password`} element={<ForgotPasswordPage />} />
        <Route path={`/all-albums`} element={<AllAlbumsPage />} />
        <Route path={`/album/:id`} element={<AlbumPage />} />
        <Route
          path="/"
          element={currentUser ? <AllAlbumsPage /> : <LoginPage />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
