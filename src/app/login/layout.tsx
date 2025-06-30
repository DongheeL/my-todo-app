import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - My Todo App",
  description: "Login to My Todo App with Google",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
