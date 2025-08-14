import NextLink from "next/link";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import CartButton from "@/components/CartButton";

const menuItems = [
  { name: "INICIO", href: "/" },
  { name: "VINOS", href: "/vinos" },
  { name: "CREA TU VINO", href: "/crea-tu-vino" },
  // { name: "REGALOS", href: "/#regalos" },
  { name: "CATAS", href: "/catas" },
  { name: "MEMBRESÍAS", href: "/membresias" },
  { name: "CONTACTO", href: "#contacto" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full bg-stone-900 sticky top-0 z-50">
      <div className="fluid-navbar-padding py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          className="relative"
          style={{ width: "clamp(8rem, 12vw, 10rem)", height: "0.875rem" }}
        >
          <NextLink className="flex items-center w-full h-full" href="/">
            <Image
              fill
              priority
              alt="La Pertenencia Logo"
              className="object-contain"
              sizes="(max-width: 768px) 8rem, (max-width: 1200px) 10vw, 10rem"
              src="/images/logo-txt.svg"
            />
          </NextLink>
        </div>

        {/* Right side - Desktop Menu + Icons */}
        <div
          className="flex justify-start items-center"
          style={{ gap: "clamp(1rem, 2vw, 1.5rem)" }}
        >
          {/* Desktop Menu - Fluid visibility */}
          <div className="fluid-menu-hide justify-start items-center fluid-gap">
            {menuItems.map((item) => (
              <NextLink
                key={item.name}
                className="text-white font-normal font-['Lora'] hover:text-amber-300 transition-colors whitespace-nowrap"
                href={item.href}
                style={{
                  fontSize: "clamp(0.625rem, 0.8vw, 0.75rem)",
                  letterSpacing: "clamp(0.15rem, 0.3vw, 0.25rem)",
                }}
              >
                {item.name}
              </NextLink>
            ))}
          </div>

          {/* Vertical separator - Desktop only */}
          <div className="fluid-menu-hide w-5 h-0 rotate-90 outline outline-[0.81px] outline-offset-[-0.41px] outline-white" />

          {/* Icons */}
          <div className="flex justify-start items-center gap-4">
            {/* Cart Icon */}
            <CartButton />

            {/* Vertical separator - Mobile only */}
            <div className="fluid-menu-show w-5 h-0 rotate-90 outline outline-[0.81px] outline-offset-[-0.41px] outline-white" />

            {/* Menu hamburger - Mobile only */}
            <motion.button
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="fluid-menu-show w-6 h-6 hover:opacity-75 transition-opacity"
              transition={{ duration: 0.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                console.log("Menu clicked, current state:", isMenuOpen);
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Image
                  alt="Menu"
                  className="object-contain"
                  height={24}
                  src="/icons/majesticons_menu.svg"
                  width={24}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Only visible on smaller screens */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="absolute top-full left-0 right-0 bg-stone-900 border-t border-stone-700 lg:hidden z-40 overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: { duration: 0.2 },
            }}
          >
            <motion.div
              animate={{ y: 0 }}
              className="flex flex-col py-4"
              exit={{ y: -20 }}
              initial={{ y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  initial={{ opacity: 0, x: -20 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <NextLink
                    className="block px-4 py-3 text-white text-sm font-normal font-['Lora'] tracking-[2px] hover:bg-stone-800 hover:text-amber-300 transition-colors"
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </NextLink>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
