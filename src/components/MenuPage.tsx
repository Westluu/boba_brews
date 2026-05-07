import { useEffect, useState, type CSSProperties } from "react";
import menuBackground from "../assets/menu/background.png";
import brewingBoba from "../assets/menu/boba-brewing.png";
import type { MenuSectionId } from "../config/navigation";
import {
  MENU_GROUPS,
  MENU_NOTES,
  type MenuItem,
  type MenuNoteIcon,
} from "../data/menu";
import MenuCategoryCard from "./menu/MenuCategoryCard";
import MenuItemModal from "./menu/MenuItemModal";

const NOTE_ICONS: Record<MenuNoteIcon, string> = {
  leaf: "⌁",
  moon: "☾",
  sparkles: "✦",
};

type MenuPageProps = {
  sectionId: MenuSectionId;
};

function MenuPage({ sectionId }: MenuPageProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(sectionId);

      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [sectionId]);

  return (
    <div className="relative min-h-screen bg-black text-cream">
      <div
        className="menu-page-bg relative min-h-screen overflow-hidden px-3 pb-6 pt-24 sm:px-7 sm:pb-8 sm:pt-28"
        style={{
          "--menu-background-image": `linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0.1)), url(${menuBackground})`,
        } as CSSProperties}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.18)_32%,rgba(0,0,0,0.08)_64%,rgba(0,0,0,0.55)_100%)]" />

        <section
          id="menu"
          className="relative mx-auto flex min-h-[10rem] max-w-[130rem] items-start justify-between gap-8 scroll-mt-24 sm:min-h-[15rem] sm:scroll-mt-28 lg:min-h-[17rem]"
        >
          <div className="relative z-10 pt-5 sm:pt-14">
            <div className="mb-2 flex items-center gap-3 sm:gap-5">
              <h1 className="font-display text-6xl leading-none text-[#ffd8a0] [text-shadow:0_0_16px_rgba(255,216,160,0.18),0_10px_34px_rgba(0,0,0,0.6)] sm:text-8xl">
                Menu
              </h1>
              <span className="font-display text-5xl text-[#ffd8a0] sm:text-7xl">
                ☾
              </span>
            </div>
            <p className="max-w-[22rem] font-display text-xl leading-tight text-[#d986e8] sm:max-w-[32rem] sm:text-3xl">
              Curious drinks brewed with a little magic
            </p>
          </div>

          <img
            src={brewingBoba}
            alt="Boba the cat brewing a magical drink"
            className="pointer-events-none absolute right-[19rem] top-[-8.5rem] z-0 hidden w-[56rem] max-w-[58vw] object-contain drop-shadow-[0_26px_48px_rgba(0,0,0,0.58)] lg:block 2xl:right-[24rem]"
          />
        </section>

        <section className="relative mx-auto max-w-[130rem]">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {MENU_GROUPS.map((group) => (
              <MenuCategoryCard
                key={group.title}
                group={group}
                onSelectItem={setSelectedItem}
              />
            ))}
          </div>
        </section>

        <section className="relative mx-auto mt-4 grid max-w-[130rem] gap-3 sm:mt-6 sm:gap-5 lg:grid-cols-3 xl:grid-cols-[1.1fr_1fr_1fr]">
          {MENU_NOTES.map((note) => (
            <article
              key={note.text}
              className="flex min-h-16 items-center justify-center gap-3 rounded-[1rem] border border-[#9d6d67] bg-[#07091ee8] px-4 py-3 shadow-[0_18px_42px_rgba(0,0,0,0.38)] sm:min-h-20 sm:gap-5 sm:px-8 sm:py-4"
            >
              <span className="font-display text-4xl text-[#ffd67e] sm:text-5xl">
                {NOTE_ICONS[note.icon]}
              </span>
              <p className="font-display text-xl leading-6 text-[#e3a1e7] sm:text-2xl sm:leading-8">
                {note.text}
              </p>
            </article>
          ))}
        </section>

        <section
          id="about"
          className="relative mx-auto grid max-w-[130rem] gap-4 py-6 scroll-mt-24 sm:gap-5 sm:py-8 sm:scroll-mt-28 lg:grid-cols-3"
        >
          <article className="rounded-[1rem] border border-[#9d6d67] bg-[#07091ee8] p-4 sm:p-5">
            <p className="font-display text-2xl text-[#f8dfb2] sm:text-3xl">About Boba</p>
            <p className="mt-2 text-base leading-6 text-[#dfd5d0] sm:mt-3 sm:text-lg sm:leading-7">
              Boba is the shop familiar, head taste-tester, and guardian of the
              late-night tea stash. Every drink name is a little story, but the
              ingredients stay clear so the magic never gets in the way of
              ordering.
            </p>
          </article>

          <article
            id="magic"
            className="scroll-mt-24 rounded-[1rem] border border-[#9d6d67] bg-[#07091ee8] p-4 sm:scroll-mt-28 sm:p-5"
          >
            <p className="font-display text-2xl text-[#f8dfb2] sm:text-3xl">How the Magic Works</p>
            <p className="mt-2 text-base leading-6 text-[#dfd5d0] sm:mt-3 sm:text-lg sm:leading-7">
              We steep teas in small batches, shake each order fresh, and keep
              the menu readable: clear base, clear topping, clear price. The fun
              is in the atmosphere, not in making the customer solve a riddle.
            </p>
          </article>

          <article
            id="contact"
            className="scroll-mt-24 rounded-[1rem] border border-[#9d6d67] bg-[#07091ee8] p-4 sm:scroll-mt-28 sm:p-5"
          >
            <p className="font-display text-2xl text-[#f8dfb2] sm:text-3xl">Visit the Shop</p>
            <p className="mt-2 text-base leading-6 text-[#dfd5d0] sm:mt-3 sm:text-lg sm:leading-7">
              Daily, 11am to 9pm. Milk, sesame, and fruit syrups are prepared in
              a shared space.
            </p>
          </article>
        </section>
      </div>

      {selectedItem && (
        <MenuItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}

export default MenuPage;
