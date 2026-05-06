"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import FreshCartLogo from "../../assets/images/FreshCartLogo.png"
import { FaRegHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa6";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoSearch } from "react-icons/io5";
import localFont from "next/font/local";
import { useContext } from "react";
import { cartContext } from "../_context/CartContextProvider"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

const exo = localFont({
  src: "../../assets/fonts/Exo.ttf",
});

export default function Navbar() {
  const { numberOfCartItems } = useContext(cartContext) as { numberOfCartItems: number }
  return (
    <div className="w-full border-b-2 bg-white sticky top-0 z-40">
      <NavigationMenu className={`max-w-none h-18.5 flex items-center justify-between px-16 text-[#364153] ${exo.className}`}>
        <div className="shrink-0">
          <img src={FreshCartLogo.src} alt="FreshCart Logo" />
        </div>
        <div className="w-full h-fit px-4 relative">
          <input type="text" placeholder="Search for products, brands, and more..." className="border rounded-full w-full h-fit py-3 pr-12 pl-5 bg-[#F9FAFB80] border-[#E5E7EB]" />
          <button className="absolute right-6 top-1.5 w-9 h-9 rounded-full flex justify-center items-center text-white cursor-pointer bg-[#16A34A] hover:bg-[#15803d]">
            <IoSearch />
          </button>
        </div>
        <NavigationMenuList className="flex items-center h-full">

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/" className="text-[16px] font-medium hover:bg-transparent hover:text-[#16A34A] focus:bg-transparent">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/products" className="text-[16px] font-medium hover:bg-transparent hover:text-[#16A34A] focus:bg-transparent">Shop</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-[16px] font-medium hover:bg-transparent hover:text-[#16A34A] focus:bg-transparent">Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-96">
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built with Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/brands" className="text-[16px] font-medium hover:bg-transparent hover:text-[#16A34A] focus:bg-transparent">Brands</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="flex px-4 items-center">
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link className="py-2.5 px-2.5 bg-[#F0FDF4] !rounded-full" href="/"><TfiHeadphoneAlt className="text-[#16A34A]" /></Link>
            </NavigationMenuLink>
            <div className="text-xs px-2">
              <div className="text-gray-400">Support</div>
              <div className="font-semibold">24/7</div>
            </div>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link className="py-2.5 px-2.5 !rounded-full group/item focus:bg-transparent" href="/"><FaRegHeart className="text-[#6A7282] group-hover/item:text-[#16a34a]" /></Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link className="py-2.5 px-2.5 !rounded-full group/item focus:bg-transparent relative" href="/cart">
                <span className="absolute bg-[#16A34A] w-[16px] h-[16px] rounded-full text-white shadow shadow-white font-bold text-[10px] top-0 right-0 items-center justify-center flex">{numberOfCartItems}</span>
                <FaShoppingCart className="text-[#6A7282] group-hover/item:text-[#16a34a]" /></Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link className="py-2.5 px-2.5 !rounded-full group/item focus:bg-transparent" href="/login"><FaRegAddressCard className="text-[#6A7282] group-hover/item:text-[#16a34a]" /></Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
