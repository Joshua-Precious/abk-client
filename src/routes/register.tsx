import Header from "../components/blocks/Header";
import Footer from "../components/blocks/Footer";
import RegistrationForm from "../components/blocks/RegistrationForm";

export default function Register() {
    return (
        <div className="flex flex-col min-h-screen text-neutral-content">
            <Header />

            <main className="pt-20 md:pt-24 flex-grow relative">

                <div className="relative z-10 space-y-12 pb-12">

                    <div id="register-section">
                        <RegistrationForm />
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
