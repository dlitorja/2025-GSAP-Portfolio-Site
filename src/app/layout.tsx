import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Litorja - Creative Developer & Designer",
    template: "%s | Litorja",
  },
  description: "Portfolio of Litorja - Creative developer and designer crafting beautiful digital experiences with modern web technologies.",
  keywords: ["portfolio", "web development", "design", "creative coding", "GSAP", "Next.js"],
  authors: [{ name: "Litorja" }],
  creator: "Litorja",
  metadataBase: new URL("https://litorja.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://litorja.com",
    siteName: "Litorja Portfolio",
    title: "Litorja - Creative Developer & Designer",
    description: "Portfolio of Litorja - Creative developer and designer crafting beautiful digital experiences.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Litorja Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Litorja - Creative Developer & Designer",
    description: "Portfolio of Litorja - Creative developer and designer crafting beautiful digital experiences.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
