import React, { useEffect, useState } from "react";
import Header from "../components/blocks/Header";
import SocialMediaFooter from "../components/blocks/Footer";
import GlassyContainer from "../components/ui/GlassyContainer";
import { Icon } from "@iconify/react";

interface Registration {
    id: string;
    teamName: string;
    numberOfPeople: number;
    ageRange: string;
    briefDescription?: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    city: string;
    createdAt: string;
}

export default function AdminDashboard() {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return !!localStorage.getItem("admin_token");
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [loginError, setLoginError] = useState("");

    // Data State
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchRegistrations = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem("admin_token");
                const response = await fetch("http://localhost:3000/api/registrations", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                
                if (response.status === 401 || response.status === 403) {
                    handleLogout();
                    throw new Error("Session expired. Please log in again.");
                }
                
                if (!response.ok) {
                    throw new Error("Failed to fetch registrations");
                }
                
                const data = await response.json();
                
                // Sort by newest first
                const sorted = (data.data || []).sort((a: Registration, b: Registration) => 
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                
                setRegistrations(sorted);
                setError("");
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Could not load registration data. Is the backend running?");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRegistrations();
    }, [isAuthenticated]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setLoginError("");

        try {
            const response = await fetch("http://localhost:3000/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            localStorage.setItem("admin_token", data.token);
            setIsAuthenticated(true);
        } catch (err: any) {
            setLoginError(err.message);
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        setIsAuthenticated(false);
        setRegistrations([]);
    };

    // Format date string to readable format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div className="flex flex-col min-h-screen text-neutral-content">
            <Header />

            <main className="pt-32 pb-20 md:pt-40 md:pb-32 flex-grow relative z-10 flex flex-col items-center">
                {!isAuthenticated ? (
                    <div className="container mx-auto px-4 max-w-md section-fade-in w-full">
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold tracking-tight mb-4">
                                Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Login</span>
                            </h1>
                            <p className="text-white/60">Sign in to manage team registrations</p>
                        </div>

                        <GlassyContainer className="rounded-3xl p-8">
                            <form onSubmit={handleLogin} className="space-y-6">
                                {loginError && (
                                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-400">
                                        <Icon icon="lucide:alert-circle" className="w-5 h-5 shrink-0" />
                                        <span className="text-sm font-medium">{loginError}</span>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80 ml-1">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Icon icon="lucide:mail" className="w-5 h-5 text-white/40" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
                                            placeholder="admin@abk.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80 ml-1">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Icon icon="lucide:lock" className="w-5 h-5 text-white/40" />
                                        </div>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoggingIn}
                                    className="w-full relative group overflow-hidden rounded-xl font-bold py-3.5 transition-all duration-300 disabled:opacity-50"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple-500 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative flex items-center justify-center gap-2">
                                        {isLoggingIn ? (
                                            <Icon icon="lucide:loader-2" className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <span>Sign In</span>
                                                <Icon icon="lucide:arrow-right" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </div>
                                </button>
                            </form>
                        </GlassyContainer>
                    </div>
                ) : (
                    <div className="container mx-auto px-4 max-w-7xl section-fade-in w-full">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 md:mb-0">
                                Registration <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Dashboard</span>
                            </h1>
                            <div className="flex items-center gap-4">
                                <div className="liquid-glass px-5 py-2.5 rounded-full border border-white/10 flex items-center gap-2">
                                    <Icon icon="lucide:users" className="w-4 h-4 text-accent" />
                                    <span className="font-bold">{registrations.length} Entries</span>
                                </div>
                                <button 
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors font-medium"
                                >
                                    <Icon icon="lucide:log-out" className="w-4 h-4" />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>

                        <GlassyContainer className="rounded-3xl p-4 md:p-8 overflow-hidden">
                            {isLoading ? (
                                <div className="py-32 flex flex-col items-center justify-center space-y-4">
                                    <Icon icon="lucide:loader-2" className="w-12 h-12 animate-spin text-accent" />
                                    <p className="text-white/60 font-medium">Loading entries...</p>
                                </div>
                            ) : error ? (
                                <div className="py-24 flex flex-col items-center justify-center text-center">
                                    <Icon icon="lucide:alert-circle" className="w-16 h-16 text-red-500 mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">Error Loading Data</h3>
                                    <p className="text-red-400/80 max-w-md">{error}</p>
                                </div>
                            ) : registrations.length === 0 ? (
                                <div className="py-32 flex flex-col items-center justify-center text-center">
                                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                                        <Icon icon="lucide:inbox" className="w-10 h-10 text-white/40" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">No Registrations Yet</h3>
                                    <p className="text-white/60">When teams register, they will appear here.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto custom-scrollbar pb-4">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/10 text-white/60 text-sm uppercase tracking-wider">
                                                <th className="px-4 py-4 font-medium min-w-[200px]">Team</th>
                                                <th className="px-4 py-4 font-medium min-w-[120px]">Size / Age</th>
                                                <th className="px-4 py-4 font-medium min-w-[250px]">Contact Info</th>
                                                <th className="px-4 py-4 font-medium min-w-[150px]">City</th>
                                                <th className="px-4 py-4 font-medium min-w-[180px]">Date Registered</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {registrations.map((reg) => (
                                                <tr key={reg.id} className="hover:bg-white/5 transition-colors group">
                                                    <td className="px-4 py-5">
                                                        <div className="font-bold text-white text-lg">{reg.teamName}</div>
                                                        {reg.briefDescription && (
                                                            <div className="text-sm text-white/50 mt-1 line-clamp-2 max-w-xs" title={reg.briefDescription}>
                                                                {reg.briefDescription}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-5">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Icon icon="lucide:users-2" className="w-4 h-4 text-white/40" />
                                                            <span className="font-medium text-white">{reg.numberOfPeople} members</span>
                                                        </div>
                                                        <div className="text-sm text-white/50 bg-white/5 inline-block px-2 py-0.5 rounded">
                                                            {reg.ageRange}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-5">
                                                        <div className="font-medium text-white mb-1">{reg.fullName}</div>
                                                        <div className="flex items-center gap-2 text-sm text-white/60 mb-1 hover:text-white transition-colors">
                                                            <Icon icon="lucide:mail" className="w-3.5 h-3.5" />
                                                            <a href={`mailto:${reg.email}`}>{reg.email}</a>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                                                            <Icon icon="lucide:phone" className="w-3.5 h-3.5" />
                                                            <a href={`tel:${reg.phoneNumber}`}>{reg.phoneNumber}</a>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-5 text-white/80">
                                                        <div className="flex items-center gap-2">
                                                            <Icon icon="lucide:map-pin" className="w-4 h-4 text-white/40" />
                                                            {reg.city}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-5">
                                                        <div className="text-sm text-white/80 flex items-center gap-2">
                                                            <Icon icon="lucide:calendar" className="w-4 h-4 text-accent/70" />
                                                            {formatDate(reg.createdAt)}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </GlassyContainer>
                    </div>
                )}
            </main>

            <SocialMediaFooter />
        </div>
    );
}
