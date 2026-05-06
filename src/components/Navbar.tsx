import wizardCat from "../assets/wizard-cat.png";
import orderSign from "../assets/order-sign.png";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Magic", href: "#magic" },
  { label: "Contact", href: "#contact" },
];

type NavbarProps = {
  active?: string;
  onOrderClick?: () => void;
};

export function Navbar({ active = "Menu", onOrderClick }: NavbarProps) {
  return (
    <header className="absolute inset-x-0 top-0 z-20 w-full">
      <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 pt-4 sm:px-10 sm:pt-6">
        <a
          href="#home"
          aria-label="Boba Brews home"
          className="flex shrink-0 items-center"
        >
          <img
            src={wizardCat}
            alt="Boba Brews wizard cat logo"
            className="h-14 w-14 object-contain"
          />
        </a>

        <ul className="ml-6 flex flex-1 items-center gap-8 sm:gap-12">
          {NAV_ITEMS.map((item) => {
            const isActive = item.label === active;
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "relative inline-block py-1 text-2xl text-cream",
                    "transition-colors hover:text-magic-light",
                    "focus:outline-none focus-visible:text-magic-light",
                    isActive
                      ? "after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[3px] after:rounded-full after:bg-magic"
                      : "",
                  ].join(" ")}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#order"
          onClick={onOrderClick}
          aria-label="Order"
          className="group relative -mt-4 shrink-0 focus:outline-none"
        >
          <img
            src={orderSign}
            alt="Order"
            className="h-[15rem] w-auto object-contain transition-transform duration-300 group-hover:rotate-1 group-hover:scale-105 group-focus-visible:rotate-1 group-focus-visible:scale-105"
          />
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
