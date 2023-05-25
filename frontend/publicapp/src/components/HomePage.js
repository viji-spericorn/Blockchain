import React from 'react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import DepartmentsSection from './DepartmentsSection';
import EyeCareSection from './EyeCareSection';
import AboutSection from './AboutSection';
import HealthcareSection from './HealthcareSection';
import DoctorsSection from './DoctorsSection';
import PeopleWhoLoveUs from './PeopleWhoLoveUs';
import Testimonials from './Testimonials';
import Appointment from './Appointment';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div>
      <Navigation />
      <HeroSection />s
      <DepartmentsSection />
      <EyeCareSection />
      <AboutSection />
      <HealthcareSection />
      <DoctorsSection />
      <PeopleWhoLoveUs />
      <Testimonials />
      <Appointment />
      <Footer />
    </div>
  );
};

export default HomePage;
