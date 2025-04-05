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

export const ResetPassword = (values: { token: string, name?: string }) => (
  <Html>
    <Head />
    <Preview>
      Reset Your PureChecker Password
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
            We received a request to reset your password for your PureChecker account. Don’t worry – we’re here to help!
          </Text>
          <br />
          <Text style={paragraph}>
            To reset your password, click the button below:
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={`${process.env.NEXT_PUBLIC_APP_URL}/verification/forgot-password?token=${values.token}`}>
              Reset Password
            </Button>
          </Section>
          <br />
          <Text style={paragraph}>
            For security reasons, this link will expire in 15 minutes. If you didn’t request a password reset, please ignore this email or contact us immediately at support@purechecker.com.
          </Text>
          <Text style={paragraph}>
            Remember to keep your password secure and avoid sharing it with anyone.
          </Text>
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

export default ResetPassword;

const main = {
  backgroundColor: "#001121",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
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
