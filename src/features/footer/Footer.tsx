"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  Mail,
  Phone,
  Clock,
} from "lucide-react";
import Link from "next/link";
import LanguageDropdown from "../navbar/LanguageDropdown";


export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <footer className="w-full bg-[#0F0F0F] text-white py-10 px-6 md:px-12">
      <div className="container mx-auto">
        {/* Logo / Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">CPD</h2>
        </div>

        {/* Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">{t("quickLinks")}</h3>
            <ul className="space-y-2 text-sm opacity-70">
              <li>
                <Link href={`/${locale}/`} className="hover:text-gray-300">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="hover:text-gray-300">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-gray-300">
                  {t("services")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-gray-300">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
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
          <div className="space-y-6">
            <LanguageDropdown scrolled={false} isRTL={isRTL} />

            <p className="text-sm opacity-70 leading-relaxed">
              {t("description")}
            </p>

            <div>
              <h3 className="text-lg font-semibold mb-3">{t("followUs")}</h3>
              <div className="flex gap-4">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="text-white/70 transition-colors duration-200 hover:text-[#1877F2]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                    />
                  </svg>
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  className="text-white/70 transition-colors duration-200 hover:text-[#5ba2ea]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                    />
                    <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                  </svg>
                </Link>
                <Link
                  href="https://x.com"
                  target="_blank"
                  className="text-white/70 transition-colors duration-200 hover:text-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M 18.492188 2.9941406 A 0.50005 0.50005 0 0 0 18.113281 3.1816406 L 13.060547 9.3164062 L 9.0566406 3.7714844 C 8.7066406 3.2874844 8.1458281 3 7.5488281 3 L 4.078125 3 C 3.420125 3 3.0388281 3.7462969 3.4238281 4.2792969 L 9.8652344 13.199219 L 4.1132812 20.181641 A 0.50090307 0.50090307 0 1 0 4.8867188 20.818359 L 10.470703 14.037109 L 14.943359 20.228516 C 15.293359 20.712516 15.854172 21 16.451172 21 L 19.921875 21 C 20.579875 21 20.961172 20.253703 20.576172 19.720703 L 13.667969 10.15625 L 18.886719 3.8183594 A 0.50005 0.50005 0 0 0 18.492188 2.9941406 z M 4.4550781 4 L 7.5507812 4 C 7.8257813 4 8.0850937 4.1324687 8.2460938 4.3554688 L 19.544922 20 L 16.451172 20 C 16.176172 20 15.916859 19.867531 15.755859 19.644531 L 4.4550781 4 z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm opacity-60">
          © {new Date().getFullYear()} CPD. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
