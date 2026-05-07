import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { DesignSystemsProvider } from "@/lib/design-systems";
import { ThemeProvider } from "@designbase/components";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ergo, Design — Build Design Systems",
  description: "The collaborative platform for building and managing design systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider defaultTheme="system">
          <AuthProvider>
            <DesignSystemsProvider>{children}</DesignSystemsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
