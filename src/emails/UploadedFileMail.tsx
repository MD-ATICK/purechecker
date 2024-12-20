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

export const UploadedFileMail = (values: { fileName: string, totalCheck: number, deliverable: number, undeliverable: number, disposable: number }) => (
  <Html>
    <Head />
    <Preview>
      {values.fileName} file has been uploaded successfully. ⚡
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

          <Text style={paragraph}>Hi Atick,</Text>
          <Text style={paragraph}>
            {values.fileName} file has been uploaded successfully. Here is the summary of the file Email.
          </Text>
          <br />

          <Section style={btnContainer} >
            <Text style={paragraph}>
              File Name: <b> {values.fileName}</b>
            </Text>
            <Text style={paragraph}>
              ⚡Total Check: <b>{values.totalCheck}</b>
            </Text>
            <Text style={paragraph}>
              ✅ Deliverable: <b>{values.deliverable}</b>
            </Text>
            <Text style={paragraph}>
              ❌ Undeliverable: <b>{values.undeliverable}</b>
            </Text>
            <Text style={paragraph}>
              🔴 Disposable:  <b>{values.disposable}</b>
            </Text>
          </Section>


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

export default UploadedFileMail;

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

const hr = {
  borderColor: "#ffffff",
  margin: "20px 0",
  color: "#ffffff"
};

const footer = {
  color: "#ffffff",
  fontSize: "12px",
};

