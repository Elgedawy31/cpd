import AboutSection from "@/features/about/About";
import ContactSection from "@/features/contactUs/ContactUs";
import Footer from "@/features/footer/Footer";
import Hero from "@/features/hero/Hero";
import Navbar from "@/features/navbar/Navbar";
import OurCompanies from "@/features/ourCompanies/OurCompanies";
import OurPartners from "@/features/ourPartners/OurPartners";
import WhyChooseUs from "@/features/whyChooseUs/WhyChooseUs";
import BusinessAreas from "@/features/businessAreas/BusinessAreas";
import SplashScreen from "@/components/SplashScreen";
import CustomHeader from "@/components/CustomHeader";
import { useTranslations, useLocale } from "next-intl";
import WorldOutlineMap from "@/features/footer/WorldMap";


export default function HomePage() {
  const t = useTranslations("WorldMapSection");
  const locale = useLocale();
  const isRTL = locale === "ar";
  return (
    <main className="">
      <SplashScreen />
      <Navbar />
      <Hero />
      <AboutSection />
      <BusinessAreas />
      <OurCompanies />
      <WhyChooseUs/> 
      <OurPartners/> 
      <ContactSection />
      <div className={` ${isRTL ? "text-right" : "text-left"}`}>
        <WorldOutlineMap />
      </div>
      <Footer />
    </main>
  );
}
