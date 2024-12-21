"use client"
import girlImage from '@/assets/girl.jpg'
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
            <p className=" text-gray-500 text-xs sm:text-sm">Accurate bulk email validation shouldn’t cost a fortune. Rated 4.5/5 on</p>
            <Carousel className=" w-full max-w-3xl py-10 mx-auto">
                <CarouselContent>
                    <CarouselItem>
                        <div className=" flex flex-col mx-auto justify-center w-[90%] items-center gap-">
                            <Image alt="" src={girlImage} width={300} height={300} className=" object-cover mb-3 aspect-square rounded-md" />
                            <h2>MD Atick, CEO</h2>
                            <p className=" text-gray-400">&quot;As a CEO, it&apos;s essential to ensure our communications are reaching the right people. PureChecker has been invaluable in providing reliable email verification, increasing our efficiency and email deliverability. It’s an essential tool for our operations!&quot; <br />
                                – MD Atick, CEO
                            </p>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className=" flex flex-col mx-auto justify-center w-[90%] items-center gap-">
                            <Image alt="" src={girlImage} width={300} height={300} className=" object-cover mb-3 aspect-square rounded-md" />
                            <h2>Shajjad Hossen, Marketing Manager</h2>
                            <p className=" text-gray-400">&quot;PureChecker has been a game-changer for our email marketing campaigns. The verification service is accurate and reliable, ensuring that we reach the right audience every time. It&apos;s saved us time, reduced bounce rates, and boosted our email deliverability. Highly recommended!&quot; <br />
                                – Shajjad Hossen, Marketing Manager</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className=" flex flex-col mx-auto justify-center w-[90%] items-center gap-">
                            <Image alt="" src={girlImage} width={300} height={300} className=" object-cover mb-3 aspect-square rounded-md" />
                            <h2>MD Arif, Chief Officer</h2>
                            <p className=" text-gray-400">&quot;PureChecker has greatly improved the accuracy of our email outreach. The seamless verification process has helped us maintain a clean email list, leading to more successful campaigns and better engagement. A must-have tool for any business!&quot; <br />
                                – MD Arif, Chief Officer
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
