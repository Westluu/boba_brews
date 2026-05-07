import { useRef } from "react";
import type { MenuItem } from "../../data/menu";
import { useModalBehavior } from "../../hooks/useModalBehavior";
import MenuItemArt from "./MenuItemArt";
import { ITEM_CHARMS } from "./menuSymbols";

type MenuItemModalProps = {
  item: MenuItem;
  onClose: () => void;
};

function MenuItemModal({ item, onClose }: MenuItemModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useModalBehavior(onClose, closeButtonRef);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-item-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
    >
      <button
        type="button"
        aria-label="Close details"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-md animate-[fadeIn_180ms_ease-out] rounded-[1.2rem] border border-[#b9876d] bg-[#07091ef2] px-6 pb-6 pt-5 shadow-[0_28px_70px_rgba(0,0,0,0.6),inset_0_0_30px_rgba(113,74,150,0.18)]">
        <span className="absolute -right-1 top-3 font-display text-xl text-[#f8dfb2]">
          +
        </span>
        <span className="absolute -bottom-3 left-1/2 font-display text-2xl text-[#f8dfb2]">
          +
        </span>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#b9876d] font-display text-xl leading-none text-[#f8dfb2] transition hover:bg-[#f8dfb2]/10 focus:outline-none focus:ring-2 focus:ring-[#d77cdd]/60"
        >
          ×
        </button>

        <div className="flex flex-col items-center gap-2 pt-2">
          <MenuItemArt item={item} />
          <div className="mt-1 flex items-center gap-2">
            <h2
              id="menu-item-modal-title"
              className="font-display text-3xl text-[#f8dfb2] [text-shadow:0_0_14px_rgba(248,223,178,0.18)]"
            >
              {item.name}
            </h2>
            {item.charm && (
              <span className="font-display text-xl text-[#f7c56d]">
                {ITEM_CHARMS[item.charm]}
              </span>
            )}
          </div>
          <span className="font-display text-2xl text-[#d986e8]">
            {item.price}
          </span>
        </div>

        <div className="mx-auto mt-3 h-[2px] w-20 rounded-full bg-[#d77cdd]" />

        <p className="mt-4 text-center text-base leading-6 text-[#dfd5d0]">
          {item.details ?? item.description}
        </p>

        {item.ingredients && item.ingredients.length > 0 && (
          <div className="mt-5">
            <p className="font-display text-xl text-[#f8dfb2]">Brewed with</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {item.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="rounded-full border border-[#9d6d67] bg-[#14091bdd] px-3 py-1 text-sm text-[#e3a1e7]"
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.caffeine && (
          <p className="mt-4 text-sm leading-6 text-[#dfd5d0]">
            <span className="font-display text-base text-[#ffd67e]">
              Caffeine:{" "}
            </span>
            {item.caffeine}
          </p>
        )}
      </div>
    </div>
  );
}

export default MenuItemModal;
