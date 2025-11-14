import './globals.css'

export const metadata = {
  title: 'Viral Clips Generator - Free Video Editor',
  description: 'Create viral video clips for free using AI-powered tools. Trim, resize, and share on TikTok, YouTube, Instagram, and more.',
  keywords: 'viral clips, video editor, free, FFmpeg, TikTok, YouTube, Instagram',
  author: 'Viral Clips Generator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8b5cf6" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎬</text></svg>" />
      </head>
      <body className="bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-purple-600">🎬 Viral Clips</h1>
            <div className="text-sm text-gray-600">
              100% Free | Powered by FFmpeg
            </div>
          </div>
        </nav>
        
        <main>
          {children}
        </main>

        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="mb-2">© 2025 Viral Clips Generator. All rights reserved.</p>
            <p className="text-gray-400 text-sm">Built with Next.js, React, Tailwind CSS, and FFmpeg.wasm</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
