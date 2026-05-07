export type NavItem = {
  label: string;
  href: string;
};

export const ROUTES = {
  home: "/",
  menu: "/menu",
  about: "/about",
  magic: "/magic",
  contact: "/contact",
  order: "/order",
} as const;

export type MenuSectionId = "menu" | "about" | "magic" | "contact";

export type MenuRoute = {
  label: string;
  path: string;
  sectionId: MenuSectionId;
};

export const MENU_ROUTES: MenuRoute[] = [
  { label: "Menu", path: ROUTES.menu, sectionId: "menu" },
  { label: "About", path: ROUTES.about, sectionId: "about" },
  { label: "Magic", path: ROUTES.magic, sectionId: "magic" },
  { label: "Contact", path: ROUTES.contact, sectionId: "contact" },
];

export const NAV_ITEMS: NavItem[] = MENU_ROUTES.filter(
  ({ sectionId }) => sectionId !== "magic",
).map(({ label, path }) => ({ label, href: path }));
