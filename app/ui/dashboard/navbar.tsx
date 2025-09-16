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
import { SidebarTrigger } from "@/app/ui/components/sidebar";

export function Navbar(props: { isSession: boolean }) {
  return (
    <NavigationMenu className="fixed bg-white dark:bg-neutral-950 z-50 w-full max-w-none p-3 justify-between">
      <div className="flex items-center gap-3">
        {props.isSession ? <SidebarTrigger /> : ""}
        <NavigationMenuItem className="list-none">
          <NavigationMenuLink
            asChild
            className={`${navigationMenuTriggerStyle()} font-bold text-2xl`}
          >
            <Link href="/">JobTrail</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </div>

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
