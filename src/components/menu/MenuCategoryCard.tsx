import type { MenuGroup, MenuItem } from "../../data/menu";
import MenuItemArt from "./MenuItemArt";
import { CATEGORY_ICONS, ITEM_CHARMS } from "./menuSymbols";

type MenuCategoryCardProps = {
  group: MenuGroup;
  onSelectItem: (item: MenuItem) => void;
};

function MenuCategoryCard({ group, onSelectItem }: MenuCategoryCardProps) {
  return (
    <article className="relative rounded-[1.1rem] border border-[#b9876d] bg-[#07091eed] px-3 pb-4 pt-4 shadow-[0_24px_60px_rgba(0,0,0,0.48),inset_0_0_24px_rgba(113,74,150,0.14)] sm:min-h-[31rem] sm:px-5 sm:pb-5">
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
        <h2 className="font-display text-3xl leading-none text-[#f8dfb2] [text-shadow:0_0_14px_rgba(248,223,178,0.18)] sm:text-4xl">
          {group.title}
        </h2>
      </div>
      <div className="mx-auto mt-3 h-[3px] w-20 rounded-full bg-[#d77cdd]" />

      <div className="mt-5 grid gap-2">
        {group.items.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => onSelectItem(item)}
            aria-label={`View details for ${item.name}`}
            className="grid grid-cols-[4rem_minmax(0,1fr)_auto] items-center gap-2 rounded-[0.9rem] px-1 py-2 text-left transition hover:bg-[#f8dfb2]/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d77cdd]/60 sm:grid-cols-[5.8rem_1fr_auto] sm:gap-3 sm:px-2 sm:py-1"
          >
            <MenuItemArt item={item} />
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <h3 className="font-display text-2xl leading-none text-[#f8dfb2] sm:text-3xl">
                  {item.name}
                </h3>
                {item.charm && (
                  <span className="font-display text-xl text-[#f7c56d]">
                    {ITEM_CHARMS[item.charm]}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm leading-5 text-[#dfd5d0] sm:max-w-[13rem] sm:text-[1.05rem] sm:leading-6">
                {item.description}
              </p>
            </div>
            <span className="pl-1 font-display text-xl text-[#f8dfb2] sm:pl-2 sm:text-2xl">
              {item.price}
            </span>
          </button>
        ))}
      </div>
    </article>
  );
}

export default MenuCategoryCard;
