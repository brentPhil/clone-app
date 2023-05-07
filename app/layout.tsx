import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Poppins } from "next/font/google"
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'
const font = Poppins({ weight: ["400"], subsets: ["latin"] })

export const metadata = {
  title: 'Airbnb_clone',
  description: 'My First next 13 project',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <RentModal />
        <SearchModal />
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
