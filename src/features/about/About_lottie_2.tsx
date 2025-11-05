"use client";
import { useLottie } from "lottie-react";
import chat from "@/lotties/about-2.json";

export default function About_lottie_2() {
  const defaultOptions = {
    animationData: chat,
    loop: true,
    width: 100,
  };

  const { View } = useLottie(defaultOptions);

  return (
      <div className="">{View}</div>
  );
}
