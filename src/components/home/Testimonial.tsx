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
        <div className=" container text-center mx-auto md:py-16">
            <h1>Testimonial</h1>
            <p className=" text-gray-500">Accurate bulk email validation shouldn’t cost a fortune. Rated 4.5/5 on</p>
            <Carousel className=" w-full max-w-3xl py-10 mx-auto">
                <CarouselContent>
                    <CarouselItem>
                        <div className=" flex flex-col mx-auto justify-center w-[90%] items-center gap-">
                                <Image alt="" src={girlImage} width={300} height={300} className=" object-cover mb-3 aspect-square rounded-md" />
                            <h1>Shajjad Hossen, Marketing Manager</h1>
                            <p className=" text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet pariatur sed facilis eaque, veritatis tenetur quidem eius cum. Incidunt facilis assumenda earum porro iure recusandae quaerat fugit perspiciatis enim nobis.</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className=" flex flex-col mx-auto justify-center w-[90%] items-center gap-">
                                <Image alt="" src={girlImage} width={300} height={300} className=" object-cover mb-3 aspect-square rounded-md" />
                            <h1>Rakib Hasan, Chief Officer</h1>
                            <p className=" text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet pariatur sed facilis eaque, veritatis tenetur quidem eius cum. Incidunt facilis assumenda earum porro iure recusandae quaerat fugit perspiciatis enim nobis.</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className=" flex flex-col mx-auto justify-center w-[90%] items-center gap-">
                                <Image alt="" src={girlImage} width={300} height={300} className=" object-cover mb-3 aspect-square rounded-md" />
                            <h1>MD Atick, CEO</h1>
                            <p className=" text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet pariatur sed facilis eaque, veritatis tenetur quidem eius cum. Incidunt facilis assumenda earum porro iure recusandae quaerat fugit perspiciatis enim nobis.</p>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}
