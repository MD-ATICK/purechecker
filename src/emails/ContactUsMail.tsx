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

export const ContactUsMail = (values: { name: string, email: string, message: string }) => (
  <Html>
    <Head />
    <Preview>
      Here {values.name} want to contact with us.
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

          <Text style={paragraph}>Hi Pure Checker Team,</Text>
          <Text style={paragraph}>Here ${values.name} want to contact with us.</Text>

          <br />
          <Text style={paragraph}>
            From : {values.email}
          </Text>
          <Text style={paragraph}>
            Message :
          </Text>
          <Text style={paragraph}>
            {values.message}
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

export default ContactUsMail;

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


const hr = {
  borderColor: "#ffffff",
  margin: "20px 0",
  color: "#ffffff"
};

const footer = {
  color: "#ffffff",
  fontSize: "12px",
};
