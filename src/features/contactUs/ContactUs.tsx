"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Send, Loader2, CheckCircle, Mail, User, MessageSquare, Phone, Building, Tag } from "lucide-react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslations, useLocale } from "next-intl";
import CustomHeader from "@/components/CustomHeader";
import CustomDivider from "@/components/CustomDivider";

export default function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale();

  const contactSchema = z.object({
    name: z.string().min(2, t("errors.name")),
    phone: z.string().min(1, t("errors.phone")),
    email: z.string().email(t("errors.email")),
    companyName: z.string().min(2, t("errors.companyName")),
    subject: z.string().min(5, t("errors.subject")),
    message: z.string().min(10, t("errors.message")),
    architecturalDesign: z.string().min(1, t("errors.architecturalDesign")),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setIsSuccess(false);
    // In a real application, you would send this data to your backend
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 3000);
  };
console.log(getValues("phone"))
  return (
    <section
      id="contact"
      className={`bg-gradient-to-b from-secondary/20 to-background py-16 lg:py-24 relative overflow-hidden ${
        locale === "ar" ? "text-right" : "text-left"
      }`}
    >
      <div
        className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10"
        data-aos="fade-up"
      >
              <CustomHeader title={t('title')} subTitle={t('subtitle')}  />
              <CustomDivider />

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl mx-auto rounded-lg shadow-xl p-8 md:p-12 space-y-6 bg-background/90 backdrop-blur-sm"
        >
          {/* Name and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-foreground/80">
                <User size={18} /> {t("name")}
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder={t("namePlaceholder")}
                className={`w-full px-4 py-3 rounded-lg border text-foreground/90 bg-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  errors.name ? "border-destructive" : "border-border"
                }`}
              />
              {errors.name && (
                <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-foreground/80">
                <Phone size={18} /> {t("phone")}
              </label>
              <PhoneInput
                defaultCountry="US"
                placeholder={t("phonePlaceholder")}
                value={getValues("phone")}
                onChange={(value) => setValue("phone", value || "")}
                className={`w-full px-4 py-3 rounded-lg border text-foreground/90 bg-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  errors.phone ? "border-destructive" : "border-border"
                }`}
              />
              {errors.phone && (
                <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-foreground/80">
              <Mail size={18} /> {t("email")}
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder={t("emailPlaceholder")}
              className={`w-full px-4 py-3 rounded-lg border text-foreground/90 bg-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                errors.email ? "border-destructive" : "border-border"
              }`}
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Architectural Design Select */}
          <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-foreground/80">
                <Building size={18} /> {t("architecturalDesign")}
              </label>
            <select
              {...register("architecturalDesign")}
              className={`w-full px-4 py-3 rounded-lg border text-foreground/90 bg-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                errors.architecturalDesign ? "border-destructive" : "border-border"
              }`}
            >
              <option value="">{t("selectArchitecturalDesign")}</option>
              <option value="CPV Arabia">CPV Arabia</option>
              <option value="Dome">Dome</option>
              <option value="FDH">FDH</option>
              <option value="Designal Engineering">Designal Engineering</option>
              <option value="DomApp">DomApp</option>
              <option value="Dlalat Technology Co. Ltd.">Dlalat Technology Co. Ltd.</option>
            </select>
            {errors.architecturalDesign && (
              <p className="text-destructive text-sm mt-1">{errors.architecturalDesign.message}</p>
            )}
          </div>

          {/* Company Name and Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-foreground/80">
                <Building size={18} /> {t("companyName")}
              </label>
              <input
                type="text"
                {...register("companyName")}
                placeholder={t("companyNamePlaceholder")}
                className={`w-full px-4 py-3 rounded-lg border text-foreground/90 bg-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  errors.companyName ? "border-destructive" : "border-border"
                }`}
              />
              {errors.companyName && (
                <p className="text-destructive text-sm mt-1">{errors.companyName.message}</p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-foreground/80">
                <Tag size={18} /> {t("subject")}
              </label>
              <input
                type="text"
                {...register("subject")}
                placeholder={t("subjectPlaceholder")}
                className={`w-full px-4 py-3 rounded-lg border text-foreground/90 bg-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  errors.subject ? "border-destructive" : "border-border"
                }`}
              />
              {errors.subject && (
                <p className="text-destructive text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-foreground/80">
              <MessageSquare size={18} /> {t("message")}
            </label>
            <textarea
              {...register("message")}
              rows={5}
              placeholder={t("messagePlaceholder")}
              className={`w-full px-4 py-3 rounded-lg border text-foreground/90 bg-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                errors.message ? "border-destructive" : "border-border"
              }`}
            />
            {errors.message && (
              <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full sm:w-fit"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("sending")}
                </>
              ) : (
                <>
                  {t("send")} <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="flex items-center justify-center gap-2 text-success font-semibold mt-4 animate-fade-in">
              <CheckCircle size={20} />
              {t("success")}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
