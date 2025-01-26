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
          <div className="h-screen absolute inset-0 w-full -z-50"><div className="absolute right-0 bottom-0 left-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_34px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div></div>

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
