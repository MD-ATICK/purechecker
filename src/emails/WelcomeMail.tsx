import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text
} from "@react-email/components";

export const WelcomeEmail = (values: { name: string }) => (
  <Html>
    <Head />
    <Preview>
      The sales intelligence platform that helps you uncover qualified leads.
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
            Welcome to PureChecker! 🎉 We&apos;re excited to have you on board as part of our mission to simplify and enhance email verification processes.
          </Text>
          <Text style={paragraph}>
            Here&apos;s what you can look forward to:
          </Text>
          <ul style={listStyle}>
            <li style={listItemStyle}>Accurate Email Verification: Instantly verify email addresses to maintain a clean and effective contact list.</li>
            <li style={listItemStyle}>Seamless Integration: Use our tools effortlessly with your workflow, saving you time and effort.</li>
            <li style={listItemStyle}>Boost Deliverability: Ensure your emails reach the right inboxes and improve your campaign performance.</li>
          </ul>

          <Text style={paragraph}>
            If you have any questions or need help, feel free to contact us at support@purechecker.com or reply to this message.
          </Text>
          <Text style={paragraph}>
            Thanks for choosing PureChecker – we’re here to make email verification easy and reliable for you.
          </Text>
          <br />
          <Text style={paragraph}>
            Best,
            <br />
            The PureChecker Team,
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            1700, Surabari, kashimpur, Gazipur, Bangladesh
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: "#001121",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
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

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: '#ffffff'
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
