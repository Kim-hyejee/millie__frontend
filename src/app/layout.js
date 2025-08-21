import './globals.css'

export const metadata = {
  title: 'Frontend App',
  description: 'Next.js 기반 프론트엔드 애플리케이션',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
