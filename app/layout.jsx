import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js + WebRTC Starter",
  description: "A video conferencing app built with Next.js and WebRTC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn("bg-black text-onSurface", inter.className)}>
        {children}
      </body>
    </html>
  );
}
