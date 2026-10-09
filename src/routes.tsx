import { Route, Routes } from "react-router";
import Home from "./routes/home";
import Register from "./routes/register";
import AdminDashboard from "./routes/admin";
import FAQ from "./routes/faq";
import About from "./routes/about";
import Gallery from "./routes/gallery";
import GalleryAlbum from "./routes/galleryAlbum";
import Vendors from "./routes/vendors";
import ConfirmRegistration from "./routes/confirm";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/gallery/:slug" element={<GalleryAlbum />} />
      <Route path="/vendors" element={<Vendors />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirm-registration" element={<ConfirmRegistration />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/faq" element={<FAQ />} />
    </Routes>
  );
}
