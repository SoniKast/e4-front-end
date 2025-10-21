import "./globals.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import Sidebar from "../components/Sidebar";

export const metadata = {
  title: "Gestion Interventions BTP",
  description: "Application de gestion des interventions pour entreprise BTP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <Theme appearance="light" accentColor="blue" grayColor="gray" radius="medium">
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto p-6">
              {children}
            </main>
          </div>
        </Theme>
      </body>
    </html>
  );
}
