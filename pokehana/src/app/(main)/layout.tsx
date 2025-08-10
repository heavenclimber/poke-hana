import Sidebar from "@/layouts/Sidebar";
import { ThemeRegistry } from "@/app/provider";
import { SnackbarProvider } from "@/app/provider";
import "../global.css";

export const metadata = {
  title: "PokeHana",
  description: "Next based your one stop Pokedex to go",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen">
        <SnackbarProvider>
          <ThemeRegistry>
            <Sidebar />
            <main className="flex-1 h-screen flex flex-col transition-all overflow-hidden">
              {children}
            </main>
          </ThemeRegistry>
        </SnackbarProvider>
      </body>
    </html>
  );
}
