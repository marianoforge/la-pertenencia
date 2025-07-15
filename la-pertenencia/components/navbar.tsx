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
            fill
            priority
            alt="La Pertenencia Logo"
            className="object-contain"
            sizes="160px"
            src="/images/logo-txt.svg"
          />
        </NextLink>
      </div>

      {/* Right side - Desktop Menu + Icons */}
      <div className="flex justify-start items-center gap-6">
        {/* Desktop Menu - Hidden on smaller screens */}
        <div className="hidden lg:flex justify-start items-center gap-6">
          {menuItems.map((item) => (
            <NextLink
              key={item.name}
              className="text-white text-xs font-normal font-['Lora'] tracking-[4px] hover:text-amber-300 transition-colors"
              href={item.href}
            >
              {item.name}
            </NextLink>
          ))}
        </div>

        {/* Vertical separator - Hidden on smaller screens */}
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
            <Image
              alt="Menu"
              className="object-contain"
              height={24}
              src="/icons/majesticons_menu.svg"
              width={24}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Only visible on smaller screens */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-stone-900 border-t border-stone-700 lg:hidden z-40">
          <div className="flex flex-col py-4">
            {menuItems.map((item) => (
              <NextLink
                key={item.name}
                className="px-4 py-3 text-white text-sm font-normal font-['Lora'] tracking-[2px] hover:bg-stone-800 hover:text-amber-300 transition-colors"
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NextLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
