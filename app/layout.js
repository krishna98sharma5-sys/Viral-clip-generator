import './globals.css'

export const metadata = {
  title: 'Viral Clips Generator',
  description: 'Create viral video clips for free',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}
