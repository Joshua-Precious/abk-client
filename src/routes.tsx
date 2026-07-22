import { Route, Routes } from "react-router";
import Home from "./routes/home";
import Gallery from "./routes/gallery";
import Register from "./routes/register";
import AdminDashboard from "./routes/admin";
import FAQ from "./routes/faq";
import About from "./routes/about";
import Merch from "./routes/merch";
import Vendors from "./routes/vendors";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/merch" element={<Merch />} />
      <Route path="/vendors" element={<Vendors />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/faq" element={<FAQ />} />
    </Routes>
  );
}
