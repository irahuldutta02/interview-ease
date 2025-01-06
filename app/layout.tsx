import HomeButton from "@/components/custom/HomeButton";
import { ModeToggle } from "@/components/custom/ModeToggle";
import { Toaster } from "@/components/ui/toaster";
import { InterviewProvider } from "@/context/interview-provider";
import { ThemeProvider } from "@/context/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InterviewEase",
  description: "Interview preparation made easy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <InterviewProvider>
            <div className="fixed top-4 left-4 z-50">
              <HomeButton />
            </div>
            <div className="fixed top-4 right-4 z-50">
              <ModeToggle />
            </div>
            {children}
            <Toaster />
          </InterviewProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
