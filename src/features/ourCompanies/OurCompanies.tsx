"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import CustomHeader from "@/components/CustomHeader";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function OurCompanies() {
  const t = useTranslations("companies");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, mirror: false });
  }, []);

  const cards = [
    {
      key: "cpv",
      title: t("cpv.title"),
      description: t("cpv.description"),
      url: "https://cpvarabia.com/",
      logo: "/ourCompanies/cpv-logo.png",
    },
    {
      key: "domApp",
      title: t("domApp.title"),
      description: t("domApp.description"),
      url: "https://www.domapphub.com/",
      logo: "/ourCompanies/domApp-logo.png",
    },
    {
      key: "domeFdh",
      title: t("domeFdh.title"),
      description: t("domeFdh.description"),
      url: "https://www.domefdh.com/",
      logo: "/ourCompanies/Dome.png",
    },
    {
      key: "designalEngineering",
      title: t("designalEngineering.title"),
      description: t("designalEngineering.description"),
      url: "https://www.designal.cc/",
      logo: "/ourCompanies/designalEngineering.png",
    },
    {
      key: "dlalat",
      title: t("dlalat.title"),
      description: t("dlalat.description"),
      url: "https://www.dlalat.com/",
      logo: "/ourCompanies/dlalatDark.png",
    },


  ];

  return (
    <section
      id="companies"
      className="relative w-full py-12 bg-linear-to-b from-primary-50/60 via-primary-100 to-primary-50/60 "
    >
           <CustomHeader title={t('title')} subTitle={t('subtitle')} />
<div   className="container m-auto px-6 lg:px-12">
   <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={15}
      slidesPerView={1}
      navigation={true} 
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      breakpoints={{
        518: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
      }}
      className="mySwiper"
    >
      {cards.map((card,index) => (
        <SwiperSlide key={card.key} >
          <div className="d-flex flex-column align-items-center justify-start cursor-pointer"
          data-aos="fade-up"
     data-aos-easing="ease-out-cubic"
     data-aos-duration={`${(index+1) * 250}`}
          >
            <div className="border-b  border-border p-3  rounded-xl shadow-md relative pt-6 pb-8 ">
              <Image
              fill
                src={card.logo}
                alt={card.title}
                className="img-fluid"
                style={{ maxHeight: "100px", objectFit: "contain" }}
              />
            </div>
            <p className="mt-3 text-start text-sm font-normal text-muted-foreground py-2">{card.description}</p>
            <a href={card.url} target="_blank" rel="noopener noreferrer" className=" text-md font-medium text-primary hover:opacity-75 flex justify-end px-5 align-center mt-2">
         <span>{t('visit')}</span>   <ChevronRight className="text-primary w-5 h-7 " />
            </a>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
</div>
    
    </section>
  );
}
