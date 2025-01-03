import emailImage from '@/assets/email.png';
import locationImage from '@/assets/location.png';
import viberImage from '@/assets/viber.png';
import Banner from "@/components/Banner";
import Image from "next/image";
import ContactForm from './ContactForm';

export default function page() {
    return (
        <>
            <Banner name="Contact Us" desc="If you have any questions about these Terms, please contact us at" />
            <div className=" container mx-auto p-3 md:py-20 flex flex-col md:flex-row items-center gap-4 justify-center">
                <div className=" flex-1 w-full md:space-y-4">
                    <h1 className=" font-bold text-xl md:text-4xl">Contact Us</h1>
                    <p className="  text-xs md:text-sm text-muted-foreground w-[90%]">Get in touch with us! We&apos;re here to assist with any questions, feedback, or support you need for a seamless experience.</p>
                    <div className=' space-y-2 md:space-y-4 md:py-8'>
                        <div className="flex items-center gap-3">
                            <Image alt="" src={locationImage} height={22} />
                            <p className=" text-xs md:text-sm">1700, Surabari, kashimpur, Gazipur, Bangladesh</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Image alt="" src={viberImage} height={22} />
                            <p className=" text-xs md:text-sm">8801710115441</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Image alt="" src={emailImage} height={22} />
                            <p className=" text-xs md:text-sm">support@purechecker.com</p>
                        </div>

                    </div>
                </div>
                <div className=" flex-1 w-full md:px-6">
                    <ContactForm />
                </div>
            </div>
        </>
    )
}
