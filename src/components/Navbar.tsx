import { useState, type MouseEventHandler, type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { NAV_ITEMS, ROUTES, type NavItem } from "../config/navigation";
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

type LinkContentProps = {
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const isRouteHref = (href: string) => href.startsWith("/");

function LinkContent({
  ariaLabel,
  children,
  className,
  href,
  onClick,
}: LinkContentProps) {
  if (isRouteHref(href)) {
    return (
      <Link
        to={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={className}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  );
}

const NAVBAR_STYLES: Record<NavbarVariant, NavbarStyle> = {
  hero: {
    header: "absolute inset-x-0 top-0 z-20 w-full",
    nav: "mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 pt-4 sm:px-10 sm:pt-6",
    logo: "h-14 w-14 object-contain",
    list: "scrollbar-hidden ml-4 flex min-w-0 flex-1 items-center overflow-x-auto gap-5 sm:ml-6 sm:gap-10 lg:gap-12",
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
    list: "scrollbar-hidden ml-4 flex min-w-0 flex-1 items-center overflow-x-auto gap-5 sm:ml-6 sm:gap-10 lg:gap-12",
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
    list: "scrollbar-hidden ml-4 flex min-w-0 flex-1 items-center overflow-x-auto gap-5 sm:ml-6 sm:gap-8",
    link: "text-lg sm:text-xl",
    order: "group relative shrink-0 focus:outline-none",
    orderKind: "button",
  },
  persistent: {
    header: "fixed inset-x-0 top-0 z-20 w-full",
    nav: "relative mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-2 px-5 pt-3 sm:h-24 sm:gap-4 sm:px-10 sm:pt-4",
    logo: "h-12 w-12 object-contain sm:h-20 sm:w-20",
    list: "scrollbar-hidden ml-2 hidden min-w-0 flex-1 items-center gap-4 overflow-x-auto sm:ml-8 sm:flex sm:gap-14 lg:gap-20",
    link: "text-xl sm:text-4xl",
    order: "group absolute right-5 top-[4.85rem] z-10 shrink-0 focus:outline-none sm:relative sm:right-auto sm:top-auto sm:-mt-4",
    orderImage:
      "h-[15rem] w-auto object-contain transition-transform duration-300 group-hover:rotate-1 group-hover:scale-105 group-focus-visible:rotate-1 group-focus-visible:scale-105",
    orderKind: "sign",
  },
};

export function Navbar({
  active = null,
  onHomeClick,
  onOrderClick,
  homeHref = ROUTES.home,
  orderHref = ROUTES.menu,
  items = NAV_ITEMS,
  showOrder = true,
  variant = "hero",
}: NavbarProps) {
  const styles = NAVBAR_STYLES[variant];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        <LinkContent
          href={homeHref}
          onClick={onHomeClick}
          ariaLabel="Boba Brews home"
          className="flex shrink-0 items-center gap-3"
        >
          <img
            src={wizardCat}
            alt="Boba Brews wizard cat logo"
            className={styles.logo}
          />
          {variant === "persistent" && (
            <span className="font-display text-[clamp(1.75rem,8vw,2.45rem)] leading-none text-cream [text-shadow:0_4px_18px_rgba(0,0,0,0.5)] sm:hidden">
              Boba&apos;s Brews
            </span>
          )}
        </LinkContent>

        <ul className={styles.list}>
          {items.map((item) => {
            return (
              <li key={item.label}>
                {isRouteHref(item.href) ? (
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
                          ? "after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[5px] after:rounded-full after:bg-[#c084fc] after:shadow-[0_0_6px_rgba(192,132,252,0.55)]"
                          : "",
                      ].join(" ")
                    }
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <a
                    href={item.href}
                    aria-current={item.label === active ? "page" : undefined}
                    className={[
                      "relative inline-block py-1 text-cream",
                      styles.link,
                      "transition-colors hover:text-magic-light",
                      "focus:outline-none focus-visible:text-magic-light",
                      item.label === active
                        ? "after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[5px] after:rounded-full after:bg-[#c084fc] after:shadow-[0_0_6px_rgba(192,132,252,0.55)]"
                        : "",
                    ].join(" ")}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {variant === "persistent" && (
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            className="flex h-12 w-12 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full text-[#b985ef] transition hover:text-magic-light focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d77cdd]/70 sm:hidden"
          >
            <span className="h-1 w-8 rounded-full bg-current shadow-[0_0_10px_rgba(185,133,239,0.36)]" />
            <span className="h-1 w-8 rounded-full bg-current shadow-[0_0_10px_rgba(185,133,239,0.36)]" />
            <span className="h-1 w-8 rounded-full bg-current shadow-[0_0_10px_rgba(185,133,239,0.36)]" />
          </button>
        )}

        {showOrder && (
          <LinkContent
            href={orderHref}
            onClick={onOrderClick}
            ariaLabel="Order"
            className={[
              styles.order,
              styles.orderKind === "sign" ? "hidden sm:block" : "",
            ].join(" ")}
          >
            {orderContent}
          </LinkContent>
        )}

        {variant === "persistent" && isMobileMenuOpen && (
          <div className="absolute right-5 top-20 z-30 w-48 rounded-[1rem] border border-[#e5bc8a66] bg-[#07091ef2] p-3 shadow-[0_20px_46px_rgba(0,0,0,0.48)] backdrop-blur-md sm:hidden">
            <div className="grid gap-1">
              {items.map((item) =>
                isRouteHref(item.href) ? (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    end
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      [
                        "rounded-[0.7rem] px-4 py-2 font-display text-2xl text-cream transition hover:bg-[#f8dfb2]/10 hover:text-magic-light focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d77cdd]/70",
                        isActive || item.label === active
                          ? "bg-[#f8dfb2]/10 text-magic-light"
                          : "",
                      ].join(" ")
                    }
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-[0.7rem] px-4 py-2 font-display text-2xl text-cream transition hover:bg-[#f8dfb2]/10 hover:text-magic-light focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d77cdd]/70"
                  >
                    {item.label}
                  </a>
                ),
              )}
              {showOrder && (
                <LinkContent
                  href={orderHref}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOrderClick?.();
                  }}
                  className="rounded-[0.7rem] px-4 py-2 font-display text-2xl text-cream transition hover:bg-[#f8dfb2]/10 hover:text-magic-light focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d77cdd]/70"
                >
                  Order
                </LinkContent>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
