import EmailCheckerField from '@/app/(main)/SearchField'

export default function LandingPage() {
  return (
    <div className="h-[calc(100vh-100px)] flex flex-col w-full p-4 md:w-[50%] mx-auto gap-16  justify-center items-center">
    <div className=" space-y-4  text-center">
      <h2 className=" font-bold text-3xl lg:text-5xl lg:leading-[55px]"> Advanced
        <span className=" text-primary"> Email checker, </span> {" "} Made Affordable for All.</h2>
      <p className="text-sm text-muted-foreground">At Pure Checker, we leverage the latest in email verification technology to ensure maximum accuracy and reliability. Our advanced algorithms analyze each email address thoroughly, helping you maintain a high-quality list that enhances your marketing efforts.

      </p>
    </div>
    <EmailCheckerField />
  </div>
  )
}
