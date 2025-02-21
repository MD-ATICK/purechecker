import { auth } from "@/auth";
import BannedMessage from "@/components/BannedMessage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NotVerifiedMessage from "@/components/NotVerifiedMessage";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log("check", session);

  return (
    <div className=" relative">
      {/* <SessionProvider session={session}> */}
      {session?.user.banned ? <BannedMessage /> : null}
      {session?.user.email && session?.user.emailVerified === null ? (
        <NotVerifiedMessage email={session.user.email!} />
      ) : null}
      <Navbar />
      {children}F
      <Footer />
      {/* </SessionProvider> */}
    </div>
  );
}
