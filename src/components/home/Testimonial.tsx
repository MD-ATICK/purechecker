"use client";

import profileImage from "@/assets/testimonial-user.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Thompson, Digital Marketer",
    feedback:
      "Pure Checker has been a game-changer for our email campaigns. It ensures our database is clean and reduces bounce rates significantly. Highly recommended for anyone serious about email marketing!",
  },
  {
    name: "James Carter, E-commerce Store Owner",
    feedback:
      "Since integrating Pure Checker, we’ve seen a huge improvement in email deliverability. It's easy to use and works seamlessly with our system. Saved us time and money!",
  },
  {
    name: "Emily Rodriguez, Content Creator",
    feedback:
      "I used to struggle with fake email signups on my forms, but Pure Checker solved that problem. Now, I only get real, engaged subscribers. Amazing tool!",
  },
  {
    name: "Michael Lee, Software Engineer",
    feedback:
      "Pure Checker’s API integration was straightforward, and the results are impressive. It’s fast, accurate, and reliable—everything I look for in a verification service.",
  },
  {
    name: "Anna Patel, Marketing Consultant",
    feedback:
      "Pure Checker is hands down the best email verification tool I've used. It keeps our database clean and ensures our campaigns reach real people. Couldn't ask for more!",
  },
];

export default function Testimonial() {
  return (
    <div className=" bg-secondary">
      <div className="container w-full overflow-hidden text-center mx-auto md:py-16">
        <h1>Testimonial</h1>
        <p className="text-gray-500 text-sm sm:text-lg">
          Accurate bulk email validation shouldn&apos;t cost a fortune. Rated
          4.5/5 on
        </p>
        <Carousel className="w-full max-w-3xl py-10 mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col mx-auto justify-center w-[90%] items-center gap-2">
                  <Image
                    alt=""
                    src={profileImage}
                    width={200}
                    height={200}
                    className="object-cover mb-3 aspect-square rounded-md"
                  />
                  <h2 className=" text-primary">{testimonial.name}</h2>
                  <p className="text-sm md:text-base text-gray-600">
                    &quot;{testimonial.feedback}&quot; <br />–{" "}
                    {testimonial.name}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
