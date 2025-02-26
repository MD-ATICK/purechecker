"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Faqs() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelectedFaq = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      setSelectedIndex(index);
    }
  };

  const faqs = [
    {
      question: "What is Pure Checker?",
      answer:
        "Pure Checker is an online service that provides email verification to ensure the accuracy and validity of your email lists. Our service helps you clean your email list by identifying invalid, inactive, or potentially harmful email addresses.",
    },
    {
      question: "How does pure checker work?",
      answer:
        "PureChecker streamlines email verification by conducting a thorough set of checks to ensure the accuracy and validity of email addresses. When you submit an email, PureChecker verifies its syntax for proper formatting, confirms the validity of the domain, and checks whether the email is associated with a disposable service. Additionally, it determines if the email exists on the server and evaluates its risk level. The system identifies whether the email is active or disabled, if it’s a free service, and its associated role or purpose. With these detailed results, PureChecker provides actionable insights, helping you maintain clean and reliable email lists. Whether verifying single emails or processing bulk uploads, PureChecker ensures a seamless and efficient experience for all users.",
    },
    {
      question: "What types of email address can be verified?",
      answer:
        "Pure Checker can verify a wide range of email addresses, including those from popular providers like Gmail, Hotmail, Outlook, Yahoo, and many others.   ",
    },
    {
      question: "What file formats do you support for uploading email lists?",
      answer: `We support the following file formats for uploading your email lists:
- Text Box (1 email per line)
- CSV (.csv)
- Excel (.xls, .xlsx)
- PDF (.pdf)`,
    },
    {
      question:
        "What are the output categories of the email verification process?",
      answer: `   The results of the email verification process are categorized as follows:
                        - All
                        - Deliverable
                        - Undeliverable
                        - Duplicate
                        - Wrong Format
                        - Disposable
                        - Free
                        - Role`,
    },
    {
      question:
        "How can I download my verification results?",
      answer: ` You can view and download the verification results in various formats, including:
                        - .csv
                        - .xls
                        - .xlsx
                        The output files will have the email address in the first column and the result status in the second column.`,
    },
    {
      question:
        "Is there a limit on the number of emails I can verify?",
      answer: `The limit depends on your account type\n- Free trial users get 100 credits (1 credit = 1 email check). 
                        For paid users, limits depend on the plan you choose:
                        &nbsp;&nbsp;- Pay-as-you-go: Buy credits as needed.
                        &nbsp;&nbsp;- Monthly Subscriptions: Check up to 2500 emails per day. For custom orders, please contact us.`,
    },
  ];

  return (
    <div className=" py-28 px-2 container mx-auto" id="faqs">
      <h2 className=" text-4xl md:text-7xl"> FAQs</h2>
      <div className=" mt-8 md:mt-14">
        {faqs.map(({ question, answer }, index) => (
          <div
            key={index}
            className="py-6 space-y-3 border-t group border-stone-400 last:border-b relative border-dotted"
          >
            <div
              className={twMerge(
                index !== selectedIndex &&
                  " group-hover:h-full bottom-0 left-0  h-0 w-full bg-stone-200 duration-700 transition-all absolute"
              )}
            ></div>
            <div
              onClick={() => handleSelectedFaq(index)}
              className=" cursor-pointer flex relative px-2 items-center justify-between gap-4"
            >
              <h3 className=" text-2xl md:text-3xl font-serif">{question}</h3>
              <div
                className={twMerge(
                  " size-11 rounded-full flex justify-center items-center border duration-500 transition border-stone-400 shrink-0",
                  index === selectedIndex && " rotate-45 "
                )}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </div>
            <AnimatePresence>
              {index === selectedIndex && (
                <motion.div
                  className=" text-lg overflow-hidden px-2"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
