import { SidebarNavItem } from "@/types";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Icons } from "@/components/icons";

type SideBarNavProps = {
  items: SidebarNavItem[];
};

export default function SideBarNav({ items }: SideBarNavProps) {
  return (
    <div className="w-full flex flex-col">
      <header className="mb-8">
        <span className="font-semibold text-xl">{siteConfig.name}</span>
      </header>
      <div>
        <nav className="flex flex-col gap-1">
          {items.length
            ? items.map((item, idx) => {
                const Icon = Icons[item.icon || "cicle"];
                return (
                  <Link
                    key={idx}
                    href={item.href || "#"}
                    className="flex px-2 py-1 gap-2 items-center hover:bg-muted rounded-lg text-lg font-medium transition-colors"
                  >
                    <Icon className={"h-4 w-4"} />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                );
              })
            : null}
        </nav>
      </div>
    </div>
  );
}
