import Header from "../components/blocks/Header";
import HeroSection from "../components/blocks/HeroSection";
import TrailerSection from "../components/blocks/TrailerSection";
import CountdownSection from "../components/blocks/CountdownSection";
import EventBannerSection from "../components/blocks/EventBannerSection";
import TimelineSection from "../components/blocks/TimelineSection";
import MasonryGridSection from "../components/blocks/MasonryGridSection";
import ActionButtonsSection from "../components/blocks/ActionButtonsSection";
import PartnersSection from "../components/blocks/PartnersSection";
import Footer from "../components/blocks/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-neutral-content">
      <Header />

      {/* Main Content */}
      <main className="grow relative z-10">
        <HeroSection />
        <TrailerSection />
        <CountdownSection />
        <EventBannerSection />
        <TimelineSection />
        <MasonryGridSection />
        <ActionButtonsSection />
        <PartnersSection />
      </main>

      <Footer />
    </div>
  );
}
