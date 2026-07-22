import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import Header from "../components/blocks/Header";
import SocialMediaFooter from "../components/blocks/Footer";
import GlassyContainer from "../components/ui/GlassyContainer";
import { Icon } from "@iconify/react";

export default function ConfirmRegistration() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!token) {
            navigate("/", { replace: true });
            return;
        }

        const confirmToken = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const response = await fetch(`${API_URL}/api/confirm`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Confirmation failed");
                }

                setStatus("success");
                setMessage("Your registration has been successfully confirmed! Check your email for further details.");
            } catch (err: any) {
                setStatus("error");
                setMessage(err.message || "Failed to confirm registration. It might have already been confirmed or the link is invalid.");
            }
        };

        confirmToken();
    }, [token]);

    return (
        <div className="flex flex-col min-h-screen text-neutral-content bg-background">
            <Header />

            <main className="pt-32 pb-20 md:pt-40 md:pb-32 grow relative z-10 flex flex-col items-center justify-center">
                <div className="container mx-auto px-4 max-w-lg section-fade-in w-full text-center">
                    
                    <GlassyContainer className="rounded-3xl p-10 flex flex-col items-center">
                        {status === "loading" && (
                            <>
                                <Icon icon="lucide:loader-2" className="w-16 h-16 animate-spin text-accent mb-6" />
                                <h1 className="text-3xl font-bold mb-4">Confirming...</h1>
                                <p className="text-white/70">Please wait while we verify your registration.</p>
                            </>
                        )}

                        {status === "success" && (
                            <>
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                    <Icon icon="lucide:check-circle" className="w-12 h-12 text-green-400" />
                                </div>
                                <h1 className="text-3xl font-bold mb-4 text-green-400">Confirmed!</h1>
                                <p className="text-white/80 text-lg mb-8">{message}</p>
                                <button
                                    onClick={() => navigate("/")}
                                    className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
                                >
                                    Return to Home
                                </button>
                            </>
                        )}

                        {status === "error" && (
                            <>
                                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                                    <Icon icon="lucide:x-circle" className="w-12 h-12 text-red-400" />
                                </div>
                                <h1 className="text-3xl font-bold mb-4 text-red-400">Confirmation Failed</h1>
                                <p className="text-white/80 text-lg mb-8">{message}</p>
                                <button
                                    onClick={() => navigate("/")}
                                    className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
                                >
                                    Return to Home
                                </button>
                            </>
                        )}
                    </GlassyContainer>
                </div>
            </main>

            <SocialMediaFooter />
        </div>
    );
}
