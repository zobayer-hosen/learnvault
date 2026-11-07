import { Bookmark, Compass, Info, LayoutDashboard, LayoutGrid, Route, type LucideIcon } from "lucide-react";

export interface NavItem {
  href: "/" | "/explore" | "/categories" | "/learning-paths" | "/bookmarks" | "/about";
  label: string;
  icon: LucideIcon;
}

export const primaryNav: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/categories", label: "Categories", icon: LayoutGrid },
  { href: "/learning-paths", label: "Learning Paths", icon: Route },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
];

export const secondaryNav: NavItem[] = [{ href: "/about", label: "About", icon: Info }];
