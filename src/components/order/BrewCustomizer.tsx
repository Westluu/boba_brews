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
  item: MenuItem;
  options: BrewOptions;
  selectedPrice: number;
  onSetOption: (key: OptionKey, value: string) => void;
  onToggleTopping: (topping: string) => void;
  onAddToCart: () => void;
};

function BrewCustomizer({
  item,
  options,
  selectedPrice,
  onSetOption,
  onToggleTopping,
  onAddToCart,
}: BrewCustomizerProps) {
  return (
    <div className="rounded-[1rem] border border-[#9d6d67] bg-[#07091ee8] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.46),inset_0_0_28px_rgba(113,74,150,0.13)] sm:p-5">
      <div className="text-center">
        <h2 className="font-display text-3xl leading-none text-[#ffd8a0] sm:text-4xl">
          Customize Your Brew
        </h2>
        <p className="mt-2 font-display text-lg text-[#dfd5d0] sm:text-xl">
          Make it yours. Every detail adds magic.
        </p>
      </div>

      <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-6 xl:grid-cols-[0.85fr_1fr]">
        <div className="flex items-center justify-center">
          {item.image ? (
            <img
              src={item.image}
              alt=""
              aria-hidden="true"
              className="h-40 w-40 object-contain drop-shadow-[0_22px_34px_rgba(0,0,0,0.48)] sm:h-[20rem] sm:w-[20rem]"
              draggable="false"
            />
          ) : (
            <div className="flex h-40 w-40 items-center justify-center rounded-full border border-[#9d6d67] bg-[#120b24] font-display text-6xl text-[#ffd67e] sm:h-[18rem] sm:w-[18rem] sm:text-7xl">
              ✦
            </div>
          )}
        </div>

        <div className="grid content-start gap-4">
          {(Object.keys(OPTION_GROUPS) as OptionKey[]).map((key) => (
            <fieldset key={key}>
              <legend className="mb-2 flex items-center gap-2 font-display text-xl text-[#f8dfb2] sm:text-2xl">
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
                        "min-h-11 rounded-[0.45rem] border px-2 font-display text-lg leading-tight transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/80 sm:min-h-12 sm:px-3 sm:text-xl",
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
            <legend className="mb-2 flex items-center gap-2 font-display text-xl text-[#f8dfb2] sm:text-2xl">
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
                      "min-h-14 rounded-[0.45rem] border px-2 font-display text-lg leading-tight transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/80 sm:min-h-16 sm:px-3 sm:text-xl",
                      isActive
                        ? "border-[#d28dce] bg-[#8d4fafcc] text-[#fff0c8] shadow-[inset_0_0_18px_rgba(255,255,255,0.12)]"
                        : "border-[#7d5a65] bg-[#030512] text-[#f5e6c5] hover:border-[#d28dce]/75",
                    ].join(" ")}
                  >
                    <span className="block">+ {topping.label}</span>
                    <span className="text-base sm:text-lg">+{formatCurrency(topping.price)}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>
      </div>

      <button
        type="button"
        onClick={onAddToCart}
        className="mt-4 flex min-h-16 w-full flex-wrap items-center justify-center gap-2 rounded-full border border-[#d28dce] bg-[#7c3ea4] px-4 font-display text-2xl leading-none text-[#fff0c8] shadow-[inset_0_0_24px_rgba(255,255,255,0.14),0_16px_30px_rgba(0,0,0,0.34)] transition hover:-translate-y-0.5 hover:bg-[#9354b8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/80 sm:mt-6 sm:min-h-20 sm:gap-4 sm:px-5 sm:text-4xl"
      >
        <img
          src={cauldron}
          alt=""
          aria-hidden="true"
          className="h-10 w-10 object-contain sm:h-14 sm:w-14"
          draggable="false"
        />
        Add to Cauldron
        <span>✦</span>
        <span className="text-xl sm:text-3xl">{formatCurrency(selectedPrice)}</span>
      </button>
    </div>
  );
}

export default BrewCustomizer;
