"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect } from "react";
import {
  Mail,
  Phone,
  Clock,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import LanguageDropdown from "../navbar/LanguageDropdown";
import AOS from "aos";
import "aos/dist/aos.css";


export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const isRTL = locale === "ar";

  useEffect(() => {
    AOS.init({ 
      duration: 1000, 
      once: true, 
      mirror: false,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <footer className="w-full bg-[#0F0F0F] text-white py-10 px-6 md:px-12">
      <div className="container mx-auto">
        {/* Logo / Title */}
        <div
          className="text-center mb-12"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          <h2 className="text-3xl font-bold">CPD</h2>
        </div>

        {/* Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {/* Quick Links */}
          <div
            className="space-y-6"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <h3 className="text-lg font-semibold">{t("quickLinks")}</h3>
            <ul className="space-y-2 text-sm opacity-70">
              <li>
                <Link href={`/${locale}/`} className="hover:text-primary">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="hover:text-primary">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-primary">
                  {t("services")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-primary">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div
            className="space-y-6"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="300"
          >
            <h3 className="text-lg font-semibold">{t("contactInfo")}</h3>
            <ul className="space-y-3 text-sm opacity-70">
              <li className="flex gap-2">
                <Mail size={16} /> info@cpd.com
              </li>
              <li className="flex gap-2">
                <Phone size={16} /> +20 100 123 4567
              </li>
              <li>
                <div className="flex gap-2">
                  <Clock size={16} /> {t("workTime")}
                </div>
                <ul className="mt-2 ml-6 space-y-1">
                  <li>{t("workTimes.nl")}</li>
                  <li>{t("workTimes.sa")}</li>
                  <li>{t("workTimes.eg")}</li>
                  <li>{t("workTimes.uk")}</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Description + Social */}
          <div
            className="space-y-6"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            <LanguageDropdown scrolled={false} isRTL={isRTL} />

            <p className="text-sm opacity-70 leading-relaxed">
              {t("description")}
            </p>

            <div>
              <h3 className="text-lg font-semibold mb-3">{t("followUs")}</h3>
              <div className="flex gap-4">
                <Link href="https://facebook.com" target="_blank">
                  <Facebook size={20} />
                </Link>
                <Link href="https://linkedin.com" target="_blank">
                  <Linkedin size={20} />
                </Link>
                <Link href="https://twitter.com" target="_blank">
                  <Twitter size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-12 border-t border-gray-800 pt-6 text-center text-sm opacity-60"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="500"
        >
          © {new Date().getFullYear()} CPD. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
