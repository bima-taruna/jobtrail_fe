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
import { SidebarTrigger, useSidebar } from "@/app/ui/components/sidebar";
import { Button } from "../components/button";

export function Navbar(props: { isSession: boolean }) {
  const sidebarState = props.isSession
    ? useSidebar()
    : { state: null, isMobile: false };
  const { state, isMobile } = sidebarState;
  return (
    <header
      className={`fixed top-0 z-50 w-screen border-b bg-white dark:bg-neutral-950 ${
        state === "expanded" && !isMobile
          ? "pr-70"
          : state === "collapsed" && !isMobile
          ? "pr-15"
          : ""
      }`}
    >
      <NavigationMenu className={`max-w-full pr-70 p-3 justify-between`}>
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
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/login">Login</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
