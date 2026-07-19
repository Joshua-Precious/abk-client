import React, { useState } from "react";
import Header from "../components/blocks/Header";
import SocialMediaFooter from "../components/blocks/Footer";
import GlassyContainer from "../components/ui/GlassyContainer";
import { Icon } from "@iconify/react";

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
    return (
        <div className="border-b border-white/10 last:border-b-0">
            <button
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                onClick={onClick}
            >
                <span className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${isOpen ? 'text-primary-content' : 'text-neutral-content group-hover:text-primary-content'}`}>
                    {question}
                </span>
                <span className="ml-4 flex-shrink-0">
                    {isOpen ? (
                        <Icon icon="lucide:minus-circle" className="w-6 h-6 text-primary-content" />
                    ) : (
                        <Icon icon="lucide:plus-circle" className="w-6 h-6 text-primary-content opacity-70 group-hover:opacity-100 transition-opacity" />
                    )}
                </span>
            </button>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-neutral-content/80 text-lg leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "What is the turnaround?",
            answer: "Our standard turnaround time is typically 3-5 business days depending on the scope of the project. For rush deliveries, please contact us directly and we can expedite the process."
        },
        {
            question: "What genres do you specialize in?",
            answer: "We specialize in a wide variety of genres including Hip Hop, R&B, Pop, Electronic, and Cinematic scores. Our team has diverse backgrounds ensuring we can adapt to your unique sound."
        },
        {
            question: "What is the investment?",
            answer: "Investment varies based on the complexity and requirements of your project. We offer customized packages tailored to independent artists and commercial studios alike. Reach out for a detailed quote."
        }
    ];

    return (
        <div className="flex flex-col min-h-screen text-neutral-content">
            <Header />

            <main className="pt-32 pb-20 md:pt-40 md:pb-32 flex-grow relative z-10 flex items-center justify-center">
                <div className="container mx-auto px-4 max-w-4xl section-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold text-center mb-16 tracking-tight">
                        FAQ
                    </h1>

                    <GlassyContainer className="rounded-3xl p-6 md:p-12">
                        <div className="flex flex-col">
                            {faqs.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === index}
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                />
                            ))}
                        </div>
                    </GlassyContainer>
                </div>
            </main>

            <SocialMediaFooter />
        </div>
    );
}
