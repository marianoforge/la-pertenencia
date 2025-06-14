import { Head } from "./head";

import { Navbar } from "@/components/navbar";
import Cart from "@/components/Cart";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <p className="text-default-600">
          © 2024 La Pertenencia - Vinos únicos para momentos especiales
        </p>
      </footer>
      <Cart />
    </div>
  );
}
