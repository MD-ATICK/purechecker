"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";

export default function PendingFileToComplete({
<<<<<<< HEAD
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
        toast.warning(`parsing start of ${fileId}`);
        const res = await fetch("/api/parse-upload-file", {
          method: "POST",
          body: JSON.stringify({ fileId, userId, enterEmails }),
        });

        if (!res.ok) {
          toast.error("Something happen wrong");
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
      <Button onClick={handleFileUpload} disabled={isPending}>
        {isPending ? "Parsing" : "Again"}
      </Button>
    </div>
  );
=======
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
			console.log(userId, fileId, enterEmails);
			if (userId) {
				const res = await fetch("/api/parse-upload-file", {
					method: "POST",
					body: JSON.stringify({ fileId, userId, enterEmails }),
				});

				if (!res.ok) {
					const data: { error: string } = await res.json();
					toast.error(data.error);
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
			<Button onClick={handleFileUpload} disabled={isPending}>
				{isPending ? "Parsing" : "Again"}
			</Button>
		</div>
	);
>>>>>>> fa713f7 (update almost done without blog)
}
