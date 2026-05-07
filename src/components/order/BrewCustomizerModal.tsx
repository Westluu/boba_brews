import { useEffect } from "react";
import type { MenuItem } from "../../data/menu";
import type { BrewOptions, OptionKey } from "../../data/orderOptions";
import BrewCustomizer from "./BrewCustomizer";

type BrewCustomizerModalProps = {
  item: MenuItem;
  options: BrewOptions;
  selectedPrice: number;
  onSetOption: (key: OptionKey, value: string) => void;
  onToggleTopping: (topping: string) => void;
  onConfirm: () => void;
  onClose: () => void;
};

function BrewCustomizerModal({
  item,
  options,
  selectedPrice,
  onSetOption,
  onToggleTopping,
  onConfirm,
  onClose,
}: BrewCustomizerModalProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-[60rem] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close customizer"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#9d6d67] bg-[#7d5a65]/80 font-display text-3xl leading-none text-[#ffd8a0] transition hover:bg-[#9354b8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/80"
        >
          ×
        </button>
        <BrewCustomizer
          selectedItem={item}
          selectedIsDrink
          options={options}
          selectedPrice={selectedPrice}
          onSetOption={onSetOption}
          onToggleTopping={onToggleTopping}
          onAddToCart={onConfirm}
        />
      </div>
    </div>
  );
}

export default BrewCustomizerModal;
