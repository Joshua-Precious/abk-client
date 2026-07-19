import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function RegistrationForm() {
    // Form state
    const [formData, setFormData] = useState({
        teamName: '',
        numberOfPeople: '',
        ageRange: '',
        briefDescription: '',
        fullName: '',
        phoneNumber: '',
        email: '',
        city: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [submitStatus, setSubmitStatus] = useState(''); // 'success' or 'error'

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const requiredFields: (keyof typeof formData)[] = ['teamName', 'numberOfPeople', 'ageRange', 'fullName', 'phoneNumber', 'email', 'city'];
        return requiredFields.every(field => formData[field].trim() !== '');
    };

    const setMessageWithTimeout = (message: string, status: string, duration: number) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setSubmitMessage(message);
        setSubmitStatus(status);
        timeoutRef.current = setTimeout(() => {
            setSubmitMessage('');
            setSubmitStatus('');
            timeoutRef.current = null;
        }, duration);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setMessageWithTimeout('Please fill in all required fields', 'error', 5000);
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${API_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Registration failed');

            setFormData({
                teamName: '', numberOfPeople: '', ageRange: '', briefDescription: '',
                fullName: '', phoneNumber: '', email: '', city: ''
            });

            setMessageWithTimeout('Registration submitted successfully!', 'success', 5000);
        } catch (error: any) {
            console.error('Registration error:', error);
            let errorMessage = 'Registration failed. Please try again.';
            if (error.message?.includes('network') || error.message?.includes('fetch')) {
                errorMessage = 'Network error. Please check your internet connection.';
            }
            setMessageWithTimeout(errorMessage, 'error', 8000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="register-section" className="relative py-12 px-4 flex justify-center items-center">

            {/* SVG Filter for the Paper Edge Effect */}
            <svg className="absolute w-0 h-0" style={{ pointerEvents: 'none' }}>
                <defs>
                    <filter id="paper-edge" x="-10%" y="-10%" width="120%" height="120%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>

            <div className="relative w-full max-w-4xl mx-auto drop-shadow-2xl">

                {/* The Dark Paper Background */}
                <div
                    className="absolute inset-0 bg-[#121212] shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]"
                    style={{ filter: "url(#paper-edge)" }}
                >
                    {/* Faint notebook lines for dark mode aesthetic */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #ffffff 31px, #ffffff 32px)',
                        backgroundPosition: '0 40px'
                    }}></div>
                </div>

                {/* Form Content - positioned over the paper */}
                <div className="relative z-10 p-8 md:p-14 text-white/90">

                    <div className="text-center mb-10 transform -rotate-2">
                        <h1 className="font-bold text-5xl md:text-6xl tracking-wider inline-block border-b-4 border-white/20 pb-2 text-white">
                            REGISTER
                        </h1>
                        <p className="text-white/60 mt-4 text-xl font-medium">Join the ultimate showdown!</p>
                    </div>

                    {submitMessage && (
                        <div className={`mb-8 p-4 rounded-lg text-center font-bold text-lg transform rotate-1 ${submitStatus === 'success'
                            ? 'bg-green-900/40 text-green-300 border-2 border-green-500/50 border-dashed'
                            : 'bg-red-900/40 text-red-300 border-2 border-red-500/50 border-dashed'
                            }`}>
                            {submitMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-10">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">

                            {/* Audition Details */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold border-b-2 border-dashed border-white/20 pb-2 transform -rotate-1 text-white inline-block">
                                    Audition Details
                                </h2>

                                <div className="space-y-5">
                                    <div className="relative group">
                                        <label className="text-sm font-bold text-white/70 mb-1 block">Team Name *</label>
                                        <input
                                            type="text" name="teamName" value={formData.teamName} onChange={handleInputChange} required
                                            className="w-full bg-transparent border-b-2 border-white/20 px-2 py-2 text-xl text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors"
                                            placeholder="The Dancing Stars"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <label className="text-sm font-bold text-white/70 mb-1 block">Number of People *</label>
                                        <input
                                            type="number" name="numberOfPeople" value={formData.numberOfPeople} onChange={handleInputChange} required min="1"
                                            className="w-full bg-transparent border-b-2 border-white/20 px-2 py-2 text-xl text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors"
                                            placeholder="5"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <label className="text-sm font-bold text-white/70 mb-1 block">Age Range *</label>
                                        <input
                                            type="text" name="ageRange" value={formData.ageRange} onChange={handleInputChange} required
                                            className="w-full bg-transparent border-b-2 border-white/20 px-2 py-2 text-xl text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors"
                                            placeholder="18-25"
                                        />
                                    </div>

                                    <div className="relative group pt-2">
                                        <label className="text-sm font-bold text-white/70 mb-1 block">Brief Description</label>
                                        <textarea
                                            name="briefDescription" value={formData.briefDescription} onChange={handleInputChange} rows={2}
                                            className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-3 py-2 text-lg text-white placeholder-white/30 focus:outline-none focus:border-white/40 resize-none transition-colors"
                                            placeholder="Tell us about your style..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Primary Contact */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold border-b-2 border-dashed border-white/20 pb-2 transform rotate-1 text-white inline-block">
                                    Primary Contact
                                </h2>

                                <div className="space-y-5">
                                    <div className="relative group">
                                        <label className="text-sm font-bold text-white/70 mb-1 block">Full Name *</label>
                                        <input
                                            type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required
                                            className="w-full bg-transparent border-b-2 border-white/20 px-2 py-2 text-xl text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <label className="text-sm font-bold text-white/70 mb-1 block">Phone Number *</label>
                                        <input
                                            type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required
                                            className="w-full bg-transparent border-b-2 border-white/20 px-2 py-2 text-xl text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors"
                                            placeholder="123-456-7890"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <label className="text-sm font-bold text-white/70 mb-1 block">Email *</label>
                                        <input
                                            type="email" name="email" value={formData.email} onChange={handleInputChange} required
                                            className="w-full bg-transparent border-b-2 border-white/20 px-2 py-2 text-xl text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors"
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <label className="text-sm font-bold text-white/70 mb-1 block">City *</label>
                                        <input
                                            type="text" name="city" value={formData.city} onChange={handleInputChange} required
                                            className="w-full bg-transparent border-b-2 border-white/20 px-2 py-2 text-xl text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors"
                                            placeholder="Enter your city"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex justify-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-12 py-4 chromatic-bg text-white font-bold text-2xl rounded-full transform hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,0,128,0.4)] hover:shadow-[0_0_30px_rgba(255,0,128,0.6)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden border-none"
                            >
                                <span className="relative z-10 drop-shadow-md">
                                    {isSubmitting ? (
                                        <Icon icon="lucide:loader-2" className="w-8 h-8 animate-spin mx-auto" />
                                    ) : (
                                        'SUBMIT'
                                    )}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Decorative Pins */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm">
                    <div className="w-6 h-6 rounded-full bg-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-black/60 shadow-sm"></div>
                    </div>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm">
                    <div className="w-6 h-6 rounded-full bg-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-black/60 shadow-sm"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
