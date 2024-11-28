"use client";

import { HelmetProvider } from "react-helmet-async";

export default function HelmetWrapper({ children }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}
