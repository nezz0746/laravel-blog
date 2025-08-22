import type { Metadata } from "next";
import { Inter, Crimson_Text, Work_Sans } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/QueryProvider";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Modern Blog",
  description: "A beautiful blog built with Next.js and GraphQL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${crimsonText.variable} ${workSans.variable} antialiased`}
      >
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <Link href="/">
                  <h1 className="text-2xl font-medium text-gray-900 font-work-sans">
                    Modern Blog
                  </h1>
                </Link>
                <nav className="space-x-8">
                  <a
                    href="/create"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Create Post
                  </a>
                </nav>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <QueryProvider>{children}</QueryProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
