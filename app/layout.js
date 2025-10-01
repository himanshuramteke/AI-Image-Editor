import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import FloatingShapes from "@/components/floating-shapes";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Pixxel",
  description: "AI Image Editor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="bg-slate-900 min-h-screen text-white overflow-x-hidden">
            <Toaster richColors />
            <FloatingShapes />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
