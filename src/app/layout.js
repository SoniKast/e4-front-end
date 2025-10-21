import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Gestion Interventions BTP",
  description: "Application de gestion des interventions pour entreprise BTP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased bg-gray-50`}
      >
        <div className="flex h-screen">
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
