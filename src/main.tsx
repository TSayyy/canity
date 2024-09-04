import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import "@/index.css";
import { store } from "@/redux/store.js";
import { Router as router } from "@/router.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={new QueryClient()}>
        <ReduxProvider store={store}>
          <RouterProvider router={router} />
          <Toaster />
        </ReduxProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
