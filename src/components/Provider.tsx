"use client";
import { SessionProvider } from "next-auth/react";

interface providerProp {
  children: React.ReactNode;
  session?: any;
}

const Provider: React.FC<providerProp> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
