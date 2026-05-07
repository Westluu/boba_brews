import type { MenuGroup } from "../../data/menu";
import { CATEGORY_ICONS } from "../menu/menuSymbols";

type OrderCategoryTabsProps = {
  groups: MenuGroup[];
  activeGroupTitle: string;
  onSelectGroup: (group: MenuGroup) => void;
};

function OrderCategoryTabs({
  groups,
  activeGroupTitle,
  onSelectGroup,
}: OrderCategoryTabsProps) {
  return (
    <section className="relative">
      <div className="scrollbar-hidden flex gap-2 overflow-x-auto border-b border-[#9d6d67]/70 pb-0 sm:gap-3">
        {groups.map((group) => {
          const isActive = group.title === activeGroupTitle;

          return (
            <button
              key={group.title}
              type="button"
              onClick={() => onSelectGroup(group)}
              className={[
                "flex min-h-12 shrink-0 items-center justify-center rounded-t-[0.85rem] border px-4 font-display text-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/70 sm:min-h-14 sm:min-w-[11rem] sm:px-5 sm:text-2xl",
                isActive
                  ? "border-[#d28dce] bg-[#8d4fafcc] text-[#fff0c8] shadow-[inset_0_0_18px_rgba(255,216,160,0.18),0_0_18px_rgba(216,124,221,0.28)]"
                  : "border-[#7d5a65] bg-[#07091ed8] text-[#f5e6c5] hover:border-[#d28dce]/80 hover:bg-[#21123a]",
              ].join(" ")}
            >
              <span className={isActive ? "mr-2 text-[#ffd67e]" : "text-[#ffd67e] sm:mr-2"}>
                {CATEGORY_ICONS[group.icon]}
              </span>
              <span className={isActive ? "block" : "hidden sm:block"}>
                {group.title}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default OrderCategoryTabs;
