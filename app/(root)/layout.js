import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import Navbar from "./../../components/Navbar";
import Footer from "./../../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ChemviZ",
  description: "Chemistry app for everyone",
};

export default function RootLayout({ children }) {
  return (

    <section
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      lang="en"
    >
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
