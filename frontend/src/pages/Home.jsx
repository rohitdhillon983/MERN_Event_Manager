import React, { useEffect, useState } from "react";
import Hero from "../components/HeroSection comp/Hero";
import Services from "../components/HeroSection comp/Services";
import BlogSection from "../components/HeroSection comp/BlogSection";
import WhyChooseRegisterKaro from "../components/HeroSection comp/WhyChooseRegisterKaro";
import TestimonialCard from "../components/HeroSection comp/TestimonialCard";
import NumbersSection from "../components/HeroSection comp/NumbersSection";
import MailContact from "../components/HeroSection comp/MailContact";
import HeroSection2 from "../components/HeroSection comp/heroSection2";
import ManagementTeam from "../components/HeroSection comp/ManagementTeam";
import Faq from "../components/HeroSection comp/Faq";


const Home = () => {

  return (
    <div>
        <Hero></Hero>
        <HeroSection2></HeroSection2>
        <Services></Services>
        <BlogSection></BlogSection>
        <ManagementTeam></ManagementTeam>
        <WhyChooseRegisterKaro></WhyChooseRegisterKaro>
        <Faq></Faq>
        <TestimonialCard></TestimonialCard>
        <NumbersSection></NumbersSection>
        <MailContact></MailContact>
    </div>
  );
};

export default Home;