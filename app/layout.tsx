import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { Toaster } from "react-hot-toast";
import Providers from "@/context/providers";
import Header from "@/components/globals/header";
import AppContextProvider from "@/context/appContext";
import { LocalStorageProvider } from "@/context/storageContext";
import { SocketProvider } from "@/context/socketProdiver";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["500", "600"] });

export const metadata: Metadata = {
  title: "Lucky Quit | Quit Smoking App",
  description:
    "Discover top-notch smoking cessation coaches and take control of your journey to quit smoking. Our app empowers you to track your cigarette consumption, monitor your health progress, and visualize the money saved. Start your smoke-free life today!",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-gray-50`}>
        <ActiveSectionContextProvider>
          <Providers>
            <AppContextProvider>
              <LocalStorageProvider>
                <SocketProvider>
                  <Header />
                  {children}
                  <Toaster position="top-right" />
                </SocketProvider>
              </LocalStorageProvider>
            </AppContextProvider>
          </Providers>
        </ActiveSectionContextProvider>
      </body>
    </html>
  );
}
