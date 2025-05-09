import NotFound from "@/app/not-found";
import { getUser } from "@/lib/getUser";
import ApiTable from "./ApiTable";
import ApiTokenCreateDialog from "./ApiTokenCreateDialog";
import CopyButton from "./CopyButton";

export default async function page() {
	const user = await getUser();

	if (!user || !user.id) {
		return <NotFound />;
	}

	return (
		<div className=' p-[1.5vw] space-y-5 h-screen'>
			<div className=' flex flex-col gap-4 md:flex-row justify-between items-center'>
				<div className='flex-1 w-full space-y-3'>
					<div>
						<h1 className=' text-xl font-bold'>Copy User Id</h1>
						<p className=' text-muted-foreground'>
							Use this user id to access api
						</p>
					</div>
					<CopyButton text={user.id} />
				</div>
				<ApiTokenCreateDialog userId={user.id} />
			</div>
			<ApiTable userId={user.id} />
		</div>
	);
}
