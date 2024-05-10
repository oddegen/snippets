"use client";

import SideBarNav from "@/components/sidebar-nav";
import { navConfig } from "@/config/nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Plus, Sun } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid grid-cols-[200px_1px_auto]">
      <aside className="h-screen w-[200px] bg-background/80 pt-4 flex flex-col justify-between sticky top-0 self-start">
        <div className="px-2">
          <SideBarNav items={navConfig.navItems} />
          <div className="flex items-center justify-between mt-6 px-2  text-black/80">
            <span className="text-sm font-semibold">Tags</span>
            <Button variant="ghost" className="p-0 h-2">
              <Plus size={16} />
            </Button>
          </div>
        </div>
        <div>
          <Separator />
          <div className="flex items-center justify-between w-full px-2 my-1">
            <Link href="/about" className="text-xs font-semibold">
              About
            </Link>
            {theme === "light" ? (
              <Button
                variant="outline"
                size="icon"
                className="border-none"
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-6 w-6" />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="icon"
                className="border-none"
                onClick={() => setTheme("light")}
              >
                <Sun className="h-6 w-6" />
              </Button>
            )}
          </div>
        </div>
      </aside>
      <Separator orientation="vertical" />
      <main className="w-full flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        {children}
      </main>
    </div>
  );
}
