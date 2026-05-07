import { useMemo, useState } from "react";
import orderBrew from "../assets/order-brew.png";
import menuBackground from "../assets/menu/background.png";
import { MENU_GROUPS, type MenuGroup, type MenuItem } from "../data/menu";
import {
  DEFAULT_OPTIONS,
  type BrewOptions,
  type OptionKey,
} from "../data/orderOptions";
import { useCart } from "../hooks/useCart";
import {
  getDrinkPrice,
  getTreatPrice,
  isDrinkGroup,
} from "../utils/pricing";
import OrderCategoryTabs from "./order/OrderCategoryTabs";
import OrderItemList from "./order/OrderItemList";
import BrewCustomizer from "./order/BrewCustomizer";
import CartSidebar from "./order/CartSidebar";

const PRESET_CART_ITEMS = [
  {
    item: MENU_GROUPS[0].items[0],
    options: DEFAULT_OPTIONS,
  },
  {
    item: MENU_GROUPS[3].items[0],
    options: null,
  },
];

const FOOTER_NOTES: Array<[string, string]> = [
  ["☾", "Made with real ingredients and lots of love."],
  ["⚗", "No shortcuts here. Every drink is handcrafted."],
  ["★", "Cozy vibes guaranteed with every sip."],
  ["♣", "Thank you for supporting our magical little cafe!"],
];

function priceFor(item: MenuItem, options: BrewOptions | null) {
  return options ? getDrinkPrice(item, options) : getTreatPrice(item);
}

function findGroupForItem(item: MenuItem) {
  return MENU_GROUPS.find((group) =>
    group.items.some((candidate) => candidate.name === item.name),
  );
}

function OrderPage() {
  const [activeGroupTitle, setActiveGroupTitle] = useState(MENU_GROUPS[0].title);
  const [selectedItem, setSelectedItem] = useState<MenuItem>(MENU_GROUPS[0].items[0]);
  const [options, setOptions] = useState<BrewOptions>(DEFAULT_OPTIONS);

  const cart = useCart(
    PRESET_CART_ITEMS.map((entry) => ({
      item: entry.item,
      options: entry.options,
      price: priceFor(entry.item, entry.options),
    })),
  );

  const activeGroup = useMemo(
    () =>
      MENU_GROUPS.find((group) => group.title === activeGroupTitle) ?? MENU_GROUPS[0],
    [activeGroupTitle],
  );
  const selectedGroup = useMemo(() => findGroupForItem(selectedItem), [selectedItem]);
  const selectedIsDrink = selectedGroup ? isDrinkGroup(selectedGroup) : true;
  const selectedPrice = selectedIsDrink
    ? getDrinkPrice(selectedItem, options)
    : getTreatPrice(selectedItem);

  const setOption = (key: OptionKey, value: string) => {
    setOptions((current) => ({ ...current, [key]: value }));
  };

  const toggleTopping = (topping: string) => {
    setOptions((current) => {
      const hasTopping = current.toppings.includes(topping);

      return {
        ...current,
        toppings: hasTopping
          ? current.toppings.filter((entry) => entry !== topping)
          : [...current.toppings, topping],
      };
    });
  };

  const chooseGroup = (group: MenuGroup) => {
    setActiveGroupTitle(group.title);
    setSelectedItem(group.items[0]);
  };

  const chooseItem = (group: MenuGroup, item: MenuItem) => {
    setActiveGroupTitle(group.title);
    setSelectedItem(item);
  };

  const addToCart = (item: MenuItem = selectedItem) => {
    const group = findGroupForItem(item);
    const itemIsDrink = group ? isDrinkGroup(group) : true;
    const nextOptions = itemIsDrink
      ? { ...options, toppings: [...options.toppings] }
      : null;

    cart.addItem({
      item,
      options: nextOptions,
      price: priceFor(item, nextOptions),
    });
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

        <section className="relative mx-auto min-h-[10rem] max-w-[130rem]">
          <div className="relative z-10 max-w-[55rem] pt-2 text-center sm:text-left lg:pt-4">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <h1 className="font-display text-5xl leading-none text-[#ffd8a0] [text-shadow:0_0_16px_rgba(255,216,160,0.2),0_12px_36px_rgba(0,0,0,0.65)] sm:text-6xl lg:text-7xl">
                Order Your Brew
              </h1>
              <span className="font-display text-4xl text-[#ffd8a0] sm:text-5xl">
                ☾
              </span>
            </div>
            <p className="mt-1 font-display text-xl leading-tight text-[#e4a0f1] sm:text-2xl">
              Choose your potion, stir in toppings, and send it to the counter.
            </p>
          </div>

          <img
            src={orderBrew}
            alt="A wizard cat stirring a starlit cauldron beside today's orders scroll"
            className="pointer-events-none absolute right-[2rem] top-[-2rem] z-0 hidden w-[42rem] max-w-[40vw] object-contain drop-shadow-[0_26px_48px_rgba(0,0,0,0.58)] lg:block 2xl:right-[6rem]"
            draggable="false"
          />
        </section>

        <OrderCategoryTabs
          groups={MENU_GROUPS}
          activeGroupTitle={activeGroupTitle}
          onSelectGroup={chooseGroup}
        />

        <section className="relative mx-auto grid max-w-[130rem] gap-4 lg:grid-cols-[1.05fr_1.05fr_0.95fr]">
          <OrderItemList
            group={activeGroup}
            selectedItem={selectedItem}
            onSelectItem={chooseItem}
            onAddToCart={addToCart}
          />

          <BrewCustomizer
            selectedItem={selectedItem}
            selectedIsDrink={selectedIsDrink}
            options={options}
            selectedPrice={selectedPrice}
            onSetOption={setOption}
            onToggleTopping={toggleTopping}
            onAddToCart={() => addToCart()}
          />

          <CartSidebar
            items={cart.items}
            subtotal={cart.subtotal}
            tax={cart.tax}
            total={cart.total}
            onRemove={cart.removeItem}
          />
        </section>

        <section className="relative mx-auto mt-6 grid max-w-[100rem] gap-4 rounded-[1rem] border border-[#9d6d67] bg-[#07091ee8] px-6 py-4 shadow-[0_18px_42px_rgba(0,0,0,0.38)] md:grid-cols-4">
          {FOOTER_NOTES.map(([icon, text]) => (
            <div key={text} className="flex items-center gap-4">
              <span className="font-display text-5xl text-[#ffd67e]">{icon}</span>
              <p className="font-display text-2xl leading-tight text-[#f8dfb2]">{text}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default OrderPage;
