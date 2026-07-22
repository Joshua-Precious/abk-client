import { useState } from "react";
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
        <span
          className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${isOpen ? "text-primary-content" : "text-neutral-content group-hover:text-primary-content"}`}
        >
          {question}
        </span>
        <span className="ml-4 shrink-0">
          {isOpen ? (
            <Icon
              icon="lucide:minus-circle"
              className="w-6 h-6 text-primary-content"
            />
          ) : (
            <Icon
              icon="lucide:plus-circle"
              className="w-6 h-6 text-primary-content opacity-70 group-hover:opacity-100 transition-opacity"
            />
          )}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"}`}
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
      question: "Is ABK a ticketed event?",
      answer:
        "Accra's Boogie King is a free event. No tickets whatsoever. Come enjoy the dance, support your favorite team, and enjoy the experience.",
    },
    {
      question: "What's the competitions programming like?",
      answer:
        "3 rounds of different themes and genres to test the competitors creativity and execution plus a bonus round the Boogie King Round to showcase a freestyling king.",
    },
    {
      question: "What does one need to register?",
      answer:
        "A team of 12 dancers and you must be ready to adhere to the competition rules, terms and conditions. You can register via our website.",
    },
    {
      question: "Can I register at the venue?",
      answer:
        "No, there's a limited time frame and slots for dance team registration. Early registration is adviced.",
    },
    {
      question: "Is there an age limit?",
      answer: "16+. Under 16 must come with a parent/guardian.",
    },
    {
      question: "What should I wear?",
      answer: "Streetwear. Come stylish. You may never know who is watching.",
    },
    {
      question: "Will there be food and drinks?",
      answer: "Yes. Food vendors, bars, and brand activations will be on site.",
    },
    {
      question: "Is the venue safe?",
      answer:
        "100%. We have security, medical team, and controlled entry. Your safety is the crown we protect.",
    },
    {
      question: "Can I sell at the event?",
      answer:
        "Yes. Vendor slots start from GH₵500. Limited spaces. You can book a vendor slot via our website in the vendors section.",
    },
    {
      question: "Can I record videos?",
      answer:
        "Yes! Tag us @AccrasBoogieKing #AccrasBoogieKing #ABK2026 Best crowd content gets reposted.",
    },
    {
      question: "How can my brand sponsor Boogie King?",
      answer:
        "Send an email to accrasboogieking@gmail.com for more details on sponsorship.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen text-neutral-content">
      <Header />

      <main className="pt-28 md:pt-36 grow relative z-10">
        <div className="container mx-auto px-4 pb-20">
          <div className="text-center mb-12 section-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold text-[#f0b405] tracking-wider mb-4">
              FAQs
            </h1>
            <p className="text-white/80 text-lg md:text-2xl font-semibold uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
              Everything you need to know
            </p>
            <div className="w-24 h-1 bg-[#f0b405] mx-auto mt-6 rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto  section-fade-in">
            <GlassyContainer className="rounded-3xl p-6 md:p-12">
              <div className="flex flex-col">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  />
                ))}
              </div>
            </GlassyContainer>
          </div>
        </div>
      </main>

      <SocialMediaFooter />
    </div>
  );
}
