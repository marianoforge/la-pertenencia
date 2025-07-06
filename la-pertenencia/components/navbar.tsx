import NextLink from "next/link";
import { useState } from "react";

import CartButton from "@/components/CartButton";

const menuItems = [
  { name: "INICIO", href: "/" },
  { name: "VINOS", href: "/vinos" },
  { name: "CREA TU VINO", href: "/crea-tu-vino" },
  { name: "REGALOS", href: "/regalos" },
  { name: "CATAS", href: "/catas" },
  { name: "MEMBRESÍAS", href: "/membresias" },
  { name: "CONTACTO", href: "/contacto" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full px-4 py-3 bg-stone-900 sticky top-0 z-50 flex justify-between items-center overflow-hidden">
      {/* Logo */}
      <div className="w-40 h-3.5 relative">
        <NextLink className="flex items-center w-full h-full" href="/">
          <span className="text-sm text-blanco-puro font-lora tracking-wide">
            LA PERTENENCIA
          </span>
        </NextLink>
      </div>

      {/* Right side icons */}
      <div className="flex justify-start items-center gap-4">
        {/* Cart Icon */}
        <CartButton />

        {/* Vertical separator */}
        <div className="w-5 h-0  rotate-90 outline outline-[0.81px] outline-offset-[-0.41px] outline-white  " />

        {/* Menu hamburger */}
        <button
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="w-6 h-6 hover:opacity-75 transition-opacity"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img
            alt="Menu"
            className="w-6 h-6 object-contain"
            src="/icons/majesticons_menu.svg"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-negro-puro pt-6 pb-6 z-40">
          {menuItems.map((item) => (
            <NextLink
              key={item.name}
              className="w-full text-menu text-blanco-puro hover:text-dorado-light transition-colors duration-200 py-2 flex items-center justify-center relative group"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
              {/* Línea dorada en hover para móvil */}
              <span className="absolute bottom-0 left-1/2 w-1/2 h-0.5 bg-dorado-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center -translate-x-1/2" />
            </NextLink>
          ))}
        </div>
      )}
    </div>
  );
};
