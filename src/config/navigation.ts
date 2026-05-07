export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Magic", href: "/magic" },
  { label: "Contact", href: "/contact" },
];

export const MENU_SECTION_IDS = new Set([
  "menu",
  "about",
  "magic",
  "contact",
  "order",
]);

export function isMenuSectionHash(hash: string) {
  return MENU_SECTION_IDS.has(hash.replace(/^#/, ""));
}
