"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
  NavigationMenuLink,
} from "@/app/ui/components/navigation-menu";
import Link from "next/link";
import { poppins } from "@/app/ui/fonts";
import { ThemeButton } from "./theme-button";

export function Navbar() {
  return (
    <NavigationMenu className="fixed bg-white dark:bg-neutral-950 z-50 top-0 w-full max-w-none p-3 justify-between">
      <NavigationMenuItem className={`list-none`}>
        <NavigationMenuLink
          asChild
          className={`${navigationMenuTriggerStyle()} ${
            poppins.className
          } font-bold text-2xl list-none`}
        >
          <Link href="/">JobTrail</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      {/* Right side */}
      <NavigationMenuList className="w-full">
        <NavigationMenuItem>
          <ThemeButton />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/login">Login</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
