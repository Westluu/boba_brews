import type { MouseEventHandler } from "react";
import { Link, NavLink } from "react-router-dom";
import { NAV_ITEMS, type NavItem } from "../config/navigation";
import wizardCat from "../assets/wizard-cat.png";
import orderSign from "../assets/order-sign.png";

type NavbarVariant = "hero" | "board" | "compact" | "persistent";

type NavbarProps = {
  active?: string | null;
  onHomeClick?: MouseEventHandler<HTMLAnchorElement>;
  onOrderClick?: () => void;
  homeHref?: string;
  orderHref?: string;
  items?: NavItem[];
  showOrder?: boolean;
  variant?: NavbarVariant;
};

type NavbarBaseStyle = {
  header: string;
  nav: string;
  logo: string;
  list: string;
  link: string;
  order: string;
};

type NavbarButtonStyle = NavbarBaseStyle & {
  orderKind: "button";
};

type NavbarSignStyle = NavbarBaseStyle & {
  orderImage: string;
  orderKind: "sign";
};

type NavbarStyle = NavbarButtonStyle | NavbarSignStyle;

const NAVBAR_STYLES: Record<NavbarVariant, NavbarStyle> = {
  hero: {
    header: "absolute inset-x-0 top-0 z-20 w-full",
    nav: "mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 pt-4 sm:px-10 sm:pt-6",
    logo: "h-14 w-14 object-contain",
    list: "ml-4 flex min-w-0 flex-1 items-center overflow-x-auto gap-5 sm:ml-6 sm:gap-10 lg:gap-12",
    link: "text-xl sm:text-2xl",
    order: "group relative -mt-4 shrink-0 focus:outline-none",
    orderImage:
      "h-[15rem] w-auto object-contain transition-transform duration-300 group-hover:rotate-1 group-hover:scale-105 group-focus-visible:rotate-1 group-focus-visible:scale-105",
    orderKind: "sign",
  },
  board: {
    header: "absolute inset-x-0 top-0 z-40 w-full",
    nav: "mx-auto flex min-h-24 max-w-[130rem] items-center justify-between gap-3 px-4 pt-5 sm:px-8",
    logo: "h-12 w-12 object-contain sm:h-14 sm:w-14",
    list: "ml-4 flex min-w-0 flex-1 items-center overflow-x-auto gap-5 sm:ml-6 sm:gap-10 lg:gap-12",
    link: "text-xl sm:text-2xl",
    order: "group relative -mt-4 shrink-0 focus:outline-none",
    orderImage:
      "h-24 w-auto object-contain transition-transform duration-300 group-hover:rotate-1 group-hover:scale-105 group-focus-visible:rotate-1 group-focus-visible:scale-105 sm:h-36",
    orderKind: "sign",
  },
  compact: {
    header: "sticky top-0 z-40 border-b border-[#e5bc8a2b] bg-[#07040be8] shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl",
    nav: "mx-auto flex min-h-[5.5rem] max-w-[1280px] items-center justify-between gap-4 px-5 py-4 sm:px-8",
    logo: "h-11 w-11 object-contain",
    list: "ml-4 flex min-w-0 flex-1 items-center overflow-x-auto gap-5 sm:ml-6 sm:gap-8",
    link: "text-lg sm:text-xl",
    order: "group relative shrink-0 focus:outline-none",
    orderKind: "button",
  },
  persistent: {
    header: "fixed inset-x-0 top-0 z-20 w-full",
    nav: "mx-auto flex h-24 max-w-[1400px] items-center justify-between gap-4 px-6 pt-4 sm:px-10",
    logo: "h-20 w-20 object-contain",
    list: "ml-4 flex min-w-0 flex-1 items-center overflow-x-auto gap-8 sm:ml-8 sm:gap-14 lg:gap-20",
    link: "text-2xl sm:text-4xl",
    order: "group relative -mt-4 shrink-0 focus:outline-none",
    orderImage:
      "h-[15rem] w-auto object-contain transition-transform duration-300 group-hover:rotate-1 group-hover:scale-105 group-focus-visible:rotate-1 group-focus-visible:scale-105",
    orderKind: "sign",
  },
};

export function Navbar({
  active = "Menu",
  onHomeClick,
  onOrderClick,
  homeHref = "#home",
  orderHref = "#order",
  items = NAV_ITEMS,
  showOrder = true,
  variant = "hero",
}: NavbarProps) {
  const styles = NAVBAR_STYLES[variant];
  const isRouteHref = (href: string) => href.startsWith("/");
  const orderContent =
    styles.orderKind === "button" ? (
      <span className="inline-flex items-center rounded-full border border-[#e5bc8a66] bg-[#160b1ddd] px-5 py-2 font-display text-xl text-cream shadow-[0_0_24px_rgba(110,63,176,0.22)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 group-focus-visible:-translate-y-0.5 group-focus-visible:scale-105">
        Order
      </span>
    ) : (
      <img src={orderSign} alt="Order" className={styles.orderImage} />
    );

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link
          to={homeHref}
          onClick={onHomeClick}
          aria-label="Boba Brews home"
          className="flex shrink-0 items-center"
        >
          <img
            src={wizardCat}
            alt="Boba Brews wizard cat logo"
            className={styles.logo}
          />
        </Link>

        <ul className={styles.list}>
          {items.map((item) => {
            return (
              <li key={item.label}>
                <NavLink
                  to={item.href}
                  end
                  className={({ isActive }) =>
                    [
                      "relative inline-block py-1 text-cream",
                      styles.link,
                      "transition-colors hover:text-magic-light",
                      "focus:outline-none focus-visible:text-magic-light",
                      isActive || item.label === active
                        ? "after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[4px] after:rounded-full after:bg-[#f5e6c5] after:shadow-[0_0_12px_rgba(245,230,197,0.72)]"
                        : "",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {showOrder &&
          (isRouteHref(orderHref) ? (
            <Link
              to={orderHref}
              onClick={onOrderClick}
              aria-label="Order"
              className={styles.order}
            >
              {orderContent}
            </Link>
          ) : (
            <a
              href={orderHref}
              onClick={onOrderClick}
              aria-label="Order"
              className={styles.order}
            >
              {orderContent}
            </a>
          ))}
      </nav>
    </header>
  );
}

export default Navbar;
