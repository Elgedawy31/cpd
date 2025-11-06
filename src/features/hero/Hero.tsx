"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  // Expanded stats data
  const stats = [
   'Countries',
   'Clients',
   'Employees',
   'ProjectsCompleted',
   'Companies'
  ];
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, mirror: false });
  }, []);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
    id="hero"
      className={`relative w-full min-h-screen overflow-hidden ${
        locale === "ar" ? "text-right" : "text-left"
      }`}
    >
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image
          src="/hero-bg.jpg"
          alt="Hero Background"
          fill
          className="object-cover brightness-75"
          priority
        />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 flex flex-col justify-center min-h-[70vh] ">
        <h1  data-aos="fade-up" className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          {t("title")}
        </h1>

        <p  data-aos="fade-up" data-delay='200' className="text-white/80 text-md md:text-lg ps-2 mb-3 max-w-xl font-bold">
        {t("subtitle1")}
        </p>
      </div>

      {/* Stats Section */}
      <div
      data-aos="fade-up" data-aos-delay="600"
        ref={ref}
        className="absolute bottom-0 w-full bg-black/50 backdrop-blur-md py-8"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-2 sm:grid-cols-5 gap-6 text-center text-white">
          
          
          {stats.map((stat)=>(
             <div key={stat}  className="flex flex-col gap-2">
              <p className="text-3xl sm:text-4xl font-bold text-primary-200">
                +
                {inView ? (
                  <CountUp
                    start={0}
                    end={Number(t(`stats.${stat}.value`))}
                    duration={5.5}
                    separator=","
                  />
                ) : (
                  0
                )}
              </p>
              <p className="text-sm  uppercase tracking-wide">
                {t(`stats.${stat}.label`)}
              </p>
            </div>
          ))}
           
        </div>
      </div>
    </section>
  );
}
