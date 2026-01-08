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

export default function HomePage() {
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
      <Footer />
    </main>
  );
}
