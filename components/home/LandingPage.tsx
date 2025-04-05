"use client";
import EmailCheckerField from "@/app/(main)/SearchField";
import { stagger, useAnimate, motion } from "framer-motion";
import { useEffect } from "react";
import SplitType from "split-type";

export default function LandingPage() {
  const [scope, animate] = useAnimate();
  
  useEffect(() => {
    new SplitType(scope.current, { types: "lines,words", tagName: "span" });
    animate(
      scope.current.querySelectorAll(".word"),
      {
        transform: "translateY(0%)",
      },
      {
        duration: 0.5,
        delay: stagger(0.15),
      }
    );
  }, [scope, animate]);

  return (
    <div className=" bg-gradient-to-tr from-white to-white via-sky-200">
    <div className=" h-[calc(100vh-100px)] flex flex-col w-full p-4 md:w-[60%] mx-auto gap-10 md:gap-16  justify-center items-center">
      <div className=" space-y-2 md:space-y-4 text-center">
        <motion.div
        initial={{ y : '100%'}}
        animate={{ y: 0 }}
          ref={scope}
          className=" font-[900] text-3xl lg:text-5xl lg:leading-[55px]"
        >
          {" "}
          Bulk Email Validation Checker
          <span className=" text-primary"> Verify & Clean </span>
          Email Lists Instantly
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className=" text-sm md:text-lg text-muted-foreground"
        >
          Effortlessly validate and clean your email lists with our powerful
          bulk email validation checker. 
          {/* Eliminate invalid emails, reduce bounce
          rates, and improve deliverability. Ensure higher email engagement and
          marketing success with fast, accurate, and reliable
          email verification! */}
        </motion.div>
      </div>
      <EmailCheckerField />
    </div>
    </div>
  );
}
