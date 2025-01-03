import EmailVerificationApi from "@/components/home/EmailVerificationApi";
import HowToUse from "@/components/home/HowToUse";
import HowToVerify from "@/components/home/HowToVerify";
import LandingPage from "@/components/home/LandingPage";
import RocksWhy from "@/components/home/RocksWhy";
import Testimonial from "@/components/home/Testimonial";
import { Suspense } from "react";
import Faq from "./faq/Faq";
import PricingCo from "./pricing/PricingCo";

export default function Home() {


  return (
    <div>
      <LandingPage />
      <HowToUse />
      <RocksWhy />
      <HowToVerify />
      <EmailVerificationApi />
      <Suspense fallback={<div>Loading pricing...</div>}>
        <PricingCo heading="Pricing" />
      </Suspense>
      <Testimonial />
      <Faq />
    </div>
  );
}
