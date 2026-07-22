import Header from "../components/blocks/Header";
import Footer from "../components/blocks/Footer";
import RegistrationForm from "../components/blocks/RegistrationForm";

export default function Register() {
  return (
    <div className="flex flex-col min-h-screen text-neutral-content">
      <Header />

      <main className="pt-24 md:pt-28 grow relative z-10">
        <div className="container mx-auto px-4 pb-16 md:pb-20">
          <RegistrationForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
