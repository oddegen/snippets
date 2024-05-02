import { Icons } from "@/components/icons";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    telegram: string;
  };
};

export type SidebarNavItem = {
  title: string;
  href?: string;
  icon?: keyof typeof Icons;
  color?: string;
  children?: SidebarNavItem[];
};

export type NavConfig = {
  navItems: SidebarNavItem[];
};
