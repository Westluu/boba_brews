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
      <div className="flex gap-3 overflow-x-auto border-b border-[#9d6d67]/70 pb-0">
        {groups.map((group) => {
          const isActive = group.title === activeGroupTitle;

          return (
            <button
              key={group.title}
              type="button"
              onClick={() => onSelectGroup(group)}
              className={[
                "min-h-14 shrink-0 rounded-t-[0.85rem] border px-5 font-display text-2xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/70 sm:min-w-[11rem]",
                isActive
                  ? "border-[#d28dce] bg-[#8d4fafcc] text-[#fff0c8] shadow-[inset_0_0_18px_rgba(255,216,160,0.18),0_0_18px_rgba(216,124,221,0.28)]"
                  : "border-[#7d5a65] bg-[#07091ed8] text-[#f5e6c5] hover:border-[#d28dce]/80 hover:bg-[#21123a]",
              ].join(" ")}
            >
              <span className="mr-2 text-[#ffd67e]">{CATEGORY_ICONS[group.icon]}</span>
              {group.title}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default OrderCategoryTabs;
