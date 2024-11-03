import EmailCheckerField from "@/app/(main)/SearchField";
import EmailVerificationApi from "@/components/home/EmailVerificationApi";
import HowToUse from "@/components/home/HowToUse";
import HowToVerify from "@/components/home/HowToVerify";
import RocksWhy from "@/components/home/RocksWhy";

export default function Home() {
  
  return (
    <div>

      {/* Email Checker box */}
      <div className=" h-[calc(100vh-100px)] flex flex-col w-[50%] mx-auto gap-16  justify-center items-center">
        <div className=" space-y-4  text-center">
          <h2 className=" font-bold text-3xl lg:text-5xl lg:leading-[55px]"> <span className=" text-primary">Verify any email address</span> {" "} with complete email checker.</h2>
          <p className=" text-sm text-muted-foreground">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint sapiente eveniet recusandae provident placeat praesentium repudiandae harum nesciunt perspiciatis totam atque officiis distinctio adipisci quod nemo natus, corrupti ipsa culpa?</p>
        </div>
        <EmailCheckerField />
      </div>

      {/* How to use */}
      <HowToUse />

      {/* Why rock */}
      <RocksWhy />


      {/* how to verify */}
      <HowToVerify />

      {/* Email Verification Api*/}
      <EmailVerificationApi />
    </div>
  );
}
