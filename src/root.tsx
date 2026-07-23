import "./styles/tailwind.css";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import ScrollToTop from "./components/ui/ScrollToTop";
import { Analytics } from "@vercel/analytics/next";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScrollToTop />
    <AppRoutes />
    <Analytics />
  </BrowserRouter>,
);
