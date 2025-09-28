import React from 'react';

// Import all the sections that make up your landing page
import AlumniVoicesSection from '../components/Alumni-Dashboard/AlumniVoicesSection';
import ExploreNetworkSection from '../components/Alumni-Dashboard/ExploreNetworkSection';
import HeroSection from '../components/Alumni-Dashboard/HeroSection';
import ReconnectSection from '../components/Alumni-Dashboard/ReconnectSection';
import StayInformedSection from '../components/Alumni-Dashboard/StayInformedSection';
import VisionSection from '../components/Alumni-Dashboard/VisionSection';
import WhatWeOfferSection from '../components/Alumni-Dashboard/WhatWeOfferSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExploreNetworkSection />
      <WhatWeOfferSection />
      <StayInformedSection />
      <AlumniVoicesSection />
      <ReconnectSection />
      <VisionSection />
    </>
  );
}