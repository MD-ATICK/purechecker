"use server"
import disposableDomains from 'disposable-email-domains';
import dns from 'dns';
import net from 'net';

export const emailVerify = async (email: string) => {
    try {

        console.log(email)
        if (!email || !isValidSyntax(email)) {
            console.log('invalid email syntax')
        }

        const domain = email.split('@')[1];
        const disposable = isDisposableEmail(domain);
        // console.log({ disposable })
        const mxRecords = await getMxRecords(domain);
        console.log({ mxRecords })

        const smtpExists = await checkSmtpExistence(email, mxRecords[0]?.exchange);
        console.log({ smtpExists })

        const riskLevel = getRiskLevel(disposable, smtpExists);
        console.log({ riskLevel })

        return { exist: smtpExists }
    } catch (error) {
        throw error
    }
}


// Basic syntax check
function isValidSyntax(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Check if the email domain is disposable
function isDisposableEmail(domain: string): boolean {
    return disposableDomains.includes(domain);
}

// Retrieve MX records for a domain
async function getMxRecords(domain: string): Promise<dns.MxRecord[]> {
    try {
        return await dns.promises.resolveMx(domain);
    } catch (error) {
        console.error("Error fetching MX records:", error);
        return [];
    }
}

// Check if email exists using SMTP handshake
async function checkSmtpExistence(email: string, mxHost: string): Promise<boolean> {
    return new Promise((resolve) => {
        const client = net.createConnection(25, mxHost);
        let result = false;

        client.setTimeout(5000);  // Set a timeout to avoid hanging

        client.on('connect', () => {
            // SMTP handshake initiation
            client.write(`EHLO ${mxHost}\r\n`);
            client.write(`MAIL FROM:<test@${mxHost}>\r\n`);
            client.write(`RCPT TO:<${email}>\r\n`);
        });

        client.on('data', (data) => {
            const response = data.toString();
            console.log("SMTP Response 1:", response, response.includes('550-5.1.1')); // For debugging
            if (response.includes('550-5.1.1')) {
                result = false;
            }

            // If we receive a '250 OK' response specifically for 'RCPT TO'
            if (response.includes('250') && !response.includes('550-5.1.1')) {
                result = true; // Email exists
            }
            // If we receive a known error code for non-existent email
            else if (response.includes('550') || response.includes('554')) {
                result = false; // Email does not exist
            }

            client.end();
        });

        client.on('timeout', () => {
            console.error("SMTP request timed out");
            resolve(false); // Timeout likely means no reliable response
            client.end();
        });

        client.on('error', (error) => {
            console.error("SMTP Error:", error.message);
            resolve(false); // Network or connection error; treat as non-existent
            client.end();
        });

        client.on('end', () => {
            resolve(result); // Resolve based on the last `result` value
        });
    });
}

// Assess risk level based on checks
function getRiskLevel(disposable: boolean, smtpExists: boolean): string {
    if (!smtpExists) return "high";
    if (disposable) return "medium";
    return "low";
}