import type { CartItem } from "../../domain/order";
import { formatCurrency } from "../../utils/pricing";
import { ITEM_CHARMS } from "../menu/menuSymbols";
import cauldron from "../../assets/cauldron.png";
import wizardCat from "../../assets/wizard-cat.png";

type CartSidebarProps = {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  onRemove: (id: number) => void;
  variant?: "sidebar" | "sheet";
};

function CartSidebar({
  items,
  subtotal,
  tax,
  total,
  onRemove,
  variant = "sidebar",
}: CartSidebarProps) {
  const isSheet = variant === "sheet";

  return (
    <aside
      className={[
        isSheet
          ? "min-h-full rounded-none border-0 bg-transparent px-1 py-6"
          : "rounded-[1rem] border border-[#9d6d67] bg-[#07091ee8] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.46),inset_0_0_28px_rgba(113,74,150,0.13)] sm:p-5",
      ].join(" ")}
    >
      <div className="relative text-center">
        <div className="absolute -right-1 -top-2 flex h-12 w-12 items-center justify-center sm:h-16 sm:w-16">
          <img
            src={cauldron}
            alt=""
            aria-hidden="true"
            className="h-12 w-12 object-contain sm:h-16 sm:w-16"
            draggable="false"
          />
          <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#d28dce] bg-[#8d4faf] font-display text-xl text-[#fff0c8] sm:h-9 sm:w-9 sm:text-2xl">
            {items.length}
          </span>
        </div>
        <h2 className="font-display text-4xl leading-none text-[#f8dfb2] sm:text-5xl">
          Your Cauldron
        </h2>
        <p className="mt-2 font-display text-xl text-[#f8dfb2] sm:text-2xl">
          Review your magical order.
        </p>
      </div>

      <div className="mt-4 border-y border-[#9d6d67]/70 py-3 sm:mt-5">
        {items.length === 0 ? (
          <p className="py-8 text-center font-display text-2xl text-[#e4a0f1] sm:py-10 sm:text-3xl">
            Your cauldron is waiting.
          </p>
        ) : (
          <div className="grid gap-3">
            {items.map((cartItem) => (
              <article
                key={cartItem.id}
                className="grid grid-cols-[3.8rem_minmax(0,1fr)_auto] gap-3 border-b border-dashed border-[#9d6d67]/55 pb-3 last:border-b-0 last:pb-0 sm:grid-cols-[5.2rem_1fr_auto]"
              >
                {cartItem.item.image && (
                  <img
                    src={cartItem.item.image}
                    alt=""
                    aria-hidden="true"
                    className="h-14 w-14 object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.42)] sm:h-20 sm:w-20"
                    draggable="false"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-display text-2xl leading-none text-[#f8dfb2] sm:text-3xl">
                    1x {cartItem.item.name}{" "}
                    {cartItem.item.charm ? ITEM_CHARMS[cartItem.item.charm] : ""}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-[#dfd5d0] sm:mt-2 sm:text-lg sm:leading-6">
                    {cartItem.options
                      ? `${cartItem.options.size} · ${cartItem.options.sweetness} Sweet · ${cartItem.options.ice}`
                      : cartItem.item.description}
                  </p>
                  {cartItem.options && cartItem.options.toppings.length > 0 && (
                    <p className="text-sm leading-5 text-[#dfd5d0] sm:text-lg sm:leading-6">
                      + {cartItem.options.toppings.join(" + ")}
                    </p>
                  )}
                </div>
                <div className="grid justify-items-end gap-2 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => onRemove(cartItem.id)}
                    aria-label={`Remove ${cartItem.item.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7d5a65]/70 font-display text-2xl leading-none text-[#ffd8a0] transition hover:bg-[#9354b8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/80 sm:h-9 sm:w-9"
                  >
                    ×
                  </button>
                  <span className="font-display text-2xl text-[#f8dfb2] sm:text-3xl">
                    {formatCurrency(cartItem.price)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 grid gap-2 font-display text-xl text-[#f8dfb2] sm:mt-5 sm:text-2xl">
        <div className="flex justify-between gap-4">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Tax ✦</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="mt-2 flex justify-between gap-4 border-t border-[#9d6d67]/70 pt-3 text-3xl sm:text-4xl">
          <span>Total ✦</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <button
        type="button"
        className="mt-4 flex min-h-16 w-full items-center justify-center gap-2 rounded-full border border-[#d28dce] bg-[#7c3ea4] px-4 font-display text-2xl leading-none text-[#fff0c8] shadow-[inset_0_0_24px_rgba(255,255,255,0.14),0_16px_30px_rgba(0,0,0,0.34)] transition hover:-translate-y-0.5 hover:bg-[#9354b8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/80 sm:mt-5 sm:min-h-20 sm:gap-3 sm:px-5 sm:text-4xl"
      >
        Place Order
      </button>
      <p className="mt-3 text-center font-display text-lg text-[#f8dfb2] sm:text-xl">
        Secure and enchanted checkout
      </p>

      <div className="mt-4 flex items-center gap-3 rounded-[0.9rem] border border-[#9d6d67]/70 bg-[#080819d8] px-4 py-3 sm:mt-5 sm:gap-4 sm:px-5 sm:py-4">
        <img
          src={wizardCat}
          alt=""
          aria-hidden="true"
          className="h-16 w-16 shrink-0 object-contain sm:h-24 sm:w-24"
          draggable="false"
        />
        <p className="font-display text-xl leading-tight text-[#f8dfb2] sm:text-2xl">
          Your brew will be handcrafted with love and a sprinkle of stardust.
        </p>
      </div>
    </aside>
  );
}

export default CartSidebar;
