import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Hydration Patterns",
  description: "Interview examples for hydration, streaming, and server components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
