import React from 'react';
import HeroSection from '../LandingPages/Herosection'; 
import Footer from '../LandingPages/Footer'; 
import Navbar from "../LandingPages/Navbar";
import Features from "../LandingPages/Features";
import Solution from '../LandingPages/Solution';
import Team from '../LandingPages/Team';
function LandingPage() {
  return (
    <div>
      <Navbar />
      <HeroSection /> 
      <Solution />
      <Features />
      <Team />
      <Footer /> {/* Add Footer component here */}
      {/* Other landing page content here: */}
      {/* e.g., features, benefits, testimonials, contact form */}
    </div>
  );
}

export default LandingPage;