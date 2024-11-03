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
            <div className=" container mx-auto py-20 flex items-center gap-4 justify-center">
                <div className=" flex-1 w-full space-y-4">
                    <h1 className=" font-bold text-4xl">Contact Us</h1>
                    <p className="  text-muted-foreground w-[90%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iste quaerat autem corrupti asperiores accusantium et fuga! Facere excepturi, quo eos, nobis doloremque dolor labore expedita illum iusto, aut repellat fuga!</p>
                    <div className=' space-y-5 py-8'>
                        <div className="flex items-center gap-3">
                            <Image alt="" src={locationImage} height={25} />
                            <p className="">1700, Surabari, kashimpur, Gazipur, Bangladesh</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Image alt="" src={viberImage} height={25} />
                            <p className="">8801710115441</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Image alt="" src={emailImage} height={25} />
                            <p className="">support@purechecker.com</p>
                        </div>

                    </div>
                </div>
                <div className=" flex-1 w-full px-6">
                    <ContactForm />
                </div>
            </div>
        </>
    )
}
