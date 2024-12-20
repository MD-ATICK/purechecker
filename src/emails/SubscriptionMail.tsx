import {
    Body,
    Column,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text
} from "@react-email/components";

export const SubscriptionMail = (values: { name: string, email: string, amount: number, type: "PURCHASE" | "SUBSCRIPTION", credit: number, perDayCredit: number, createdAt: string }) => (
    <Html>
        <Head />
        <Preview>
            You have been brought a subscription from our website.
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

                    <Text style={paragraph}>Hi {"name"},</Text>
                    <Text style={paragraph}>
                        Thanks for buy a subscription from our website.
                    </Text>
                    <br />
                    <Row>
                        <Column align="left">
                            <Text style={paragraph}>Buyer Name : </Text>
                        </Column>

                        <Column align="right">
                            <Text style={paragraph}>{values.name}</Text>
                        </Column>
                    </Row>
                    <Row>
                        <Column align="left">
                            <Text style={paragraph}>Buyer Email : </Text>
                        </Column>

                        <Column align="right">
                            <Text style={paragraph}>{values.email}</Text>
                        </Column>
                    </Row>
                    <Row>
                        <Column align="left">
                            <Text style={paragraph}>Type : </Text>
                        </Column>

                        <Column align="right">
                            <Text style={paragraph}>{values.type}</Text>
                        </Column>
                    </Row>
                    <Row>
                        <Column align="left">
                            <Text style={paragraph}>Recurring Time : </Text>
                        </Column>

                        <Column align="right">
                            <Text style={paragraph}>Monthly</Text>
                        </Column>
                    </Row>
                    <Row>
                        <Column align="left">
                            <Text style={paragraph}>Credit :  </Text>
                        </Column>

                        <Column align="right">
                            <Text style={paragraph}>{values.credit} Credit</Text>
                        </Column>
                    </Row>
                    <Row>
                        <Column align="left">
                            <Text style={paragraph}>Per Day Credit :  </Text>
                        </Column>

                        <Column align="right">
                            <Text style={paragraph}>{values.perDayCredit} Credit</Text>
                        </Column>
                    </Row>
                    <Row>
                        <Column align="left">
                            <Text style={paragraph}>Price : </Text>
                        </Column>

                        <Column align="right">
                            <Text style={h1}>${values.amount}</Text>
                        </Column>
                    </Row>
                    <Row>
                        <Column align="left">
                            <Text style={paragraph}>Purchased On : </Text>
                        </Column>

                        <Column align="right">
                            <Text style={paragraph}> {new Date(values.createdAt).toISOString()}</Text>
                        </Column>
                    </Row>

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

export default SubscriptionMail;

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

const h1 = {
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "bold",
}
