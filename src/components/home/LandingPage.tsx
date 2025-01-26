import EmailCheckerField from "@/app/(main)/SearchField";

export default function LandingPage() {
  return (
    <div className="h-[calc(100vh-100px)] flex flex-col w-full p-4 md:w-[50%] mx-auto gap-16  justify-center items-center">
      <div className=" space-y-4  text-center">
        <h2 className=" font-bold text-3xl lg:text-5xl lg:leading-[55px]">
          {" "}
          Bulk Email Validation Checker -
          <span className=" text-primary"> Verify & Clean </span>
          Email Lists Instantly
        </h2>
        <p className="text-sm text-muted-foreground">
        Effortlessly validate and clean your email lists with our powerful bulk email validation checker. Eliminate invalid emails, reduce bounce rates, and improve deliverability. Ensure higher email engagement and marketing success with fast, accurate, and reliable email verification!
        </p>
      </div>
      <EmailCheckerField />
    </div>
  );
}
