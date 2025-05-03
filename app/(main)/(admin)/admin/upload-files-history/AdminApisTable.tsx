import { getTodayFileUploadHistory } from "@/app/(main)/(user)/user/api/actions";
import DownloadFileDrawer from "@/app/(main)/(user)/user/verify-emails/upload-file/components/download-file-drawer";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatRelativeDate } from "@/lib/utils";

export default async function AdminApiTable() {
	const data = await getTodayFileUploadHistory();

	return (
		<div className=' w-full'>
			<Table>
				<TableCaption>A list of Upload File History.</TableCaption>
				<TableHeader>
					<TableRow className=' font-medium'>
						<TableHead className='w-[50px]'>NO</TableHead>
						<TableHead>User Email</TableHead>
						<TableHead>File Name</TableHead>
						<TableHead>File Type</TableHead>
						<TableHead>File Size</TableHead>
						<TableHead className=' whitespace-nowrap'>
							Uploaded Emails
						</TableHead>
						<TableHead className=' whitespace-nowrap'>Status</TableHead>
						<TableHead>CreatedAt</TableHead>
						<TableHead>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.uploadedFiles?.map((uploadFile, index) => {
						return (
							<TableRow key={uploadFile.id}>
								<TableCell className='w-[50px] font-medium'>
									{index + 1}
								</TableCell>

								<TableCell className='font-medium'>
									{uploadFile.User?.email}
								</TableCell>
								<TableCell className='font-medium'>
									{uploadFile.fileName}
								</TableCell>
								<TableCell className='font-medium'>
									{uploadFile.fileType}
								</TableCell>
								<TableCell className='font-medium text-primary'>
									{(uploadFile.fileSize / 1000).toFixed(1)}kb
								</TableCell>
								<TableCell className='font-medium'>
									{uploadFile.enterEmails.length}
								</TableCell>
								<TableCell className='font-medium'>
									{uploadFile.status}
								</TableCell>
								<TableCell className='font-medium'>
									{formatRelativeDate(uploadFile.createdAt)}
								</TableCell>
								<TableCell className='font-medium'>
									<DownloadFileDrawer fileId={uploadFile.id} />
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
