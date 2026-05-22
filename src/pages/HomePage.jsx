import React, { useEffect, useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import ProblemSection from '../components/home/ProblemSection';
import ServicesSection from '../components/home/ServicesSection';
import WhyChooseSection from '../components/home/WhyChooseSection';
import PricingSection from '../components/home/PricingSection';
import WorkflowSection from '../components/home/WorkflowSection';
import PortfolioSection from '../components/home/PortfolioSection';
import CatalogPreviewSection from '../components/home/CatalogPreviewSection';
import TestimonialSection from '../components/home/TestimonialSection';
import ServiceAreasSection from '../components/home/ServiceAreasSection';
import FAQSection from '../components/home/FAQSection';
import ClosingCTASection from '../components/home/ClosingCTASection';
import publicContentService from '../services/publicContentService';
import { fallbackHomeContent } from '../data/fallbackContent';

const withFallback = (content) => ({
  banners: content?.banners?.length ? content.banners : fallbackHomeContent.banners,
  portfolio_preview: content?.portfolio_preview?.length ? content.portfolio_preview : fallbackHomeContent.portfolio_preview,
  katalog_preview: content?.katalog_preview?.length ? content.katalog_preview : fallbackHomeContent.katalog_preview,
  testimonials: content?.testimonials?.length ? content.testimonials : fallbackHomeContent.testimonials,
  blog_preview: content?.blog_preview?.length ? content.blog_preview : fallbackHomeContent.blog_preview,
});

const HomePage = () => {
  const [content, setContent] = useState(fallbackHomeContent);

  useEffect(() => {
    let mounted = true;

    publicContentService.getHome()
      .then((response) => {
        if (mounted) setContent(withFallback(response.data));
      })
      .catch(() => {
        if (mounted) setContent(fallbackHomeContent);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="w-full">
      <HeroSection banners={content.banners} />
      <ProblemSection />
      <ServicesSection />
      <WhyChooseSection />
      <PricingSection />
      <WorkflowSection />
      <PortfolioSection portfolios={content.portfolio_preview} />
      <CatalogPreviewSection products={content.katalog_preview} />
      <TestimonialSection testimonials={content.testimonials} />
      <ServiceAreasSection />
      <FAQSection />
      <ClosingCTASection />
    </div>
  );
};

export default HomePage;
