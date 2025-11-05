"use client";
import { useLottie } from "lottie-react";
import chat from "@/lotties/about-1.json";

export default function About_lottie_1() {
  const defaultOptions = {
    animationData: chat,
    loop: true,
    width: 200,
  };

  const { View } = useLottie(defaultOptions);

  return (
      <div className="h-fit">{View}</div>
  );
}
