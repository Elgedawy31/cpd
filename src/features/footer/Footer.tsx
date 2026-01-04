"use client";

import { useTranslations, useLocale } from "next-intl";
import { Mail, Phone, Clock, Facebook, Linkedin, Twitter, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="w-full bg-[#0F0F0F] text-white py-12 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-y-12">

        {/* Column 1: CPD Description */}
        <div className="space-y-4 lg:col-span-1">
          <h2 className="text-2xl font-bold text-white">CPD</h2>
          <p className="text-sm opacity-70 leading-relaxed max-w-sm">{t("description")}</p>
        </div>

        {/* Column 2: Contact Information */}
        <div className="space-y-6 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">{t("contactInfo")}</h3>
          <ul className="space-y-3 text-sm opacity-70">
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-1" /> info@cpd.com
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-1" /> +20 100 123 4567
            </li>
            <li>
              <span className="flex items-start gap-2">
                <Clock size={16} className="mt-1" /> {t("workTime")}
              </span>
              <ul className="space-y-2 text-sm opacity-70 leading-relaxed px-0 ms-6">
                <li>{t("workTimes.nl")}</li>
                <li>{t("workTimes.sa")}</li>
                <li>{t("workTimes.eg")}</li>
                <li>{t("workTimes.uk")}</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Column 3: Our Locations */}
        <div className="space-y-6 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">{t("locations")}</h3>
          <ul className="space-y-2 text-sm opacity-70 leading-relaxed px-0">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" />{t('location1')}</li>
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" />{t('location2')}</li>
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" />{t('location3')}</li>
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" />{t('location4')}</li>
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" />{t('location5')}</li>
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" />{t('location6')}</li>
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" />{t('location7')}</li>
          </ul>
        </div>

        {/* Column 4: Links & Follow Us */}
        <div className="space-y-6 lg:col-span-1">
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link href={`/${locale}/`} className="hover:text-primary transition">{t("home")}</Link></li>
              <li><Link href={`/${locale}/about`} className="hover:text-primary transition">{t("about")}</Link></li>
              <li><Link href={`/${locale}/services`} className="hover:text-primary transition">{t("services")}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-primary transition">{t("contact")}</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">{t("followUs")}</h3>
            <div className="flex gap-4">
              <Link href="https://facebook.com" target="_blank" className="hover:text-primary transition"><Facebook size={20} /></Link>
              <Link href="https://linkedin.com" target="_blank" className="hover:text-primary transition"><Linkedin size={20} /></Link>
              <Link href="https://twitter.com" target="_blank" className="hover:text-primary transition"><Twitter size={20} /></Link>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm opacity-60 text-white">
        © {new Date().getFullYear()} CPD. {t("rights")}
      </div>
    </footer>
  );
}
