import { useEffect, useState } from "react";
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
        className="relative min-h-screen overflow-hidden px-4 pb-8 pt-28 sm:px-7"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0.1)), url(${menuBackground})`,
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.18)_32%,rgba(0,0,0,0.08)_64%,rgba(0,0,0,0.55)_100%)]" />

        <section
          id="menu"
          className="relative mx-auto flex min-h-[15rem] max-w-[130rem] items-start justify-between gap-8 scroll-mt-28 lg:min-h-[17rem]"
        >
          <div className="relative z-10 pt-12 sm:pt-14">
            <div className="mb-2 flex items-center gap-5">
              <h1 className="font-display text-7xl leading-none text-[#ffd8a0] [text-shadow:0_0_16px_rgba(255,216,160,0.18),0_10px_34px_rgba(0,0,0,0.6)] sm:text-8xl">
                Menu
              </h1>
              <span className="font-display text-6xl text-[#ffd8a0] sm:text-7xl">
                ☾
              </span>
            </div>
            <p className="max-w-[32rem] font-display text-2xl leading-tight text-[#d986e8] sm:text-3xl">
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
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {MENU_GROUPS.map((group) => (
              <MenuCategoryCard
                key={group.title}
                group={group}
                onSelectItem={setSelectedItem}
              />
            ))}
          </div>
        </section>

        <section className="relative mx-auto mt-6 grid max-w-[130rem] gap-5 lg:grid-cols-3 xl:grid-cols-[1.1fr_1fr_1fr]">
          {MENU_NOTES.map((note) => (
            <article
              key={note.text}
              className="flex min-h-20 items-center justify-center gap-5 rounded-[1rem] border border-[#9d6d67] bg-[#07091ee8] px-8 py-4 shadow-[0_18px_42px_rgba(0,0,0,0.38)]"
            >
              <span className="font-display text-5xl text-[#ffd67e]">
                {NOTE_ICONS[note.icon]}
              </span>
              <p className="font-display text-2xl leading-8 text-[#e3a1e7]">
                {note.text}
              </p>
            </article>
          ))}
        </section>

        <section
          id="about"
          className="relative mx-auto grid max-w-[130rem] gap-5 py-8 scroll-mt-28 lg:grid-cols-3"
        >
          <article className="rounded-[1rem] border border-[#9d6d67] bg-[#07091ee8] p-5">
            <p className="font-display text-3xl text-[#f8dfb2]">About Boba</p>
            <p className="mt-3 text-lg leading-7 text-[#dfd5d0]">
              Boba is the shop familiar, head taste-tester, and guardian of the
              late-night tea stash. Every drink name is a little story, but the
              ingredients stay clear so the magic never gets in the way of
              ordering.
            </p>
          </article>

          <article
            id="magic"
            className="scroll-mt-28 rounded-[1rem] border border-[#9d6d67] bg-[#07091ee8] p-5"
          >
            <p className="font-display text-3xl text-[#f8dfb2]">How the Magic Works</p>
            <p className="mt-3 text-lg leading-7 text-[#dfd5d0]">
              We steep teas in small batches, shake each order fresh, and keep
              the menu readable: clear base, clear topping, clear price. The fun
              is in the atmosphere, not in making the customer solve a riddle.
            </p>
          </article>

          <article
            id="contact"
            className="scroll-mt-28 rounded-[1rem] border border-[#9d6d67] bg-[#07091ee8] p-5"
          >
            <p className="font-display text-3xl text-[#f8dfb2]">Visit the Shop</p>
            <p className="mt-3 text-lg leading-7 text-[#dfd5d0]">
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
