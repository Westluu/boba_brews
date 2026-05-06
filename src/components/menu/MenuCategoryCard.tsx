import type { MenuCharm, MenuGroup, MenuGroupIcon } from "../../data/menu";
import MenuItemArt from "./MenuItemArt";

type MenuCategoryCardProps = {
  group: MenuGroup;
};

const CATEGORY_ICONS: Record<MenuGroupIcon, string> = {
  cup: "🧋",
  potion: "⚗",
  sparkles: "✣",
  treat: "☆",
};

const ITEM_CHARMS: Record<MenuCharm, string> = {
  berries: "●●",
  lavender: "✣",
  leaf: "⌁",
  lychee: "●",
  mango: "◆",
  moon: "☾",
  peach: "●",
  star: "★",
};

function MenuCategoryCard({ group }: MenuCategoryCardProps) {
  return (
    <article className="relative min-h-[31rem] rounded-[1.1rem] border border-[#b9876d] bg-[#07091eed] px-5 pb-5 pt-4 shadow-[0_24px_60px_rgba(0,0,0,0.48),inset_0_0_24px_rgba(113,74,150,0.14)]">
      <span className="absolute -right-1 top-4 font-display text-xl text-[#f8dfb2]">
        +
      </span>
      <span className="absolute -bottom-3 left-1/2 font-display text-2xl text-[#f8dfb2]">
        +
      </span>

      <div className="flex items-center justify-center gap-3">
        <span className="font-display text-3xl text-[#f8dfb2]">
          {CATEGORY_ICONS[group.icon]}
        </span>
        <h2 className="font-display text-4xl leading-none text-[#f8dfb2] [text-shadow:0_0_14px_rgba(248,223,178,0.18)]">
          {group.title}
        </h2>
      </div>
      <div className="mx-auto mt-3 h-[3px] w-20 rounded-full bg-[#d77cdd]" />

      <div className="mt-5 grid gap-3">
        {group.items.map((item) => (
          <div
            key={item.name}
            className="grid grid-cols-[4.4rem_1fr_auto] items-center gap-3 sm:grid-cols-[5rem_1fr_auto]"
          >
            <MenuItemArt item={item} />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-2xl leading-none text-[#f8dfb2] sm:text-3xl">
                  {item.name}
                </h3>
                {item.charm && (
                  <span className="font-display text-xl text-[#f7c56d]">
                    {ITEM_CHARMS[item.charm]}
                  </span>
                )}
              </div>
              <p className="mt-1 max-w-[13rem] text-base leading-6 text-[#dfd5d0] sm:text-[1.05rem]">
                {item.description}
              </p>
            </div>
            <span className="pl-2 font-display text-2xl text-[#f8dfb2]">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default MenuCategoryCard;
