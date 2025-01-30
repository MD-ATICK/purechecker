"use client";
import { singleCheckEmailVerify } from "@/actions/emailVerify";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { anonymousUserCheck } from "@/lib/anonymousAction";
import { cn } from "@/lib/utils";
import { useCreditStore } from "@/store/useCreditStore";
import { useUserStore } from "@/store/useUserStore";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function EmailCheckerField() {
  const [search, setSearch] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { user } = useUserStore();
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<{
    email: string;
    domain: string;
    reason: string;
    isExist: boolean;
    isValidSyntax: boolean;
    isValidDomain: boolean;
    riskLevel: string;
    mxRecords: { priority: number; exchange: string }[];
    isDisposable: boolean;
    free: boolean;
    role: string;
  }>();

  const { credit, setCredit } = useCreditStore();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const onsubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsPending(true);
      console.log(user);
      if (!user || !user.id) {
        const { data, message, popup } = await anonymousUserCheck({
          email: search,
        });
        console.log({ data, message, popup });
        if (popup) {
          setIsPopUpOpen(true);
          return;
        }
        if (data && message) {
          setOpen(true);
          setResult(data);
        }
        return;
      }

      if (user.banned) {
        return toast.error("You are banned.");
      }

      if (!search.length) {
        return toast.error("Enter something");
      }

      const res = await singleCheckEmailVerify({
        email: search.trim(),
        userId: user.id as string,
      });
      if (res.data) {
        setResult(res.data);
        setCredit(credit - 1);
        // setSearch("")
        setOpen(true);
        if (res.data.isExist) {
          toast.success("Email exists");
        } else {
          toast.success("Email does not exist");
        }
      } else if (res.error) {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  // const smtpExistCheckHandle = async () => {
  //   const email = prompt('enter your email') || 'hristinasolomone84@gmail.com'
  //   const domain = email?.split("@")[1];
  //   const mxRecords = await getMxRecords(domain);
  //   const res = await smtpClientCheck({ email, mxRecord: mxRecords[0]?.exchange })
  //   console.log(res)
  // };

  return (
    <div className=" w-full">
      {/* <Button onClick={smtpExistCheckHandle}>
        Test click
      </Button> */}
      {/* Dialog */}
      <Dialog open={isPopUpOpen} onOpenChange={setIsPopUpOpen}>
        <DialogContent>
          <div className=" flex justify-center items-center text-center flex-col">
            <DialogTitle className=" font-bold text-3xl text-red-500">
              Verify Failed 💔
            </DialogTitle>
            <p className=" text-muted-foreground">
              Your have been used{" "}
              <span className=" font-bold text-primary">20/20</span> of your
              free credit. Please register to get free{" "}
              <span className=" font-bold text-primary">100</span> credit
            </p>
            <br />
            <div>
              <Link href={"/login"} className=" w-1/2">
                <Button className=" w-full">Login</Button>
              </Link>
              <Link href={"/signup"} className=" w-1/2">
                <Button className=" w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <form onSubmit={onsubmit} className="w-full flex items-center gap-1">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter your email"
          className="  border-2 border-primary h-12 md:h-14 w-full"
        />
        {/* <LoadingButton
          isPending={isPending}
          disabled={isPending || !search.length}
          type="submit"
          className="h-14 block md:hidden"
        >
          <Image alt="" src={searchImage} height={20} />
        </LoadingButton> */}
        {/* <LoadingButton
          isPending={isPending}
          disabled={isPending || !search.length}
          type="submit"
          className="h-14"
        >
          Check Single Email
        </LoadingButton> */}
        <Button
          type="submit"
          disabled={isPending || !search.length}
          className=" h-12 md:h-14 text-xs md:text-sm"
        >
          {isPending ? <Loading className=" text-white" /> : "Verify Email"}
        </Button>
      </form>

      {result && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className={cn(
              "w-[95%] md:min-w-[60%] p-6 md:p-10 rounded-xl border-[4px]",
              result.isExist
                ? " border-green-500 bg-green-50"
                : "border-destructive bg-red-50"
            )}
          >
            <div className=" w-full space-y-3 md:space-y-8">
              <div className=" text-center flex-col flex justify-center items-center">
                <DialogTitle className=" font-bold text-xl md:text-3xl">
                  {result.email}
                </DialogTitle>
                <p className="text-sm md:text-lg text-muted-foreground">
                  is{" "}
                  <span
                    className={cn(
                      "font-bold",
                      result.isExist ? " text-green-500" : "text-red-500"
                    )}
                  >
                    {result.isExist ? "deliverable" : "undeliverable"}
                  </span>{" "}
                  email address
                </p>
              </div>
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10">
                {/* PART - 1 START */}
                <div className=" space-y-3 md:space-y-5">
                  <div className=" flex justify-between items-center">
                    <p className=" text-muted-foreground font-medium">Status</p>
                    <p className=" text-sm font-bold ">{result.reason}</p>
                  </div>
                  <div className=" flex justify-between items-center">
                    <p className=" text-muted-foreground font-medium">ESP</p>
                    <p className=" font-bold  text-sm md:text-lg capitalize">
                      {result.domain.split(".")[0]}
                    </p>
                  </div>
                  <div className=" flex justify-between items-center">
                    <p className=" text-muted-foreground font-medium">
                      Account
                    </p>
                    <p className=" font-bold  text-sm md:text-lg">
                      {result.email.split("@")[0]}
                    </p>
                  </div>
                  <div className=" flex justify-between items-center">
                    <p className=" text-muted-foreground font-medium">Free</p>
                    <p className=" font-bold  text-sm md:text-lg">
                      {result.free ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className=" flex justify-between items-center">
                    <p className=" text-muted-foreground font-medium">Role</p>
                    <p className=" font-bold  text-sm md:text-lg">
                      {result.role}
                    </p>
                  </div>
                  <div className=" flex justify-between items-center">
                    <p className=" text-muted-foreground font-medium">
                      Risk Level
                    </p>
                    <p
                      className={cn(
                        "font-bold  text-sm md:text-lg",
                        result.riskLevel === "low"
                          ? "text-green-500"
                          : "text-red-500"
                      )}
                    >
                      {result.riskLevel}
                    </p>
                  </div>
                </div>

                {/* PART - 2 START */}
                <div className=" space-y-3 md:space-y-5">
                  <div className=" flex justify-between items-center">
                    <p className=" text-muted-foreground font-medium">
                      Mx Server:
                    </p>
                    <p className=" font-bold text-xs line-clamp-1 md:text-md">
                      {result?.mxRecords[0]?.exchange || "unknown"}
                    </p>
                  </div>
                  <div className=" flex justify-between items-center">
                    <p className=" text-muted-foreground font-medium">
                      First Name:
                    </p>
                    <p className=" font-bold text-md text-muted-foreground">
                      Unknown
                    </p>
                  </div>
                  <div className=" flex justify-between items-center">
                    <p className=" text-muted-foreground font-medium">
                      Last Name:
                    </p>
                    <p className=" font-bold text-md text-muted-foreground">
                      Unknown
                    </p>
                  </div>
                  <div className=" flex justify-between items-center">
                    <p className=" text-muted-foreground font-medium">
                      Disposable:
                    </p>
                    <p
                      className={cn(
                        "font-bold text-md",
                        !result.isDisposable ? "text-green-500" : "text-red-500"
                      )}
                    >
                      {result.isDisposable ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className=" flex justify-between items-center">
                    <p className=" text-muted-foreground font-medium">
                      Valid Syntax:
                    </p>
                    <p
                      className={cn(
                        "font-bold text-md",
                        result.isValidSyntax ? "text-green-500" : "text-red-500"
                      )}
                    >
                      {result.isValidSyntax ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className=" flex justify-between items-center">
                    <p className=" text-muted-foreground font-medium">
                      Valid Domain:
                    </p>
                    <p
                      className={cn(
                        "font-bold text-md",
                        result.isValidDomain ? "text-green-500" : "text-red-500"
                      )}
                    >
                      {result.isValidDomain ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setOpen(false)}
                variant={"destructive"}
                className=" h-12 w-full"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
