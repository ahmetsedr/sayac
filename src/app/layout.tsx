import '../css/globalcss.css'
import { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'Sayaç Uygulaması',
    template: '%s | Sayaç Uygulaması'
  },
  description: 'Kullanıcı dostu sayaç ve geri sayım uygulaması.',
  authors: [{ name: 'ahmetsedr' }],
  creator: 'ahmetsedr',
  publisher: 'ahmetsedr',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://sayac-pink.vercel.app',
    siteName: 'Sayaç Uygulaması',
    title: 'Sayaç Uygulaması - Modern Zamanlayıcı',
    description: 'Kullanıcı dostu sayaç ve geri sayım uygulaması.',
    images: [
      {
        url: 'https://cdn-icons-png.flaticon.com/512/3798/3798413.png',
        width: 1200,
        height: 630,
        alt: 'Sayaç Uygulaması',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sayaç Uygulaması - Modern Zamanlayıcı',
    description: 'Modern ve kullanıcı dostu sayaç ve geri sayım uygulaması',
    creator: '@yourusername',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          {children}
          <footer className="mt-8 text-gray-400 text-sm flex flex-col items-center gap-2">
            <div className="flex gap-4">
              <a 
                href="https://github.com/ahmetsedr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/ahmet-semih-dur/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
            <div>
              © 2024 Sayaç Uygulaması
            </div>
          </footer>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Sayaç Uygulaması",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </body>
    </html>
  )
}
