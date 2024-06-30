import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from './Toast';
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Task Management Application',
  description: 'task management application for learning next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
      className={inter.className}>
        {children}
        <ToastContainer/>
      </body>
    </html>
  )
}
