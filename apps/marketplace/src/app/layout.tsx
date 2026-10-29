"use client"

import Header from '@components/header'
import './globals.css'
import Footer from '@components/footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@components/ui/toaster'

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </body>
      </html>
    </QueryClientProvider>
  )
}
