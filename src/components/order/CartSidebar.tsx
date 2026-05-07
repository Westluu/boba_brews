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
};

function CartSidebar({ items, subtotal, tax, total, onRemove }: CartSidebarProps) {
  return (
    <aside className="rounded-[1rem] border border-[#9d6d67] bg-[#07091ee8] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.46),inset_0_0_28px_rgba(113,74,150,0.13)]">
      <div className="relative text-center">
        <div className="absolute -right-1 -top-2 flex h-16 w-16 items-center justify-center">
          <img
            src={cauldron}
            alt=""
            aria-hidden="true"
            className="h-16 w-16 object-contain"
            draggable="false"
          />
          <span className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full border border-[#d28dce] bg-[#8d4faf] font-display text-2xl text-[#fff0c8]">
            {items.length}
          </span>
        </div>
        <h2 className="font-display text-5xl leading-none text-[#f8dfb2]">
          Your Cauldron
        </h2>
        <p className="mt-2 font-display text-2xl text-[#f8dfb2]">
          Review your magical order.
        </p>
      </div>

      <div className="mt-5 border-y border-[#9d6d67]/70 py-3">
        {items.length === 0 ? (
          <p className="py-10 text-center font-display text-3xl text-[#e4a0f1]">
            Your cauldron is waiting.
          </p>
        ) : (
          <div className="grid gap-3">
            {items.map((cartItem) => (
              <article
                key={cartItem.id}
                className="grid grid-cols-[5.2rem_1fr_auto] gap-3 border-b border-dashed border-[#9d6d67]/55 pb-3 last:border-b-0 last:pb-0"
              >
                {cartItem.item.image && (
                  <img
                    src={cartItem.item.image}
                    alt=""
                    aria-hidden="true"
                    className="h-20 w-20 object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.42)]"
                    draggable="false"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-display text-3xl leading-none text-[#f8dfb2]">
                    1x {cartItem.item.name}{" "}
                    {cartItem.item.charm ? ITEM_CHARMS[cartItem.item.charm] : ""}
                  </p>
                  <p className="mt-2 text-lg leading-6 text-[#dfd5d0]">
                    {cartItem.options
                      ? `${cartItem.options.size} · ${cartItem.options.sweetness} Sweet · ${cartItem.options.ice}`
                      : cartItem.item.description}
                  </p>
                  {cartItem.options && cartItem.options.toppings.length > 0 && (
                    <p className="text-lg leading-6 text-[#dfd5d0]">
                      + {cartItem.options.toppings.join(" + ")}
                    </p>
                  )}
                </div>
                <div className="grid justify-items-end gap-4">
                  <button
                    type="button"
                    onClick={() => onRemove(cartItem.id)}
                    aria-label={`Remove ${cartItem.item.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7d5a65]/70 font-display text-2xl leading-none text-[#ffd8a0] transition hover:bg-[#9354b8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/80"
                  >
                    ×
                  </button>
                  <span className="font-display text-3xl text-[#f8dfb2]">
                    {formatCurrency(cartItem.price)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 grid gap-2 font-display text-2xl text-[#f8dfb2]">
        <div className="flex justify-between gap-4">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Tax ✦</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="mt-2 flex justify-between gap-4 border-t border-[#9d6d67]/70 pt-3 text-4xl">
          <span>Total ✦</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <button
        type="button"
        className="mt-5 flex min-h-20 w-full items-center justify-center gap-3 rounded-full border border-[#d28dce] bg-[#7c3ea4] px-5 font-display text-4xl leading-none text-[#fff0c8] shadow-[inset_0_0_24px_rgba(255,255,255,0.14),0_16px_30px_rgba(0,0,0,0.34)] transition hover:-translate-y-0.5 hover:bg-[#9354b8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/80"
      >
        ♣ Place Magical Order ✦
      </button>
      <p className="mt-3 text-center font-display text-xl text-[#f8dfb2]">
        Secure and enchanted checkout
      </p>

      <div className="mt-5 flex items-center gap-4 rounded-[0.9rem] border border-[#9d6d67]/70 bg-[#080819d8] px-5 py-4">
        <img
          src={wizardCat}
          alt=""
          aria-hidden="true"
          className="h-24 w-24 shrink-0 object-contain"
          draggable="false"
        />
        <p className="font-display text-2xl leading-tight text-[#f8dfb2]">
          Your brew will be handcrafted with love and a sprinkle of stardust.
        </p>
      </div>
    </aside>
  );
}

export default CartSidebar;
