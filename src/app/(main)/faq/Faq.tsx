import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function Faq() {
    return (
        <div className=" container mx-auto text-center py-6 px-2">
            <h1 className=" text-2xl md:text-3xl">Frequently Asked Questions</h1>
            <Accordion type="single" collapsible className=" py-6 px-2">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is Pure Checker?</AccordionTrigger>
                    <AccordionContent>
                        Pure Checker is an online service that provides email verification to ensure the accuracy and validity of your email lists. Our service helps you clean your email list by identifying invalid, inactive, or potentially harmful email addresses.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How does pure checker work?</AccordionTrigger>
                    <AccordionContent>
                        PureChecker streamlines email verification by conducting a thorough set of checks to ensure the accuracy and validity of email addresses. When you submit an email, PureChecker verifies its syntax for proper formatting, confirms the validity of the domain, and checks whether the email is associated with a disposable service. Additionally, it determines if the email exists on the server and evaluates its risk level. The system identifies whether the email is active or disabled, if it’s a free service, and its associated role or purpose. With these detailed results, PureChecker provides actionable insights, helping you maintain clean and reliable email lists. Whether verifying single emails or processing bulk uploads, PureChecker ensures a seamless and efficient experience for all users.                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What types of email address can be verified?</AccordionTrigger>
                    <AccordionContent>
                        Pure Checker can verify a wide range of email addresses, including those from popular providers like Gmail, Hotmail, Outlook, Yahoo, and many others.                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>What file formats do you support for uploading email lists?</AccordionTrigger>
                    <AccordionContent>
                        We support the following file formats for uploading your email lists: <br />
                        - Text Box (1 email per line) <br />
                        - CSV (.csv) <br />
                        - Excel (.xls, .xlsx) <br />
                        - PDF (.pdf)
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>What are the output categories of the email verification process?</AccordionTrigger>
                    <AccordionContent>
                        The results of the email verification process are categorized as follows:
                        - All <br />
                        - Deliverable <br />
                        - Undeliverable <br />
                        - Duplicate <br />
                        - Wrong Format <br />
                        - Disposable <br />
                        - Free <br />
                        - Role <b></b>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                    <AccordionTrigger>How can I download my verification results?</AccordionTrigger>
                    <AccordionContent>
                        You can view and download the verification results in various formats, including: <br />
                        - .csv <br />
                        - .xls <br />
                        - .xlsx <br />
                        The output files will have the email address in the first column and the result status in the second column.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                    <AccordionTrigger>Is there a limit on the number of emails I can verify?</AccordionTrigger>
                    <AccordionContent>
                        The limit depends on your account type. <br /> Free trial users get 100 credits (1 credit = 1 email check). <br />
                        For paid users, limits depend on the plan you choose: <br />
                        &nbsp;&nbsp;- Pay-as-you-go: Buy credits as needed. <br />
                        &nbsp;&nbsp;- Monthly Subscriptions: Check up to 2500 emails per day. For custom orders, please contact us.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}
