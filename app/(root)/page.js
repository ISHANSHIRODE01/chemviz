"use client";
import React from "react";
import { useEffect } from "react";
import { useSession } from "@clerk/nextjs";
import "./style.css";
import Hero from "./../../components/HomeUI/hero";
import ChooseUs from "./../../components/HomeUI/chooseus";
import Learn from "./../../components/HomeUI/learn";
import StudentAndEducator from "./../../components/HomeUI/studentandeducator";
import Testimonial from "./../../components/HomeUI/testimonial";
import Cta from "./../../components/HomeUI/cta";
import ImagesSliderDemo from "./../../components/HomeUI/loginslider";


const ChemistryLandingPage = () => {
  const { isLoaded, session, isSignedIn } = useSession()
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">

      {/* Hero Section */}
      {!session && <Hero />}
      {session && <ImagesSliderDemo />}

      {/* Why Choose Us */}
      <ChooseUs />

      {/* Learn by Doing */}
      <Learn />

      {/* For Students and Educators */}
      <StudentAndEducator />

      {/* Testimonial Carousel */}
      <Testimonial />

      {/* CTA Section */}
      {!session && <Cta />}
    </div>
  );
};

export default ChemistryLandingPage;
