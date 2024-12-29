"use client"
import profileImage from '@/assets/testimonial-user.png'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export default function Testimonial() {

    return (
        <div className=" container w-full overflow-hidden text-center mx-auto md:py-16">
            <h2>Testimonial</h2>
            <p className=" text-gray-500 text-sm sm:text-lg">Accurate bulk email validation shouldn&apos;t cost a fortune. Rated 4.5/5 on</p>
            <Carousel className=" w-full max-w-3xl py-10 mx-auto">
                <CarouselContent>
                    <CarouselItem>
                        <div className=" flex flex-col mx-auto justify-center w-[90%] items-center gap-">
                            <Image alt="" src={profileImage} width={300} height={300} className=" object-cover mb-3 aspect-square rounded-md" />
                            <h2>Sarah Thompson, Digital Marketer</h2>
                            <p className=" text-sm md:text-lg text-gray-400">&quot;Pure Checker has been a game-changer for our email campaigns. It ensures our database is clean and reduces bounce rates significantly. Highly recommended for anyone serious about email marketing!&quot; <br />
                                – Sarah Thompson, Digital Marketer
                            </p>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className=" flex flex-col mx-auto justify-center w-[90%] items-center gap-">
                            <Image alt="" src={profileImage} width={300} height={300} className=" object-cover mb-3 aspect-square rounded-md" />
                            <h2>James Carter, E-commerce Store Owner                            </h2>
                            <p className=" text-sm md:text-lg text-gray-400">&quot;Since integrating Pure Checker, we’ve seen a huge improvement in email deliverability. It&apos;s easy to use and works seamlessly with our system. Saved us time and money!&quot; <br />
                                – James Carter, E-commerce Store Owner     </p>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className=" flex flex-col mx-auto justify-center w-[90%] items-center gap-">
                            <Image alt="" src={profileImage} width={300} height={300} className=" object-cover mb-3 aspect-square rounded-md" />
                            <h2>Emily Rodriguez, Content Creator                            </h2>
                            <p className=" text-sm md:text-lg text-gray-400">&quot;I used to struggle with fake email signups on my forms, but Pure Checker solved that problem. Now, I only get real, engaged subscribers. Amazing tool!&quot; <br />
                                – Emily Rodriguez, Content Creator
                            </p>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className=" flex flex-col mx-auto justify-center w-[90%] items-center gap-">
                            <Image alt="" src={profileImage} width={300} height={300} className=" object-cover mb-3 aspect-square rounded-md" />
                            <h2>Michael Lee, Software Engineer                            </h2>
                            <p className=" text-sm md:text-lg text-gray-400">&quot;Pure Checker’s API integration was straightforward, and the results are impressive. It’s fast, accurate, and reliable—everything I look for in a verification service.&quot; <br />
                                – Michael Lee, Software Engineer
                            </p>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className=" flex flex-col mx-auto justify-center w-[90%] items-center gap-">
                            <Image alt="" src={profileImage} width={300} height={300} className=" object-cover mb-3 aspect-square rounded-md" />
                            <h2>Michael Lee, Software Engineer                            </h2>
                            <p className=" text-sm md:text-lg text-gray-400">&quot;Pure Checker’s API integration was straightforward, and the results are impressive. It’s fast, accurate, and reliable—everything I look for in a verification service.&quot; <br />
                                – Michael Lee, Software Engineer
                            </p>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className=" flex flex-col mx-auto justify-center w-[90%] items-center gap-">
                            <Image alt="" src={profileImage} width={300} height={300} className=" object-cover mb-3 aspect-square rounded-md" />
                            <h2>Anna Patel, Marketing Consultant                            </h2>
                            <p className=" text-sm md:text-lg text-gray-400">&quot;Pure Checker is hands down the best email verification tool I&apos;ve used. It keeps our database clean and ensures our campaigns reach real people. Couldn&apos;t ask for more!&quot; <br />
                                – Anna Patel, Marketing Consultant
                            </p>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}
