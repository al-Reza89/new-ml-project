import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ml-project",
  description: "ml-project",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // it is server component so ekhane data fetch korte pari

  const currentUser = await getCurrentUser();
  // ekhane eivabe o likhte partam
  //  const currentUser=await prisma?.user.find().... but scalabel korar jonno eivabe lekha

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
