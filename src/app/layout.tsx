import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AppContextProvider } from "@/context/AppContext";
import DevRoleSwitcher from "@/components/DevRoleSwitcher";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "HardwareFix | Hyperlocal Repairs & Assembly",
  description: "Book verified hardware experts in minutes. One Platform. Every Hardware Fix.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-full bg-background text-text font-sans selection:bg-brand-blue/30 antialiased">
        <AppContextProvider>
          {children}
          <DevRoleSwitcher />
        </AppContextProvider>
      </body>
    </html>
  );
}
