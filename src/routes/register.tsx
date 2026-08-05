import Header from "../components/blocks/Header";
import Footer from "../components/blocks/Footer";
import GlassyContainer from "../components/ui/GlassyContainer";

export default function Register() {
  return (
    <div className="flex flex-col min-h-screen text-neutral-content">
      <Header />

      <main className="pt-24 md:pt-28 grow relative z-10">
        <div className="container mx-auto px-4 pb-16 md:pb-20">
          <GlassyContainer className="max-w-2xl mx-auto text-center py-16 md:py-24">
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-4">
              Registration Closed
            </h1>
            <p className="text-base md:text-lg opacity-80">
              Thank you for your interest. Registration for this event is no
              longer available.
            </p>
          </GlassyContainer>
        </div>
      </main>

      <Footer />
    </div>
  );
}
