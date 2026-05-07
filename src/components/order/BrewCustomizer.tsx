import type { MenuItem } from "../../data/menu";
import {
  OPTION_GROUPS,
  OPTION_LABELS,
  TOPPINGS,
  type BrewOptions,
  type OptionKey,
} from "../../data/orderOptions";
import { formatCurrency } from "../../utils/pricing";
import cauldron from "../../assets/cauldron.png";

type BrewCustomizerProps = {
  selectedItem: MenuItem;
  selectedIsDrink: boolean;
  options: BrewOptions;
  selectedPrice: number;
  onSetOption: (key: OptionKey, value: string) => void;
  onToggleTopping: (topping: string) => void;
  onAddToCart: () => void;
};

function BrewCustomizer({
  selectedItem,
  selectedIsDrink,
  options,
  selectedPrice,
  onSetOption,
  onToggleTopping,
  onAddToCart,
}: BrewCustomizerProps) {
  return (
    <div className="rounded-[1rem] border border-[#9d6d67] bg-[#07091ee8] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.46),inset_0_0_28px_rgba(113,74,150,0.13)]">
      <div className="text-center">
        <h2 className="font-display text-5xl leading-none text-[#e4a0f1]">
          ✦ Customize Your Brew ✦
        </h2>
        <p className="mt-2 font-display text-2xl text-[#e4a0f1]">
          Make it yours. Every detail adds magic.
        </p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.85fr_1fr]">
        <div className="flex items-center justify-center">
          {selectedItem.image ? (
            <img
              src={selectedItem.image}
              alt=""
              aria-hidden="true"
              className="h-[20rem] w-[20rem] object-contain drop-shadow-[0_22px_34px_rgba(0,0,0,0.48)]"
              draggable="false"
            />
          ) : (
            <div className="flex h-[18rem] w-[18rem] items-center justify-center rounded-full border border-[#9d6d67] bg-[#120b24] font-display text-7xl text-[#ffd67e]">
              ✦
            </div>
          )}
        </div>

        <div className="grid content-start gap-4">
          {selectedIsDrink ? (
            <>
              {(Object.keys(OPTION_GROUPS) as OptionKey[]).map((key) => (
                <fieldset key={key}>
                  <legend className="mb-2 flex items-center gap-2 font-display text-2xl text-[#f8dfb2]">
                    <span className="text-[#e4a0f1]">{OPTION_LABELS[key].icon}</span>
                    {OPTION_LABELS[key].label}
                  </legend>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {OPTION_GROUPS[key].map((value) => {
                      const isActive = options[key] === value;

                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => onSetOption(key, value)}
                          className={[
                            "min-h-12 rounded-[0.45rem] border px-3 font-display text-xl leading-tight transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/80",
                            isActive
                              ? "border-[#d28dce] bg-[#8d4fafcc] text-[#fff0c8] shadow-[inset_0_0_18px_rgba(255,255,255,0.12)]"
                              : "border-[#7d5a65] bg-[#030512] text-[#f5e6c5] hover:border-[#d28dce]/75",
                          ].join(" ")}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}

              <fieldset>
                <legend className="mb-2 flex items-center gap-2 font-display text-2xl text-[#f8dfb2]">
                  <span className="text-[#e4a0f1]">♣</span>
                  Toppings
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {TOPPINGS.map((topping) => {
                    const isActive = options.toppings.includes(topping.label);

                    return (
                      <button
                        key={topping.label}
                        type="button"
                        onClick={() => onToggleTopping(topping.label)}
                        className={[
                          "min-h-16 rounded-[0.45rem] border px-3 font-display text-xl leading-tight transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/80",
                          isActive
                            ? "border-[#d28dce] bg-[#8d4fafcc] text-[#fff0c8] shadow-[inset_0_0_18px_rgba(255,255,255,0.12)]"
                            : "border-[#7d5a65] bg-[#030512] text-[#f5e6c5] hover:border-[#d28dce]/75",
                        ].join(" ")}
                      >
                        <span className="block">+ {topping.label}</span>
                        <span className="text-lg">+{formatCurrency(topping.price)}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </>
          ) : (
            <div className="rounded-[0.9rem] border border-[#9d6d67]/70 bg-[#050716d8] p-5">
              <p className="font-display text-3xl leading-tight text-[#f8dfb2]">
                This tiny treat is ready for the cauldron.
              </p>
              <p className="mt-3 text-lg leading-7 text-[#dfd5d0]">
                {selectedItem.details ?? selectedItem.description}
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onAddToCart}
        className="mt-6 flex min-h-20 w-full items-center justify-center gap-4 rounded-full border border-[#d28dce] bg-[#7c3ea4] px-5 font-display text-4xl leading-none text-[#fff0c8] shadow-[inset_0_0_24px_rgba(255,255,255,0.14),0_16px_30px_rgba(0,0,0,0.34)] transition hover:-translate-y-0.5 hover:bg-[#9354b8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/80"
      >
        <img
          src={cauldron}
          alt=""
          aria-hidden="true"
          className="h-14 w-14 object-contain"
          draggable="false"
        />
        Add to Cauldron
        <span>✦</span>
        <span className="text-3xl">{formatCurrency(selectedPrice)}</span>
      </button>
    </div>
  );
}

export default BrewCustomizer;
