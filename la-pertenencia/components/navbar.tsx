import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
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
    <HeroUINavbar
      className="bg-negro-puro border-b border-gris-90"
      classNames={{
        base: "bg-negro-puro",
        wrapper: "px-6 sm:px-8 lg:px-12",
        content: "bg-negro-puro",
        brand: "text-blanco-puro",
        item: "text-blanco-puro",
        toggle: "text-blanco-puro",
      }}
      isMenuOpen={isMenuOpen}
      maxWidth="full"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Mobile menu toggle */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-blanco-puro"
        />
      </NavbarContent>

      {/* Logo */}
      <NavbarContent className="sm:flex" justify="start">
        <NavbarBrand>
          <NextLink className="flex items-center" href="/">
            <span className="text-h2 text-blanco-puro font-lora">
              LA PERTENENCIA
            </span>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Menu + Cart - Alineados a la derecha */}
      <NavbarContent className="hidden sm:flex" justify="end">
        {/* Menu Items con espaciado de 20px */}
        <div className="flex items-center gap-5">
          {menuItems.map((item) => (
            <NextLink
              key={item.name}
              className="text-menu text-blanco-puro hover:text-dorado-light transition-colors duration-200 flex items-center justify-center relative py-2 group"
              href={item.href}
            >
              {item.name}
              {/* Línea dorada en hover */}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-dorado-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </NextLink>
          ))}
        </div>

        {/* Línea vertical separadora - 20px de cada lado */}
        <div className="w-px h-6 bg-blanco-puro self-center mx-5" />

        {/* Cart */}
        <NavbarItem>
          <CartButton />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-negro-puro pt-6">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <NextLink
              className="w-full text-menu text-blanco-puro hover:text-dorado-light transition-colors duration-200 py-2 flex items-center justify-center relative group"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
              {/* Línea dorada en hover para móvil */}
              <span className="absolute bottom-0 left-1/2 w-1/2 h-0.5 bg-dorado-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center -translate-x-1/2" />
            </NextLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroUINavbar>
  );
};
