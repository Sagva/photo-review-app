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
function App() {
  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route
          path={`${process.env.PUBLIC_URL}/signup`}
          element={<SignupPage />}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/login`}
          element={<LoginPage />}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/logout`}
          element={<LogoutPage />}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/logout`}
          element={<LogoutPage />}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/forgot-password`}
          element={<ForgotPasswordPage />}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/all-albums`}
          element={<AllAlbumsPage />}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/album/:id`}
          element={<AlbumPage />}
        />
        <Route path="*" element={<PageNotFound />} />
        <Route path={`${process.env.PUBLIC_URL}*`} element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
