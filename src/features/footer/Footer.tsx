"use client";

import { useTranslations, useLocale } from "next-intl";
import { Mail, Phone, Clock, Facebook, Linkedin, Twitter, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="w-full border-t border-borderColor bg-primary text-text py-12 px-6 md:px-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-8 gap-10">

        {/* Logo & Description */}
        <div className="space-y-4 text-white md:col-span-2">
          <h2 className="text-2xl font-semibold text-white">CPD</h2>
          <p className="text-sm opacity-80 leading-relaxed">{t("description")}</p>
        </div>

        {/* Contact Info */}
        <div className="text-white md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">{t("contactInfo")}</h3>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-1" /> info@cpd.com
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-1" /> +20 100 123 4567
            </li>
            <li className="flex items-start gap-2">
              <Clock size={16} className="mt-1" /> {t("workTime")}
            </li>
          </ul>
        </div>

        {/* Addresses */}
        <div className="text-white md:col-span-3">
          <h3 className="text-lg font-semibold mb-4">{t("locations")}</h3>
          <ul className="space-y-2 text-sm opacity-80 leading-relaxed px-0">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" /> 10th Floor, Weena 290, City Centre, Rotterdam 3012 NJ, Netherlands</li>
           <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" /> Samir Abd El-Raouf, Al Manteqah Al Thamenah, Nasr City, Cairo, Egypt</li>
           <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" />8th District, 21 Samir Abd El-Raouf St, 2nd Floor, Nasr City, Cairo, Egypt</li>
           <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" />Al-Mottaheda Tower, 2nd & 9th Floor, KFS, Egypt</li>
           <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" />Gadallah Tower, 3rd & 4th Floor, KFS, Egypt</li>
           <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" />Office 17, North Ring Road, Al Wady Dist, Exit 6, Riyadh, Saudi Arabia</li>
           <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" />Al Malaz, Al-Riyadh, Saudi Arabia</li>
          </ul>
        </div>

        {/* Quick Links & Socials */}
        <div className="text-white md:col-span-1"> 
          <h3 className="text-lg font-semibold mb-4">{t("quickLinks")}</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href={`/${locale}`} className="hover:text-primary transition">{t("home")}</Link></li>
            <li><Link href={`/${locale}/about`} className="hover:text-primary transition">{t("about")}</Link></li>
            <li><Link href={`/${locale}/services`} className="hover:text-primary transition">{t("services")}</Link></li>
            <li><Link href={`/${locale}/contact`} className="hover:text-primary transition">{t("contact")}</Link></li>
          </ul>

          <div className="mt-6 text-white">
            <h3 className="text-lg font-semibold mb-3">{t("followUs")}</h3>
            <div className="flex gap-4">
              <Link href="https://facebook.com" target="_blank" className="hover:text-primary transition"><Facebook size={20} /></Link>
              <Link href="https://linkedin.com" target="_blank" className="hover:text-primary transition"><Linkedin size={20} /></Link>
              <Link href="https://twitter.com" target="_blank" className="hover:text-primary transition"><Twitter size={20} /></Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-borderColor pt-6 text-center text-sm opacity-60 text-white">
        © {new Date().getFullYear()} CPD. {t("rights")}
      </div>
    </footer>
  );
}
