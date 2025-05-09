import CopyPasteImage from "@/assets/draft.png";
import UploadImage from "@/assets/upload.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function VerifyEmails() {
	return (
		<div className=' p-3 md:px-6'>
			<div className=''>
				<h1 className=' text-3xl font-[900]'>Bulk Emails Verify</h1>
				<p className='  text-sm text-muted-foreground'>
					Upload your bulk emails file or copy and paste them here.
				</p>
			</div>

			<div className=' py-8 grid grid-cols-1 md:grid-cols-2 gap-8 '>
				{/* UPLOAD YOUR FILE */}
				<div className=' shadow-lg border border-primary bg-secondary/60 aspect-[10/9] text-center gap-2 p-6 md:p-12 rounded-xl flex flex-col justify-center items-center'>
					<Image alt='' src={UploadImage} height={55} />
					<h1 className=' text-2xl font-bold'>Lightning-Speed File Upload</h1>
					<p className=' text-muted-foreground'>
						Upload your file then easily download in pdf, csv, xlsx.
					</p>
					<br />
					<Link href={"/user/verify-emails/upload-file"}>
						<Button>Choose</Button>
					</Link>
				</div>
				{/* COPY AND PASTE */}
				<div className=' shadow-lg border border-primary bg-secondary/60 aspect-[10/9] text-center gap-2 p-6 md:p-12 rounded-xl flex flex-col justify-center items-center'>
					<Image alt='' src={CopyPasteImage} height={55} />
					<h1 className=' text-2xl font-bold'>Copy And Paste</h1>
					<p className=' text-muted-foreground '>
						Easily copy and paste email addresses from a spreadsheet or a
						similar source
					</p>
					<br />
					<Link href={"/user/verify-emails/copy-paste"}>
						<Button>Choose</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
