import type { Metadata } from "next";
import {  Geist_Mono,Space_Grotesk} from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// const lexend = Lexend({
//   variable: "--font-lexend",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Time Project",
  description: "A Project Created By Yash Bokade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
