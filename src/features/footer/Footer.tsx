"use client";

import { useTranslations, useLocale } from "next-intl";
import { Facebook, Linkedin, Twitter, Youtube, Instagram, MessageCircle, ChevronDown } from "lucide-react";
import Link from "next/link";
import LanguageDropdown from "../navbar/LanguageDropdown";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="w-full bg-[#0F0F0F] text-white py-8 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-y-12">

        {/* Column 1: DomApp Description, Language, Address, Socials */}
        <div className="space-y-6 lg:col-span-2">
          <h2 className="text-2xl font-bold text-white">DomApp</h2>
          <LanguageDropdown scrolled={false} isRTL={locale === 'ar'} />
          <p className="text-sm opacity-70 leading-relaxed max-w-sm">{t("domAppDescription")}</p>

          <div className="space-y-3">
            <h3 className="text-base font-semibold">Address</h3>
            <ul className="space-y-2 text-sm opacity-70">
              <li>
                <h4 className="font-medium">Egypt</h4>
                <p className="ms-2">- {t("location2")}</p>
                <p className="ms-2">- {t("location4")}</p>
              </li>
              <li>
                <h4 className="font-medium">Netherlands</h4>
                <p className="ms-2">- {t("location1")}</p>
              </li>
            </ul>
          </div>

          <div className="mt-6 flex gap-4">
            <Link href="https://youtube.com" target="_blank" className="hover:text-primary transition"><Youtube size={20} /></Link>
            <Link href="https://facebook.com" target="_blank" className="hover:text-primary transition"><Facebook size={20} /></Link>
            <Link href="https://linkedin.com" target="_blank" className="hover:text-primary transition"><Linkedin size={20} /></Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-primary transition"><Twitter size={20} /></Link>
            <Link href="https://instagram.com" target="_blank" className="hover:text-primary transition"><Instagram size={20} /></Link>
            <Link href="https://whatsapp.com" target="_blank" className="hover:text-primary transition"><MessageCircle size={20} /></Link>
          </div>
        </div>

        {/* Column 2: About Us & Legal Policies */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("aboutUs.home")}</h3>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link href={`/${locale}/`} className="hover:text-primary transition">{t("aboutUs.home")}</Link></li>
              <li><Link href={`/${locale}/products`} className="hover:text-primary transition">{t("aboutUs.products")}</Link></li>
              <li><Link href={`/${locale}/what-we-do`} className="hover:text-primary transition">{t("aboutUs.whatWeDo")}</Link></li>
              <li><Link href={`/${locale}/why-us`} className="hover:text-primary transition">{t("aboutUs.whyUs")}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-primary transition">{t("aboutUs.contactUs")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("legalPolicies")}</h3>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link href={`/${locale}/privacy`} className="hover:text-primary transition">{t("privacyPolicy")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Column 3: Products */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold mb-4">{t("products.title")}</h3>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link href={`/${locale}/products/cladcut`} className="hover:text-primary transition">{t("products.cladCut")}</Link></li>
            <li><Link href={`/${locale}/products/windmaster`} className="hover:text-primary transition">{t("products.windMaster")}</Link></li>
            <li><Link href={`/${locale}/products/bondify-crm`} className="hover:text-primary transition">{t("products.bondifyCrm")}</Link></li>
            <li><Link href={`/${locale}/products/rdapp`} className="hover:text-primary transition">{t("products.rdApp")}</Link></li>
            <li><Link href={`/${locale}/products/chatplus`} className="hover:text-primary transition">{t("products.chatPlus")}</Link></li>
            <li><Link href={`/${locale}/products/byld`} className="hover:text-primary transition">{t("products.byld")}</Link></li>
          </ul>
        </div>

        {/* Column 4: Services */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold mb-4">{t("services.title")}</h3>
          <ul className="space-y-2 text-sm opacity-70">
            <li>
              <Link href={`/${locale}/services/development`} className="hover:text-primary transition flex items-center gap-1">
                {t("services.developmentServices")}
                <ChevronDown size={14} className="text-white opacity-70" />
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/services/facade-fabrication`} className="hover:text-primary transition flex items-center gap-1">
                {t("services.facadeFabrication")}
                <ChevronDown size={14} className="text-white opacity-70" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 5: Exclusive Dealer */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold mb-4">{t("exclusiveDealer.title")}</h3>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link href={`/${locale}/exclusive-dealer/dlalat`} className="hover:text-primary transition">{t("exclusiveDealer.dlalat")}</Link></li>
          </ul>
        </div>

        {/* Column 6: Community */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold mb-4">{t("community.title")}</h3>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link href={`/${locale}/blog`} className="hover:text-primary transition">{t("community.blog")}</Link></li>
          </ul>
        </div>

      </div>

      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm opacity-60 text-white">
        © {new Date().getFullYear()} DomApp. All rights reserved.
      </div>
    </footer>
  );
}
