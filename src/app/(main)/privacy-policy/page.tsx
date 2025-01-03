import Banner from '@/components/Banner'

function Policy() {
    return (
        <div>
            <Banner name="Privacy & Policy" desc="If you have any questions about these Terms, please contact us at" />
            <div className='container p-2 mx-auto my-20 space-y-3 w-full md:w-[80%] lg:w-[60%]'>
                <h2>Effective Date: 01 January 2025</h2>
                <p>
                    <strong>Pure Checker </strong>
                    Our operates the website purechecker.com (the
                    Site). This Privacy Policy informs you of our policies regarding the
                    collection, use, and management of personal data when you use our Site
                    and the choices you have associated with that data.
                    <br />
                    By using the Site, you agree to the collection and use of information
                    in accordance with this policy.
                </p>
                <br />
                <h2>Information Collection and Use</h2>
                <p>
                    We collect information solely for the purpose of providing and
                    improving our email verification services. We do not sell or share
                    your data with third parties.
                </p>

                <br /><br />
                <h2 >Types of Data Collected</h2>

                <br />

                <h2>1. Personal Data</h2>
                <p>
                    While using our Site, we may ask you to provide us with certain
                    personally identifiable information that can be used to contact or
                    identify you (Personal Data). This may include, but is not limited
                    to:
                </p>

                <p className='ml-5'>
                    - Email address
                    <br />
                    - First name and last name
                    <br />
                    - Phone number
                    <br />- Address, State, Province, ZIP/Postal code, City
                </p>

                <br />
                <br />

                <h2>2. Verification Data</h2>

                <p>
                    We collect email addresses and other data you provide for verification
                    purposes. This data is used solely to perform the verification service
                    and is not shared with any third parties.
                </p>


                <br />
                <br />

                <h2>3. Usage Data</h2>

                <p>
                    We may also collect information on how the Site is accessed and used
                    (Usage Data). This Usage Data may include information such as your
                    computer&apos;s Internet Protocol (IP) address, browser type, browser
                    version, the pages of our Site that you visit, the time and date of
                    your visit, the time spent on those pages, unique device identifiers,
                    and other diagnostic data.
                </p>
                <br />
                <p>Pure Checker uses the collected data for various purposes:</p>

                <ul className='list-decimal ml-10'>
                    <li>To provide and maintain the Site</li>
                    <li>To notify you about changes to our Site</li>
                    <li>
                        To allow you to participate in interactive features of our Site when
                        you choose to do so
                    </li>
                    <li>To provide customer support</li>
                    <li>
                        To gather analysis or valuable information so that we can improve
                        our Site
                    </li>
                    <li>To monitor the usage of the Site</li>

                    <li>To detect, prevent, and address technical issues</li>
                </ul>

                <br />
                <br />

                <h2>Data Protection</h2>
                <p>
                    We are committed to protecting your data. We implement a variety of
                    security measures to maintain the safety of your personal information
                    when you enter, submit, or access your personal information.
                </p>

                <br />
                <br />

                <h2>Security of Data</h2>
                <p>
                    The security of your data is important to us, but remember that no
                    method of transmission over the Internet, or method of electronic
                    storage, is 100% secure. While we strive to use commercially
                    acceptable means to protect your data, we cannot guarantee its
                    absolute security.
                </p>

                <br />
                <br />

                <h2>Changes to This Privacy Policy</h2>

                <p>
                    We may update our Privacy Policy from time to time. We will notify you
                    of any changes by posting the new Privacy Policy on this page. You are
                    advised to review this Privacy Policy periodically for any changes.
                    Changes to this Privacy Policy are effective when they are posted on
                    this page.
                </p>

                <br />

            </div>
        </div>
    )
}

export default Policy
