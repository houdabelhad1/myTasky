import "./globals.css"

export const metadata = {
  title: "Ma Liste de Tâches",
  description: "Application de gestion de tâches avec React et Spring Boot",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
