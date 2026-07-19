import "./styles/tailwind.css";
import AppRoutes from "./routes";   
import { BrowserRouter} from "react-router";
import { createRoot } from "react-dom/client";
import ScrollToTop from "./components/ui/ScrollToTop";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
    </BrowserRouter>
);
