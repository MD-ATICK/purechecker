import { auth } from "@/auth";
import AdditionalMessage from "@/components/AdditionalMessage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className=" relative">
      {session && (
        <AdditionalMessage
          email={session.user.email!}
          verified={session?.user.emailVerified ? true : false}
          banned={session?.user.banned || false}
        />
      )}
      <Navbar />
      {children}
      <Footer />
      {/* </SessionProvider> */}
    </div>
  );
}
