'use client';

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/theme"; // Import your custom theme

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          {/* Apply the Material UI theme to the app */}
          <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Normalizes and applies default styles */}
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
