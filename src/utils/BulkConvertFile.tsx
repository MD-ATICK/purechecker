
import Papa from 'papaparse';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as XLSX from 'xlsx';

// const data = [
//     {
//         email: 'atick@gmail.com',
//         status: "exist"
//     },
//     {
//         email: 'atick2@gmail.com',
//         status: "not exist"
//     },
//     {
//         email: 'atick3@gmail.com',
//         status: "exist"
//     },
// ]

export type BulkDownloadEmailType = {
    email: string,
    reason: string,
    isExist: boolean,
    isDisposable: boolean,
    riskLevel: string,
    free: boolean,
    role: string,
    isValidSyntax: boolean,
    isValidDomain: boolean,
}


export const generatePDF = async (fileName: string, data: { email: string; isExist: boolean; isDisposable: boolean }[]) => {
    const doc = await PDFDocument.create();
    let page = doc.addPage([600, 800]); // Increase page height for more rows

    // Embed standard font and set initial layout variables
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const titleFontSize = 18;
    const headerFontSize = 12;
    const rowFontSize = 10;
    const margin = 50;
    let yPosition = page.getHeight() - margin;

    // Draw the title
    page.drawText('Bulk Email Verification Results', {
        x: margin,
        y: yPosition,
        size: titleFontSize,
        font: font,
        color: rgb(0.2, 0.2, 0.2),
    });
    yPosition -= 40;

    // Draw table headers
    const headers = ['Email', 'Deliverable', 'Disposable'];
    const colPositions = [margin, margin + 200, margin + 350, margin + 450];

    headers.forEach((header, index) => {
        page.drawText(header, {
            x: colPositions[index],
            y: yPosition,
            size: headerFontSize,
            font: font,
            color: rgb(0, 0, 0),
        });
    });
    yPosition -= 20;

    // Draw table rows with data
    data.forEach((item) => {
        if (yPosition < 50) {
            // Add a new page if there's not enough space
            page = doc.addPage([600, 800]);
            yPosition = page.getHeight() - margin;
        }

        // Draw each cell in the row
        const rowData = [
            item.email,
            item.isExist ? 'Yes' : 'No',
            item.isDisposable ? 'Yes' : 'No',
        ];

        rowData.forEach((cellText, index) => {
            page.drawText(cellText, {
                x: colPositions[index],
                y: yPosition,
                size: rowFontSize,
                font: font,
                color: rgb(0.2, 0.2, 0.2),
            });
        });
        yPosition -= 18;
    });

    // Serialize the document to bytes
    const pdfBytes = await doc.save();

    // Create a Blob from the PDF bytes
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveFile(blob, 'pdf', fileName)
};
export const generateXLSX = (fileName: string, data: BulkDownloadEmailType[]) => {
    const editedData = data.map(item => ({
        email: item.email,
        isExist: item.isExist ? 'Yes' : 'No',
        isDisposable: item.isDisposable ? 'Yes' : 'No',
        riskLevel: item.riskLevel,
        free: item.free ? 'Yes' : 'No',
        role: item.role,
        isValidSyntax: item.isValidSyntax ? 'Yes' : 'No',
        isValidDomain: item.isValidDomain ? 'Yes' : 'No',
    }))
    const ws = XLSX.utils.json_to_sheet(editedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Results');
    const arrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });

    saveFile(blob, 'xlsx', fileName)
};

export const generateCSV = (fileName: string, data: BulkDownloadEmailType[]) => {
    const editedData = data.map(item => ({
        email: item.email,
        isExist: item.isExist ? 'Yes' : 'No',
        isDisposable: item.isDisposable ? 'Yes' : 'No',
        riskLevel: item.riskLevel,
        free: item.free ? 'Yes' : 'No',
        role: item.role,
        isValidSyntax: item.isValidSyntax ? 'Yes' : 'No',
        isValidDomain: item.isValidDomain ? 'Yes' : 'No'
    }))
    const csv = Papa.unparse(editedData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveFile(blob, 'csv', fileName)
};


export const saveFile = (bolb: Blob, type: "csv" | "pdf" | "xlsx", fileName: string) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(bolb);
    link.download = `${fileName}.${type}`;
    link.click();
}

export const extractEmailsFromFile = async (file: File): Promise<string[]> => {
    const emails: Set<string> = new Set();
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;

    if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        await extractEmailsFromXLSX(file, emailRegex, emails)
    } else if (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel') {
        const text = await file.text();
        extractEmailsFromCSV(text, emailRegex, emails);
    } else {
        throw new Error('Unsupported file type');
    }

    return Array.from(emails);
};


const extractEmailsFromCSV = (text: string, emailRegex: RegExp, emails: Set<string>) => {
    Papa.parse(text, {
        complete: result => {
            (result.data as unknown[][]).forEach(row => {
                row.forEach(cell => {
                    if (typeof cell === 'string') {
                        const matches = cell.match(emailRegex);
                        matches?.forEach(email => emails.add(email));
                    }
                });
            });
        },
    });
};

const extractEmailsFromXLSX = async (file: File, emailRegex: RegExp, emails: Set<string>) => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });

    workbook.SheetNames.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

        sheetData.forEach(row => {
            row.forEach(cell => {
                if (typeof cell === 'string') {
                    const matches = cell.match(emailRegex);
                    matches?.forEach(email => emails.add(email));
                }
            });
        });
    });
};