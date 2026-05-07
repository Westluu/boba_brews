import { useMemo, useState, type CSSProperties } from "react";
import cauldron from "../assets/cauldron.png";
import orderBrew from "../assets/order-brew.png";
import menuBackground from "../assets/menu/background.jpg";
import { MENU_GROUPS, type MenuGroup, type MenuItem } from "../data/menu";
import type { OptionKey } from "../data/orderOptions";
import {
  createDrinkCartInput,
  createTreatCartInput,
  getDefaultBrewOptions,
  setBrewOption,
  toggleBrewTopping,
} from "../domain/order";
import { findGroupForItem, isDrinkGroup } from "../domain/menu";
import { useCart } from "../hooks/useCart";
import { formatCurrency, getDrinkPrice } from "../utils/pricing";
import OrderCategoryTabs from "./order/OrderCategoryTabs";
import OrderItemList from "./order/OrderItemList";
import BrewCustomizerModal from "./order/BrewCustomizerModal";
import CartSidebar from "./order/CartSidebar";

function OrderPage() {
  const [activeGroupTitle, setActiveGroupTitle] = useState(MENU_GROUPS[0].title);
  const [customizing, setCustomizing] = useState<MenuItem | null>(null);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [options, setOptions] = useState(getDefaultBrewOptions);

  const cart = useCart();

  const activeGroup = useMemo(
    () =>
      MENU_GROUPS.find((group) => group.title === activeGroupTitle) ?? MENU_GROUPS[0],
    [activeGroupTitle],
  );

  const setOption = (key: OptionKey, value: string) => {
    setOptions((current) => setBrewOption(current, key, value));
  };

  const toggleTopping = (topping: string) => {
    setOptions((current) => toggleBrewTopping(current, topping));
  };

  const chooseGroup = (group: MenuGroup) => {
    setActiveGroupTitle(group.title);
  };

  const handleAdd = (item: MenuItem) => {
    const group = findGroupForItem(MENU_GROUPS, item);
    if (group && isDrinkGroup(group)) {
      setOptions(getDefaultBrewOptions());
      setCustomizing(item);
      return;
    }
    cart.addItem(createTreatCartInput(item));
  };

  const confirmCustomize = () => {
    if (!customizing) {
      return;
    }
    cart.addItem(createDrinkCartInput(customizing, options));
    setCustomizing(null);
  };

  return (
    <div className="relative min-h-screen bg-black text-cream">
      <div
        className="order-page-bg relative min-h-screen overflow-hidden px-3 pb-32 pt-24 sm:px-7 sm:pb-8 sm:pt-20"
        style={{
          "--order-background-image": `linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.12)), url(${menuBackground})`,
        } as CSSProperties}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_8%,rgba(154,96,213,0.22),transparent_24rem),linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.55)_100%)]" />

        <section className="relative mx-auto hidden max-w-[120rem] sm:block">
          <div className="relative z-10 max-w-[55rem] text-center sm:text-left">
            <h1 className="font-display text-4xl leading-tight text-[#ffd8a0] [text-shadow:0_0_16px_rgba(255,216,160,0.2),0_12px_36px_rgba(0,0,0,0.65)] sm:text-6xl">
              Order Your Brew ☾
            </h1>
            <p className="mx-auto mt-2 max-w-[24rem] font-display text-lg leading-tight text-[#f3d6a3] sm:mx-0 sm:max-w-none sm:text-2xl">
              Choose your potion, stir in toppings, and send it to the counter.
            </p>
          </div>

          <img
            src={orderBrew}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-[1rem] top-[-1.5rem] z-0 hidden w-[22rem] max-w-[26vw] object-contain opacity-90 drop-shadow-[0_26px_48px_rgba(0,0,0,0.58)] lg:block 2xl:right-[4rem]"
            draggable="false"
          />
        </section>

        <section className="relative mx-auto mt-4 grid max-w-[120rem] gap-4 lg:grid-cols-[1fr_24rem]">
          <div>
            <OrderCategoryTabs
              groups={MENU_GROUPS}
              activeGroupTitle={activeGroupTitle}
              onSelectGroup={chooseGroup}
            />

            <OrderItemList
              group={activeGroup}
              onAddToCart={handleAdd}
            />
          </div>

          <div className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <CartSidebar
              items={cart.items}
              subtotal={cart.subtotal}
              tax={cart.tax}
              total={cart.total}
              onRemove={cart.removeItem}
            />
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#9d6d67]/70 bg-[#080819f5] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-16px_38px_rgba(0,0,0,0.48)] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div className="relative h-10 w-10 shrink-0">
              <img
                src={cauldron}
                alt=""
                aria-hidden="true"
                className="h-10 w-10 object-contain"
                draggable="false"
              />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border border-[#d28dce] bg-[#8d4faf] px-1 font-display text-sm leading-none text-[#fff0c8]">
                {cart.items.length}
              </span>
            </div>
            <span className="truncate font-display text-lg text-[#f8dfb2]">
              {cart.items.length} {cart.items.length === 1 ? "item" : "items"}
            </span>
            <span className="font-display text-xl text-[#f8dfb2]">
              {formatCurrency(cart.total)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileCartOpen(true)}
            className="min-h-11 shrink-0 rounded-[0.75rem] border border-[#d28dce] bg-[#8d4faf] px-4 font-display text-lg text-[#fff0c8] shadow-[inset_0_0_18px_rgba(255,255,255,0.12)] transition hover:bg-[#9354b8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/80"
          >
            View Cauldron ✦
          </button>
        </div>
      </div>

      {isMobileCartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Your cauldron"
          className="fixed inset-0 z-50 bg-[#020412] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-6 lg:hidden"
        >
          <button
            type="button"
            onClick={() => setIsMobileCartOpen(false)}
            aria-label="Close cauldron"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#9d6d67] bg-[#7d5a65]/80 font-display text-3xl leading-none text-[#ffd8a0] transition hover:bg-[#9354b8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/80"
          >
            ×
          </button>
          <div className="h-full overflow-y-auto">
            <CartSidebar
              items={cart.items}
              subtotal={cart.subtotal}
              tax={cart.tax}
              total={cart.total}
              onRemove={cart.removeItem}
              variant="sheet"
            />
          </div>
        </div>
      )}

      {customizing && (
        <BrewCustomizerModal
          item={customizing}
          options={options}
          selectedPrice={getDrinkPrice(customizing, options)}
          onSetOption={setOption}
          onToggleTopping={toggleTopping}
          onConfirm={confirmCustomize}
          onClose={() => setCustomizing(null)}
        />
      )}
    </div>
  );
}

export default OrderPage;
