import "./styles/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "../redux/provider";
import { ToastProvider } from "../app/components/providers";
import { Analytics } from "@vercel/analytics/react";
// import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "SGetInToPC - Full Version Software",
//   description:
//     "Free Download Windows & MacOS software, Android Apps & Games, E-Learning Videos & E-Books, PC Games, Scripts and much more.",
// };

export default function RootLayout({ children }) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <html lang="en">
      {/* <head>
        <link
          rel="canonical"
          href={currentUrl || "https://crackswall.vercel.app"}
        />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head> */}

      <head>
        <meta
          name="google-site-verification"
          content="9Kha2iKnwOoPb2FeEYHIHIAGFNGBXY-zokhlaqApGhg"
        />
      </head>

      <body className={`${inter.className} bg-[#F5F5F5]`}>
        <ToastProvider />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
