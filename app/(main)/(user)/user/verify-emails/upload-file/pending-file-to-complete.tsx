"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";

export default function PendingFileToComplete({
	fileId,
	enterEmails,
	userId,
}: {
	fileId: string;
	enterEmails: string[];
	userId: string;
}) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleFileUpload = async () => {
		startTransition(async () => {
			if (userId) {
				// toast.warning(`parsing start of ${fileId}`);
				const res = await fetch("/api/parse-upload-file", {
					method: "POST",
					body: JSON.stringify({ fileId, userId, enterEmails }),
				});

				const data = await res.json();
				if (!res.ok) {
					toast.error(data.error || "Something went wrong");
				} else {
					toast.success("successfully file parsed");
					router.refresh();
				}
			} else {
				toast.error("UnAuthorized!");
			}
		});
	};

	useEffect(() => {
		handleFileUpload();
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			{isPending ? (
				<Button onClick={handleFileUpload} disabled={isPending}>
					Parsing
				</Button>
			) : (
				<Link href={"/pricing"} onClick={handleFileUpload}>
					<Button disabled={isPending}>Buy Credits</Button>
				</Link>
			)}
		</div>
	);
}
