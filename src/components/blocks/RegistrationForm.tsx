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
        <section id="register-section" className="relative py-8 px-4 flex justify-center items-start min-h-screen">
            {/* Outer decorative background label */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-0 text-center pointer-events-none">
                <p className="text-white/10 font-black text-[8rem] md:text-[12rem] leading-none tracking-tighter select-none uppercase">
                    REGISTER
                </p>
            </div>

            <div className="relative w-full max-w-xl mx-auto z-10 mt-4">

                {/* === PAPER LAYER === */}
                <div className="relative">
                    {/* The paper image — sets the natural shape */}
                    <img
                        src="/paper.png"
                        alt=""
                        aria-hidden="true"
                        className="w-full h-auto block"
                    />

                    {/* Form content overlaid on top of the white paper area */}
                    {/* The paper image is ~500x580px with ~10% margin on each side */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center"
                        style={{ padding: '12% 14% 14% 14%' }}>

                        {/* Title block */}
                        <div className="w-full text-center mb-4">
                            <div className="inline-block bg-[#ff0000] text-white font-black text-xs tracking-[0.3em] uppercase px-3 py-1 rotate-[-1deg] mb-2 shadow-sm">
                                Accra's Boogie King 2026
                            </div>
                            <h1 className="font-black text-3xl sm:text-4xl text-slate-900 leading-none tracking-wider rotate-[-1deg] inline-block">
                                REGISTER
                            </h1>
                            <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">Fill in the form below to enter your team</p>
                            <div className="w-16 h-[2px] bg-slate-400 mx-auto mt-2"></div>
                        </div>

                        {/* Status message */}
                        {submitMessage && (
                            <div className={`w-full mb-3 px-3 py-2 rounded text-center font-bold text-xs rotate-[0.5deg] ${
                                submitStatus === 'success'
                                    ? 'bg-green-100 text-green-900 border border-green-400 border-dashed'
                                    : 'bg-red-100 text-red-900 border border-red-400 border-dashed'
                            }`}>
                                {submitMessage}
                            </div>
                        )}

                        {/* Form — single column compact layout */}
                        <form onSubmit={handleSubmit} className="w-full space-y-3">

                            {/* Section: Team Info */}
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-dashed border-slate-300 pb-[2px] mb-2">
                                    — Team Info —
                                </p>
                                <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-[2px]">Team Name *</label>
                                        <input
                                            type="text" name="teamName" value={formData.teamName} onChange={handleInputChange} required
                                            className="w-full bg-transparent border-b-2 border-slate-400 py-1 text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
                                            placeholder="Team name..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-[2px]">No. of People *</label>
                                        <input
                                            type="number" name="numberOfPeople" value={formData.numberOfPeople} onChange={handleInputChange} required min="1"
                                            className="w-full bg-transparent border-b-2 border-slate-400 py-1 text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
                                            placeholder="e.g. 5"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-[2px]">Age Range *</label>
                                        <input
                                            type="text" name="ageRange" value={formData.ageRange} onChange={handleInputChange} required
                                            className="w-full bg-transparent border-b-2 border-slate-400 py-1 text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
                                            placeholder="e.g. 18-25"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-[2px]">City *</label>
                                        <input
                                            type="text" name="city" value={formData.city} onChange={handleInputChange} required
                                            className="w-full bg-transparent border-b-2 border-slate-400 py-1 text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
                                            placeholder="Your city"
                                        />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-[2px]">Brief Description</label>
                                    <textarea
                                        name="briefDescription" value={formData.briefDescription} onChange={handleInputChange} rows={2}
                                        className="w-full bg-slate-100/50 border border-slate-300 rounded px-2 py-1 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 resize-none transition-colors"
                                        placeholder="Tell us about your style..."
                                    ></textarea>
                                </div>
                            </div>

                            {/* Section: Contact */}
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-dashed border-slate-300 pb-[2px] mb-2">
                                    — Primary Contact —
                                </p>
                                <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-[2px]">Full Name *</label>
                                        <input
                                            type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required
                                            className="w-full bg-transparent border-b-2 border-slate-400 py-1 text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-[2px]">Phone *</label>
                                        <input
                                            type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required
                                            className="w-full bg-transparent border-b-2 border-slate-400 py-1 text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
                                            placeholder="Phone number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-[2px]">Email *</label>
                                        <input
                                            type="email" name="email" value={formData.email} onChange={handleInputChange} required
                                            className="w-full bg-transparent border-b-2 border-slate-400 py-1 text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
                                            placeholder="Email address"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit button */}
                            <div className="pt-2 flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-2.5 chromatic-bg text-white font-black text-sm tracking-widest uppercase rounded-full hover:scale-105 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border-none cursor-pointer rotate-[-0.5deg]"
                                >
                                    {isSubmitting ? (
                                        <Icon icon="lucide:loader-2" className="w-5 h-5 animate-spin mx-auto" />
                                    ) : (
                                        'SUBMIT ENTRY'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Red circular stamp decoration */}
                <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[#ff0000] border-4 border-[#cc0000] flex flex-col items-center justify-center text-white font-black rotate-12 shadow-xl z-20">
                    <span className="text-[8px] tracking-widest">ABK</span>
                    <span className="text-[10px] tracking-widest">2026</span>
                    <span className="text-[7px] tracking-[0.15em] mt-1 border-t border-white/60 pt-1">OFFICIAL</span>
                </div>

                {/* Paper clip decoration top-left */}
                <div className="absolute -top-3 left-12 w-4 h-12 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full shadow-md z-20 rotate-[-5deg]"
                    style={{ clipPath: 'polygon(25% 0%, 75% 0%, 75% 60%, 100% 60%, 100% 70%, 75% 70%, 75% 100%, 25% 100%, 25% 70%, 0% 70%, 0% 60%, 25% 60%)' }}>
                </div>
            </div>
        </section>
    );
}
