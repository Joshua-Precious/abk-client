import { Route, Routes } from "react-router";
import Home from "./routes/home";
import Gallery from "./routes/gallery";
import Register from "./routes/register";
import AdminDashboard from "./routes/admin";
import FAQ from "./routes/faq";
import About from "./routes/about";

export default function AppRoutes() {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/faq" element={<FAQ />} />
        </Routes>
    );
}