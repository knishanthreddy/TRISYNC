import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: "TRISYNC — Your Life. In Sync.",
  description:
    "Unified personal wellbeing intelligence ecosystem connecting Physical Health, Mental Wellbeing, and Digital Habits.",
  keywords: [
    "Wellbeing Intelligence",
    "Physical Wellbeing",
    "Mental Wellbeing",
    "Digital Wellbeing",
    "TRISYNC",
    "Holistic Health Sync",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#F5F1E8] text-[#222624] font-sans antialiased selection:bg-[#183C32] selection:text-[#F5F1E8] min-h-screen flex flex-col justify-between">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
