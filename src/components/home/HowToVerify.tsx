
export default function HowToVerify() {
    return (
        <div className=' container px-3 py-[4vw] mx-auto text-center'>
            <div className=' text-center w-full md:w-2/3 mx-auto space-y-3'>
                <h1 className='text-2xl md:text-4xl font-bold'>How we verify emails</h1>
                <p className=' text-xs md:text-sm text-muted-foreground'>At Pure Checker, Our advanced verification system goes through several stages to validate each email address, guaranteeing you the best results. Here is a detailed look at how we verify email</p>
            </div>
            <br />
            <div className=" grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 md:gap-y-16 py-14">
                <div className=' space-y-4 text-start'>
                    <div className=" flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-3">
                        <div className=' h-7 md:h-10 aspect-square flex justify-center items-center text-primary bg-blue-100 font-bold text-lg md:text-2xl rounded-full'>1</div>
                        <h1 className=' font-bold text-lg md:text-2xl'>
                            Domain & SMTP Validation
                        </h1>
                    </div>
                    <p className=' text-xs text-muted-foreground md:text-lg '>
                        We identify and remove emails with invalid, inactive, or parked domains. This helps ensure your emails reach only valid, active accounts.                    </p>
                </div>
                <div className=' space-y-4 text-start'>
                    <div className=" flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-3">
                        <div className=' h-7 md:h-10 aspect-square flex justify-center items-center text-primary bg-blue-100 font-bold text-lg md:text-2xl rounded-full'>2</div>
                        <h1 className=' font-bold text-lg md:text-2xl'>
                            Spam Trap Checker
                        </h1>
                    </div>
                    <p className=' text-xs text-muted-foreground md:text-lg'>
                        Spam traps can harm your reputation. We identify and clean these traps to protect your sender score and improve deliverability.                    </p>
                </div>
                <div className=' space-y-4 text-start'>
                    <div className=" flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-3">
                        <div className=' h-7 md:h-10 aspect-square flex justify-center items-center text-primary bg-blue-100 font-bold text-lg md:text-2xl rounded-full'>3</div>
                        <h1 className=' font-bold text-lg md:text-2xl'>
                            Disposable Emails Cleaner
                        </h1>
                    </div>
                    <p className=' text-xs text-muted-foreground md:text-lg '>
                        Remove temporary email addresses that expire quickly. We detect disposable emails, ensuring your messages reach genuine recipients who matter.                    </p>
                </div>
                <div className=' space-y-4 text-start'>
                    <div className=" flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-3">
                        <div className=' h-7 md:h-10 aspect-square flex justify-center items-center text-primary bg-blue-100 font-bold text-lg md:text-2xl rounded-full'>4</div>
                        <h1 className=' font-bold text-lg md:text-2xl'>
                            Catch-All Domains Checker

                        </h1>
                    </div>
                    <p className=' text-xs text-muted-foreground md:text-lg '>
                        We identify catch-all domains that accept all emails. Skipping these addresses can improve your open rates and email performance.
                    </p>
                </div>
                <div className=' space-y-4 text-start'>
                    <div className=" flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-3">
                        <div className=' h-7 md:h-10 aspect-square flex justify-center items-center text-primary bg-blue-100 font-bold text-lg md:text-2xl rounded-full'>5</div>
                        <h1 className=' font-bold text-lg md:text-2xl'>
                            Syntax Errors Validator
                        </h1>
                    </div>
                    <p className=' text-xs text-muted-foreground md:text-lg '>
                        We eliminate emails with invalid syntax. Notify users of errors instantly by integrating our API to catch issues in real-time.                    </p>
                </div>
                <div className=' space-y-4 text-start'>
                    <div className=" flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-3">
                        <div className=' h-7 md:h-10 aspect-square flex justify-center items-center text-primary bg-blue-100 font-bold text-lg md:text-2xl rounded-full'>6</div>
                        <h1 className=' font-bold text-lg md:text-2xl'>
                            Hard Bounce Checker

                        </h1>
                    </div>
                    <p className=' text-xs text-muted-foreground md:text-lg '>
                        We conduct discreet verifications to confirm if an email address exists and can receive messages, reducing bounce rates effectively.                    </p>
                </div>
                <div className=' space-y-4 text-start'>
                    <div className=" flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-3">
                        <div className=' h-7 md:h-10 aspect-square flex justify-center items-center text-primary bg-blue-100 font-bold text-lg md:text-2xl rounded-full'>7</div>
                        <h1 className=' font-bold text-lg md:text-2xl'>
                            MTA Validator


                        </h1>
                    </div>
                    <p className=' text-xs text-muted-foreground md:text-lg '>
                        We check if a mail server is configured to accept emails, validating MX records for stronger email list reliability.                             </p>
                </div>
                <div className=' space-y-4 text-start'>
                    <div className=" flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-3">
                        <div className=' h-7 md:h-10 aspect-square flex justify-center items-center text-primary bg-blue-100 font-bold text-lg md:text-2xl rounded-full'>8</div>
                        <h1 className=' font-bold text-lg md:text-2xl'>
                            Email Duplicates Remover

                        </h1>
                    </div>
                    <p className=' text-xs text-muted-foreground md:text-lg '>
                        We detect and remove duplicate emails, saving your credits and enhancing the efficiency of your next email campaign.                              </p>
                </div>
                <div className=' space-y-4 text-start'>
                    <div className=" flex items-center gap-3">
                        <div className=' h-7 md:h-10 aspect-square flex justify-center items-center text-primary bg-blue-100 font-bold text-lg md:text-2xl rounded-full'>9</div>
                        <h1 className=' font-bold text-lg md:text-2xl'>
                            Save Money on Emails

                        </h1>
                    </div>
                    <p className=' text-xs text-muted-foreground md:text-lg '>
                        Send emails only to real recipients. Save money, enhance delivery rates, and boost your email marketing success with our verified email list.                                                     </p>
                </div>
                <div className=' space-y-4 text-start'>
                    <div className=" flex items-center gap-3">
                        <div className=' h-7 md:h-10 aspect-square flex justify-center items-center text-primary bg-blue-100 font-bold text-lg md:text-2xl rounded-full'>10</div>
                        <h1 className=' font-bold text-lg md:text-2xl'>
                            Get Better Results
                        </h1>
                    </div>
                    <p className=' text-xs text-muted-foreground md:text-lg '>
                        Stop wasting money on undeliverable emails. Use our verified list to improve your results and maximize the effectiveness of your email marketing campaigns.                   </p>
                </div>
                <div className=' space-y-4 text-start'>
                    <div className=" flex items-center gap-3">
                        <div className=' h-10 aspect-square flex justify-center items-center text-primary bg-blue-100 font-bold text-lg md:text-2xl rounded-full'>11</div>
                        <h1 className=' font-bold text-lg md:text-2xl'>
                            Keep Your Reputation Safe

                        </h1>
                    </div>
                    <p className=' text-xs text-muted-foreground md:text-lg '>
                        Avoid spam traps and bad emails that can harm your reputation. Clean your list to ensure your emails reach the inbox and maintain your credibility.
                    </p>
                </div>

            </div>
        </div>
    )
}
