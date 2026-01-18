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
import StatisticsSection from "@/features/statistics/Statistics";
import { useLocale } from "next-intl";
import WorldOutlineMap from "@/features/footer/WorldMap";


export default function HomePage() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  return (
    <main className="">
      <SplashScreen />
      <Navbar />
      <Hero />
      <StatisticsSection />
      <AboutSection />
      <BusinessAreas />
      <OurCompanies />
      <WhyChooseUs/> 
      <OurPartners/> 
      {/* Contact and World Map Section */}
      <section className={`bg-linear-to-b  py-8 ${isRTL ? "text-right" : "text-left"}`}>
        <div className="container mx-auto px-4 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={isRTL ? "lg:order-2" : "lg:order-1"}>
              <ContactSection />
            </div>
            <div className={isRTL ? "lg:order-1" : "lg:order-2"}>
              <WorldOutlineMap />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
