import type { MenuGroup, MenuItem } from "../../data/menu";
import { ITEM_CHARMS } from "../menu/menuSymbols";

type OrderItemListProps = {
  group: MenuGroup;
  onAddToCart: (item: MenuItem) => void;
};

function OrderItemList({ group, onAddToCart }: OrderItemListProps) {
  const actionLabel = group.kind === "drink" ? "Customize ✦" : "Add to Cauldron ✦";

  return (
    <div className="rounded-b-[1rem] border border-t-0 border-[#9d6d67] bg-[#07091ee8] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.46),inset_0_0_28px_rgba(113,74,150,0.13)] sm:p-3">
      <div className="grid gap-3">
        {group.items.map((item) => (
          <article
            key={item.name}
            className="relative grid grid-cols-[5.8rem_minmax(0,1fr)] items-center gap-3 rounded-[1rem] border border-[#9d6d67]/70 bg-[#050716d8] p-3 transition hover:border-[#d28dce]/70 sm:grid-cols-[7.8rem_1fr_auto] sm:gap-4"
          >
            {item.image && (
              <img
                src={item.image}
                alt=""
                aria-hidden="true"
                className="h-[5.6rem] w-[5.6rem] object-contain drop-shadow-[0_14px_20px_rgba(0,0,0,0.45)] sm:h-[7.4rem] sm:w-[7.4rem]"
                draggable="false"
              />
            )}
            <div className="min-w-0">
              <span className="flex flex-wrap items-center gap-2 font-display text-[1.65rem] leading-none text-[#f8dfb2] sm:text-4xl">
                {item.name}
                {item.charm && (
                  <span className="text-2xl text-[#f7c56d] sm:text-3xl">
                    {ITEM_CHARMS[item.charm]}
                  </span>
                )}
              </span>
              <span className="mt-2 block text-base leading-5 text-[#dfd5d0] sm:max-w-[19rem] sm:text-lg sm:leading-6">
                {item.description}
              </span>
              <div className="mt-2 grid gap-2 sm:hidden">
                <span className="font-display text-2xl text-[#f8dfb2]">
                  {item.price}
                </span>
                <button
                  type="button"
                  onClick={() => onAddToCart(item)}
                  className="min-h-10 w-full rounded-full border border-[#d28dce] bg-[#7c3ea4] px-4 font-display text-lg text-[#fff0c8] shadow-[inset_0_0_18px_rgba(255,255,255,0.12),0_10px_22px_rgba(0,0,0,0.26)] transition hover:-translate-y-0.5 hover:bg-[#9354b8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/80"
                >
                  {actionLabel}
                </button>
              </div>
            </div>
            <div className="hidden gap-3 sm:col-span-1 sm:grid sm:justify-items-end">
              <span className="font-display text-3xl text-[#f8dfb2]">
                {item.price}
              </span>
              <button
                type="button"
                onClick={() => onAddToCart(item)}
                className="rounded-full border border-[#d28dce] bg-[#7c3ea4] px-5 py-2 font-display text-xl text-[#fff0c8] shadow-[inset_0_0_18px_rgba(255,255,255,0.12),0_10px_22px_rgba(0,0,0,0.26)] transition hover:-translate-y-0.5 hover:bg-[#9354b8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/80"
              >
                {actionLabel}
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 rounded-[0.9rem] border border-[#9d6d67]/70 bg-[#080819d8] px-4 py-3 sm:mt-4 sm:px-5">
        <p className="font-display text-xl leading-tight text-[#f8dfb2] sm:text-2xl">
          ✦ All drinks can be made hot, iced, or sparkling!
        </p>
        <span className="hidden font-display text-4xl text-[#ffd67e] sm:block">☾</span>
      </div>
    </div>
  );
}

export default OrderItemList;
