import type { Metadata, Viewport } from "next";
import { Inter, Marhey } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LanguageLoadingScreen from "@/components/LanguageLoadingScreen";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import ClientThemeProvider from "@/components/ClientThemeProvider";
import LayoutWrapper from "@/components/LayoutWrapper";
import SmoothScroll from "@/components/scroll/SmoothScroll";
import { SidebarProvider } from "@/context/SidebarContext";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const marhey = Marhey({
  subsets: ["arabic", "latin"],
  variable: "--font-marhey",
  display: "swap",
});


const siteDescription =
  "Abdullah Nasser — software developer and IT project manager building apps, AI agents and automation.";

export const metadata: Metadata = {
  metadataBase: new URL("https://an1.space"),
  title: "Abdullah Nasser",
  description: siteDescription,
  authors: [{ name: "Abdullah Nasser" }],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/icon.svg?v=2", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.png?v=2",
  },
  openGraph: {
    title: "Abdullah Nasser",
    description: siteDescription,
    type: "website",
    url: "/",
    images: [{ url: "/og-an.png", width: 1200, height: 630, alt: "Abdullah Nasser" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Nasser",
    description: siteDescription,
    images: ["/og-an.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0820",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`dark ${inter.variable} ${marhey.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var root = document.documentElement;

                  // Preference version gate
                  var pv = localStorage.getItem('prefVersion');
                  if (pv !== '5') {
                    localStorage.setItem('language', 'en');
                    localStorage.setItem('colorScheme', 'default');
                    localStorage.setItem('themeMode', 'dark');
                    localStorage.setItem('prefVersion', '5');
                  }

                  // Language & direction BEFORE first paint
                  var lang = localStorage.getItem('language') || 'en';
                  root.lang = lang;
                  root.dir = lang === 'ar' ? 'rtl' : 'ltr';
                  window.__INITIAL_LANG__ = lang;

                  // Theme mode BEFORE first paint
                  var tm = localStorage.getItem('themeMode') || 'dark';
                  if (tm === 'dark') { root.classList.add('dark'); }
                  else { root.classList.remove('dark'); }
                  window.__INITIAL_THEME__ = tm;
                  window.__INITIAL_COLOR_SCHEME__ = localStorage.getItem('colorScheme') || 'default';

                  // Default dark fallback colors
                  var c = {
                    primary:'#a855f7', primaryDark:'#7c3aed', secondary:'#3f3f46',
                    accent:'#52525b', muted:'#a1a1aa', background:'#09090b',
                    foreground:'#fafafa', cardBg:'#1c1c1e', border:'#2c2c2e'
                  };
                  Object.keys(c).forEach(function(k) {
                    root.style.setProperty('--'+k.replace(/([A-Z])/g,'-$1').toLowerCase(), c[k]);
                  });
                  root.style.setProperty('--card', c.cardBg);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased" style={{ backgroundColor: 'var(--background)' }}>
        <ClientThemeProvider>
          <Analytics/>
          <LanguageLoadingScreen />
          <SmoothScroll>
          <SidebarProvider>
            <LayoutWrapper>
              <div className="min-h-screen w-full">
                <Navbar />
                <main className="flex-1 transition-all duration-300 relative w-full min-w-0 pt-20 lg:pt-24">
                  <ErrorBoundary>
                    {children}
                  </ErrorBoundary>
                </main>
              </div>
            </LayoutWrapper>
          </SidebarProvider>
          <ScrollToTop />
          </SmoothScroll>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
