import SideBarNav from "@/components/sidebar-nav";
import { navConfig } from "@/config/nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "@/components/theme-toggle";
import { Icon } from "@iconify-icon/react";
import github from "@iconify/icons-mdi/github";

import 'iconify-icon';
import { Icons } from "@/components/icons";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="grid grid-cols-[200px_1px_auto]">
      <aside className="h-screen w-[200px] bg-background/80 pt-8 flex flex-col justify-between sticky top-0 self-start">
        <div className="px-2">
          <SideBarNav items={navConfig.navItems} />
          <div className="flex items-center justify-between mt-6 px-2  text-black/80">
            <span className="text-sm font-semibold dark:text-white">Tags</span>
            <Button variant="secondary" className="p-0 h-2 bg-transparent hover:bg-transparent">
              <Plus size={16} />
            </Button>
          </div>
        </div>
        <div>
          <Separator />
          <div className="flex items-center justify-between w-full px-2 my-1">
            <Link href="/about" className="text-xs font-semibold">
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
              <Icons.gitHub className="h-6 w-6" />
                <span className="sr-only">Github</span>
              </div>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </aside>
      <Separator orientation="vertical" />
      <main className="w-full flex flex-col gap-4 relative min-h-screen bg-background">
        {children}
      </main>
    </div>
  );
}
