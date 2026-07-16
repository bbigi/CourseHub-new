
  import { createRoot } from "react-dom/client";
  import { BrowserRouter } from "react-router";
  import App from "./app/App.tsx";
  import { AuthProvider } from "./app/context/AuthContext.tsx";
  import "./styles/index.css";

  class MissingRootElementError extends Error {
    readonly name = "MissingRootElementError";
  }

  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new MissingRootElementError("Elemen root aplikasi tidak ditemukan.");
  }

  createRoot(rootElement).render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>,
  );
