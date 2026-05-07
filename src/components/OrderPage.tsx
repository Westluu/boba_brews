import { useMemo, useState } from "react";
import orderBrew from "../assets/order-brew.png";
import menuBackground from "../assets/menu/background.png";
import { MENU_GROUPS, type MenuGroup, type MenuItem } from "../data/menu";
import type { OptionKey } from "../data/orderOptions";
import {
  createDrinkCartInput,
  createTreatCartInput,
  findGroupForItem,
  getDefaultBrewOptions,
  isDrinkGroup,
  setBrewOption,
  toggleBrewTopping,
} from "../domain/order";
import { useCart } from "../hooks/useCart";
import { getDrinkPrice } from "../utils/pricing";
import OrderCategoryTabs from "./order/OrderCategoryTabs";
import OrderItemList from "./order/OrderItemList";
import BrewCustomizerModal from "./order/BrewCustomizerModal";
import CartSidebar from "./order/CartSidebar";

function OrderPage() {
  const [activeGroupTitle, setActiveGroupTitle] = useState(MENU_GROUPS[0].title);
  const [customizing, setCustomizing] = useState<MenuItem | null>(null);
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
        className="relative min-h-screen overflow-hidden px-4 pb-8 pt-20 sm:px-7"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.12)), url(${menuBackground})`,
          backgroundPosition: "center top",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_8%,rgba(154,96,213,0.22),transparent_24rem),linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.55)_100%)]" />

        <section className="relative mx-auto max-w-[120rem]">
          <div className="relative z-10 max-w-[55rem] text-center sm:text-left">
            <h1 className="font-display text-5xl leading-tight text-[#ffd8a0] [text-shadow:0_0_16px_rgba(255,216,160,0.2),0_12px_36px_rgba(0,0,0,0.65)] sm:text-6xl">
              Order Your Brew ☾
            </h1>
            <p className="mt-2 font-display text-xl leading-tight text-[#f3d6a3] sm:text-2xl">
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

          <div className="lg:sticky lg:top-24 lg:self-start">
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
