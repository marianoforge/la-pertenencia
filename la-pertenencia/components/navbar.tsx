import NextLink from "next/link";
import { useState } from "react";
import Image from "next/image";

import CartButton from "@/components/CartButton";

const menuItems = [
  { name: "INICIO", href: "/" },
  { name: "VINOS", href: "/vinos" },
  { name: "CREA TU VINO", href: "#imagina-tu-vino" },
  { name: "REGALOS", href: "#regalos" },
  { name: "CATAS", href: "#catas-maridajes" },
  { name: "MEMBRESÍAS", href: "#membresia" },
  { name: "CONTACTO", href: "#contacto" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full px-4 py-3 bg-stone-900 sticky top-0 z-50 flex justify-between items-center">
      {/* Logo */}
      <div className="w-40 h-3.5 relative">
        <NextLink className="flex items-center w-full h-full" href="/">
          <Image
            alt="Logo"
            height={18}
            src="/images/logo-txt.svg"
            width={200}
          />
        </NextLink>
      </div>

      {/* Right side - Desktop Menu + Icons */}
      <div className="flex items-center gap-6">
        {/* Desktop Menu - Hidden on mobile, visible on lg+ */}
        <div className="hidden lg:flex items-center gap-6">
          {menuItems.map((item) =>
            item.href.startsWith("/") ? (
              <NextLink
                key={item.name}
                className="text-sm text-blanco-puro hover:text-dorado-light transition-colors duration-200 py-2 relative group font-lora tracking-wide cursor-pointer"
                href={item.href}
              >
                {item.name}
                {/* Línea dorada en hover para desktop */}
                <span className="absolute bottom-0 left-1/2 w-full h-0.5 bg-dorado-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center -translate-x-1/2" />
              </NextLink>
            ) : (
              <a
                key={item.name}
                className="text-sm text-blanco-puro hover:text-dorado-light transition-colors duration-200 py-2 relative group font-lora tracking-wide cursor-pointer"
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(item.href);

                  if (target) {
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                {item.name}
                {/* Línea dorada en hover para desktop */}
                <span className="absolute bottom-0 left-1/2 w-full h-0.5 bg-dorado-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center -translate-x-1/2" />
              </a>
            ),
          )}
        </div>

        {/* Vertical separator - Only visible on lg+ */}
        <div className="w-5 h-0 rotate-90 outline outline-[0.81px] outline-offset-[-0.41px] outline-white hidden lg:block" />

        {/* Icons */}
        <div className="flex justify-start items-center gap-4">
          {/* Cart Icon */}
          <CartButton />

          {/* Vertical separator - Hidden on lg+ */}
          <div className="w-5 h-0 rotate-90 outline outline-[0.81px] outline-offset-[-0.41px] outline-white lg:hidden" />

          {/* Menu hamburger - Hidden on lg+ */}
          <button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="w-6 h-6 hover:opacity-75 transition-opacity lg:hidden"
            onClick={() => {
              console.log("Menu clicked, current state:", isMenuOpen);
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <img
              alt="Menu"
              className="w-6 h-6 object-contain"
              src="/icons/majesticons_menu.svg"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Only visible on smaller screens */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-stone-900 border-t border-stone-700 shadow-lg z-[60] lg:hidden">
          {menuItems.map((item) =>
            item.href.startsWith("/") ? (
              <NextLink
                key={item.name}
                className="w-full text-sm text-blanco-puro hover:text-dorado-light transition-colors duration-200 py-4 px-6 flex items-center justify-center relative group font-lora tracking-wide block cursor-pointer"
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
                {/* Línea dorada en hover para móvil */}
                <span className="absolute bottom-0 left-1/2 w-1/2 h-0.5 bg-dorado-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center -translate-x-1/2" />
              </NextLink>
            ) : (
              <a
                key={item.name}
                className="w-full text-sm text-blanco-puro hover:text-dorado-light transition-colors duration-200 py-4 px-6 flex items-center justify-center relative group font-lora tracking-wide block cursor-pointer"
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  const target = document.querySelector(item.href);

                  if (target) {
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                {item.name}
                {/* Línea dorada en hover para móvil */}
                <span className="absolute bottom-0 left-1/2 w-1/2 h-0.5 bg-dorado-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center -translate-x-1/2" />
              </a>
            ),
          )}
        </div>
      )}
    </div>
  );
};
