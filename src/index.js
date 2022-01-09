import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import SimpleReactLightbox from "simple-react-lightbox";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 2, // 2 minutes
      cacheTime: 1000 * 60 * 60 * 4, // 4 hours
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <SimpleReactLightbox>
            <App />
          </SimpleReactLightbox>
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
