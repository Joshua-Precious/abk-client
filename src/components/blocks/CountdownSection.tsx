import React, { useState, useEffect } from "react";

export default function CountdownSection() {
  // Target date: September 25, 2026
  const targetDate = new Date("2026-09-25T18:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <section className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 w-full text-center">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-8 w-full max-w-[100vw] overflow-hidden">
          {timeBlocks.map((block, index) => (
            <div
              key={index}
              className="liquid-glass chromatic-edge rounded-xl md:rounded-2xl"
            >
              <div className="bg-black/40 backdrop-blur-md rounded-lg md:rounded-xl py-4 px-1 sm:py-6 sm:px-4 md:py-8 md:px-12 flex flex-col items-center justify-center border border-white/5 h-full">
                <span className="text-2xl sm:text-4xl md:text-7xl p-1 md:p-2 font-black text-white drop-shadow-md">
                  {String(block.value).padStart(2, "0")}
                </span>
                <span className="text-[0.5rem] sm:text-[0.6rem] md:text-sm font-bold text-white/60 mt-2 md:mt-4 uppercase text-center w-full overflow-hidden text-ellipsis">
                  {block.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        <span className="text-white text-2xl font-bold uppercase">
          25th September, 2026
        </span>
      </div>
    </section>
  );
}
