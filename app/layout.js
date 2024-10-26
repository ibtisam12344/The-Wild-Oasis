import "@/app/_styles/globals.css";
import Header from "./_components/Header";

import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "./_components/ReservationContext";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    // %s is whatever the title of individual page that we put in each page of metadata as title
    template: "%s / The Wild Oasis",
    default: "The Wild Oasis",
  },
  // vv imp for SEO is page description
  description:
    "Luxurious cabin hotel, located in the heart of Pakistan, Islamabad surrounded by the beautiful mountains and dark forests.",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${josefin.className} relative antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid ">
          <main className="max-w-[90rem] mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
