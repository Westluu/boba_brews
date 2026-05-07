import type { MenuItem } from "../../data/menu";
import type { BrewOptions, OptionKey } from "../../data/orderOptions";
import { useModalBehavior } from "../../hooks/useModalBehavior";
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
  useModalBehavior(onClose);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-2 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[calc(100svh-1rem)] w-full max-w-[60rem] overflow-y-auto sm:max-h-[92vh]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close customizer"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#9d6d67] bg-[#7d5a65]/80 font-display text-2xl leading-none text-[#ffd8a0] transition hover:bg-[#9354b8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/80 sm:right-4 sm:top-4 sm:h-10 sm:w-10 sm:text-3xl"
        >
          ×
        </button>
        <BrewCustomizer
          item={item}
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
