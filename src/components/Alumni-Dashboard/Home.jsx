import React from "react";
import HeroSection from "./HeroSection";
import WhatWeOfferSection from "./WhatWeOfferSection";
import ExploreNetworkSection from "./ExploreNetworkSection";
import AlumniVoicesSection from "./AlumniVoicesSection";
import VisionSection from "./VisionSection";
import StayInformedSection from "./StayInformedSection";
import ReconnectSection from "./ReconnectSection";

export default function Home() {
  return (
    <div >
      <HeroSection />
      
      <ExploreNetworkSection />
      <WhatWeOfferSection/>
      <StayInformedSection />
      <AlumniVoicesSection />
      <VisionSection />
      
      <ReconnectSection />
    </div>
  );
}
