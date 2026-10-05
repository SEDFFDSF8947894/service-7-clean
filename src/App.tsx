import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PriceCalculator } from './components/PriceCalculator';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ServicesBento } from './components/ServicesBento';
import { PackagesSection } from './components/PackagesSection';
import { CoverageAreas } from './components/CoverageAreas';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSocialSection } from './components/ContactSocialSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServicePreset, setSelectedServicePreset] = useState<string | undefined>(undefined);
  const [estimatePreset, setEstimatePreset] = useState<{
    serviceName: string;
    area: number;
    price: string;
    details: string;
  } | null>(null);

  const handleOpenBooking = (servicePreset?: string) => {
    setSelectedServicePreset(servicePreset);
    setEstimatePreset(null);
    setBookingModalOpen(true);
  };

  const handleOpenCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookWithEstimate = (estimate: {
    serviceName: string;
    area: number;
    price: string;
    details: string;
  }) => {
    setEstimatePreset(estimate);
    setBookingModalOpen(true);
  };

  const handleSelectPackage = (packageName: string) => {
    setSelectedServicePreset(undefined);
    setEstimatePreset({
      serviceName: packageName,
      area: 200,
      price: 'حسب الباقة المختارة',
      details: `باقة مميزة: ${packageName}`,
    });
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* 3-Zone Top Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenCalculator={handleOpenCalculator}
      />

      {/* Main Content Flow: Proposition -> Mechanism -> Proof -> Action */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenCalculator={handleOpenCalculator}
        />

        {/* Core Capabilities Bento Grid */}
        <ServicesBento
          onSelectService={(serviceId) => handleOpenBooking(serviceId)}
        />

        {/* Interactive Instant Pricing Calculator */}
        <PriceCalculator
          onBookWithEstimate={handleBookWithEstimate}
        />

        {/* Before and After Interactive Comparison */}
        <BeforeAfterSlider />

        {/* Packages for Turnkey Post-construction & Industrial */}
        <PackagesSection
          onSelectPackage={handleSelectPackage}
        />

        {/* Coverage, 4 Pillars of Excellence, and FAQ */}
        <CoverageAreas />

        {/* Social Proof & Customer Reviews */}
        <TestimonialsSection />

        {/* Contact Hub & Social Channels (Phone, WhatsApp, Messenger, Facebook, Instagram, TikTok) */}
        <ContactSocialSection />
      </main>

      {/* Quiet Footer */}
      <Footer />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false);
          setEstimatePreset(null);
          setSelectedServicePreset(undefined);
        }}
        servicePreset={selectedServicePreset}
        estimatePreset={estimatePreset}
      />

      {/* Floating Call & WhatsApp Action Buttons */}
      <FloatingActions
        onOpenBooking={() => handleOpenBooking()}
      />
    </div>
  );
}
