"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Send, Loader2, CheckCircle, Mail, User, MessageSquare } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslations, useLocale } from "next-intl";
import CustomHeader from "@/components/CustomHeader";

export default function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale();

  const contactSchema = z.object({
    name: z.string().min(2, t("errors.name")),
    email: z.string().email(t("errors.email")),
    message: z.string().min(10, t("errors.message")),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setIsSuccess(false);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section
      id="contact"
      className={`bg-linear-to-b from-primary-50/60 via-primary-100 to-primary-50/60 py-8 relative overflow-hidden ${
        locale === "ar" ? "text-right" : "text-left"
      }`}
    >
      <div className="absolute inset-0  pointer-events-none" />

      <div
        className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10"
        data-aos="fade-up"
      >
              <CustomHeader title={t('title')} subTitle={t('subtitle')} />

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-card shadow-xl rounded-2xl p-8 md:p-10 space-y-6 border border-border"
        >
          {/* Name */}
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
              className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> {t("sending")}
                </>
              ) : (
                <>
                  <Send size={20} /> {t("send")}
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
