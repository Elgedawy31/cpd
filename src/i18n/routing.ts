import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // فقط اللغتين المطلوبتين
  locales: ["en", "ar"],
  
  // اللغة الافتراضية
  defaultLocale: "en",

  // يجعل اللغة دائمًا في المسار مثل /en/about أو /ar/contact
  localePrefix: "always",
});
