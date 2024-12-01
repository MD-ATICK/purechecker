import { BulkDownloadEmailType, generateCSV, generatePDF, generateXLSX } from "@/utils/BulkConvertFile";
import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Text
} from "@react-email/components";

interface PureCheckerFileDownloadProps {
    type: "pdf" | "xlsx" | "csv";
    fileName: string,
    margeData: BulkDownloadEmailType[],
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

export const FileDownload = ({
    type,
    fileName,
    margeData,
}: PureCheckerFileDownloadProps) => {

    const handleFileDownload = async () => {
        if (type === "pdf") {
            await generatePDF(fileName, margeData)
        } else if (type === "xlsx") {
            await generateXLSX(fileName, margeData)
        } else if (type === "csv") {
            await generateCSV(fileName, margeData)
        }
    }

    return (
        <Html>
            <Head />
            <Preview>
                Download Files
            </Preview>
            <Body style={main}>
                <Container style={container}>
                    <Img
                        src={`${baseUrl}/static/koala-logo.png`}
                        width="170"
                        height="50"
                        alt="Koala"
                        style={logo}
                    />
                    <Text style={paragraph}>Hi,</Text>
                    <Text style={paragraph}>
                        Welcome to Pure checker, downloadFiles
                    </Text>
                    <Button style={{ cursor: 'pointer' }} onClick={handleFileDownload}>
                        Download now
                    </Button>
                    <Text style={paragraph}>
                        Best,
                        <br />
                        The Pure Checker team
                    </Text>
                    <Hr style={hr} />
                    <Text style={footer}>
                        470 Noor Ave STE B #1148, South San Francisco, CA 94080
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}

export default FileDownload;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const logo = {
    margin: "0 auto",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const btnContainer = {
    textAlign: "center" as const,
};

const button = {
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};
