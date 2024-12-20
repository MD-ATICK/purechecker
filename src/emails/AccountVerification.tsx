import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";

export const AccountVerification = (values: { token: string, name?: string }) => (
    <Html>
        <Head />
        <Preview>
            Magic Link Account Verification
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={{ backgroundColor: "#03172b", borderRadius: '10px', padding: '30px' }}>
                    <Img
                        src={`${process.env.NEXT_PUBLIC_APP_URL}/logo.png`}
                        width="30"
                        height="30"
                        alt="1Dropbox"
                    />

                    <Text style={paragraph}>Hi {values.name},</Text>
                    <Text style={paragraph}>
                        Thank you for signing up with PureChecker! You&apos;re just one step away from unlocking the full potential of our email verification services.
                    </Text>
                    <br />
                    <Text style={paragraph}>
                        To verify your account and activate your features, please click the button below:
                    </Text>
                    <Section style={btnContainer}>
                        <Button style={button} href={`${process.env.NEXT_PUBLIC_APP_URL}/verification/account?token=${values.token}`}>
                            Click Here
                        </Button>
                    </Section>
                    <br />
                    <Text style={paragraph}>
                        Why verify your account?
                    </Text>
                    <ul style={listStyle}>
                        <li style={listItemStyle}>Ensure secure access to your PureChecker dashboard.</li>
                        <li style={listItemStyle}>Start verifying email addresses instantly.</li>
                        <li style={listItemStyle}>Receive updates, tips, and exclusive offers tailored to you.</li>
                    </ul>
                    <Text style={paragraph}>
                        This link is valid for the next 15 minutes, so don’t wait! If you didn’t request this, please ignore this email.
                    </Text>
                    <Text style={paragraph}>
                        Best,
                        <br />
                        The PureChecker Team,
                    </Text>
                    <Hr style={hr} />
                    <Text style={footer}>
                        support@purechecker.com
                    </Text>
                    <Text style={footer}>
                        1700, Surabari, kashimpur, Gazipur, Bangladesh
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default AccountVerification;

const main = {
    backgroundColor: "#001121",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const listStyle = {
    paddingLeft: '20px',
    margin: '10px 0',
};

const listItemStyle = {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#ffffff',
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: '#ffffff'
};

const btnContainer = {
    textAlign: "center" as const,
};

const button = {
    backgroundColor: "#007bff",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
};

const hr = {
    borderColor: "#ffffff",
    margin: "20px 0",
    color: "#ffffff"
};

const footer = {
    color: "#ffffff",
    fontSize: "12px",
};
