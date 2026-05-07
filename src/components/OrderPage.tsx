import { useMemo, useRef, useState } from "react";
import cauldron from "../assets/cauldron.png";
import brewingBoba from "../assets/menu/boba-brewing.png";
import menuBackground from "../assets/menu/background.png";
import { MENU_GROUPS, type MenuGroup, type MenuItem } from "../data/menu";
import { CATEGORY_ICONS, ITEM_CHARMS } from "./menu/menuSymbols";

type OptionKey = "size" | "ice" | "sweetness" | "temperature";

type BrewOptions = {
  ice: string;
  size: string;
  sweetness: string;
  temperature: string;
  toppings: string[];
};

type CartItem = {
  id: number;
  item: MenuItem;
  options: BrewOptions | null;
  price: number;
};

type Topping = {
  label: string;
  price: number;
};

const DEFAULT_OPTIONS: BrewOptions = {
  size: "Regular",
  ice: "Light Ice",
  sweetness: "75%",
  temperature: "Cold",
  toppings: ["Boba"],
};

const OPTION_GROUPS: Record<OptionKey, string[]> = {
  size: ["Small", "Regular", "Large"],
  ice: ["No Ice", "Light Ice", "Regular Ice"],
  sweetness: ["25%", "50%", "75%", "100%"],
  temperature: ["Cold", "Hot", "Sparkling"],
};

const OPTION_LABELS: Record<OptionKey, { label: string; icon: string }> = {
  size: { label: "Size", icon: "▯" },
  ice: { label: "Ice", icon: "✻" },
  sweetness: { label: "Sweetness", icon: "✦" },
  temperature: { label: "Temperature", icon: "♨" },
};

const TOPPINGS: Topping[] = [
  { label: "Boba", price: 0.75 },
  { label: "Jelly", price: 0.5 },
  { label: "Popping Pearls", price: 0.75 },
  { label: "Cream Foam", price: 0.75 },
];

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

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(amount);

const priceAsNumber = (price: string) =>
  Number(price.replace(/[^0-9.]/g, "")) || 0;

const isDrink = (group: MenuGroup) => group.title !== "Tiny Treats";

const selectedItemFallback = MENU_GROUPS[0].items[0];

function getDrinkPrice(item: MenuItem, options: BrewOptions) {
  const basePrice = priceAsNumber(item.price);
  const sizePrice =
    options.size === "Large" ? 0.75 : options.size === "Small" ? -0.25 : 0;
  const toppingPrice = options.toppings.reduce((total, topping) => {
    return (
      total + (TOPPINGS.find((entry) => entry.label === topping)?.price ?? 0)
    );
  }, 0);

  return Math.max(0, basePrice + sizePrice + toppingPrice);
}

function getTreatPrice(item: MenuItem) {
  return priceAsNumber(item.price);
}

function OrderPage() {
  const nextCartId = useRef(PRESET_CART_ITEMS.length + 1);
  const [activeGroupTitle, setActiveGroupTitle] = useState(MENU_GROUPS[0].title);
  const [selectedItem, setSelectedItem] = useState<MenuItem>(selectedItemFallback);
  const [options, setOptions] = useState<BrewOptions>(DEFAULT_OPTIONS);
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    PRESET_CART_ITEMS.map((entry, index) => ({
      id: index + 1,
      item: entry.item,
      options: entry.options,
      price: entry.options
        ? getDrinkPrice(entry.item, entry.options)
        : getTreatPrice(entry.item),
    })),
  );

  const activeGroup = useMemo(
    () => MENU_GROUPS.find((group) => group.title === activeGroupTitle) ?? MENU_GROUPS[0],
    [activeGroupTitle],
  );
  const selectedGroup = useMemo(
    () => MENU_GROUPS.find((group) => group.items.some((item) => item.name === selectedItem.name)),
    [selectedItem],
  );
  const selectedIsDrink = selectedGroup ? isDrink(selectedGroup) : true;
  const selectedPrice = selectedIsDrink
    ? getDrinkPrice(selectedItem, options)
    : getTreatPrice(selectedItem);
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const tax = subtotal * 0.08625;
  const total = subtotal + tax;

  const setOption = (key: OptionKey, value: string) => {
    setOptions((current) => ({
      ...current,
      [key]: value,
    }));
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

  const chooseItem = (group: MenuGroup, item: MenuItem) => {
    setActiveGroupTitle(group.title);
    setSelectedItem(item);
  };

  const addToCart = (item = selectedItem) => {
    const group = MENU_GROUPS.find((entry) =>
      entry.items.some((candidate) => candidate.name === item.name),
    );
    const itemIsDrink = group ? isDrink(group) : true;
    const nextOptions = itemIsDrink
      ? { ...options, toppings: [...options.toppings] }
      : null;
    const nextPrice =
      itemIsDrink && nextOptions ? getDrinkPrice(item, nextOptions) : getTreatPrice(item);

    setCartItems((current) => [
      ...current,
      {
        id: nextCartId.current++,
        item,
        options: nextOptions,
        price: nextPrice,
      },
    ]);
  };

  const removeFromCart = (id: number) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-black text-cream">
      <div
        className="relative min-h-screen overflow-hidden px-4 pb-10 pt-28 sm:px-7"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.12)), url(${menuBackground})`,
          backgroundPosition: "center top",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_8%,rgba(154,96,213,0.22),transparent_24rem),linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.55)_100%)]" />

        <section className="relative mx-auto min-h-[16rem] max-w-[130rem]">
          <div className="relative z-10 max-w-[43rem] pt-10 text-center sm:text-left lg:pt-14">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
              <h1 className="font-display text-7xl leading-none text-[#ffd8a0] [text-shadow:0_0_16px_rgba(255,216,160,0.2),0_12px_36px_rgba(0,0,0,0.65)] sm:text-8xl lg:text-9xl">
                Order Your Brew
              </h1>
              <span className="font-display text-6xl text-[#ffd8a0] sm:text-7xl">
                ☾
              </span>
            </div>
            <p className="mt-2 font-display text-3xl leading-tight text-[#e4a0f1] sm:text-4xl">
              Choose your potion, stir in toppings, and send it to the counter.
            </p>
          </div>

          <img
            src={brewingBoba}
            alt="Boba the cat stirring a magical cauldron"
            className="pointer-events-none absolute right-[15rem] top-[-5.8rem] z-0 hidden w-[43rem] max-w-[48vw] object-contain drop-shadow-[0_26px_48px_rgba(0,0,0,0.58)] lg:block 2xl:right-[20rem]"
            draggable="false"
          />
        </section>

        <section className="relative mx-auto max-w-[130rem]">
          <div className="flex gap-3 overflow-x-auto border-b border-[#9d6d67]/70 pb-0">
            {MENU_GROUPS.map((group) => {
              const isActive = group.title === activeGroupTitle;

              return (
                <button
                  key={group.title}
                  type="button"
                  onClick={() => {
                    setActiveGroupTitle(group.title);
                    setSelectedItem(group.items[0]);
                  }}
                  className={[
                    "min-h-14 shrink-0 rounded-t-[0.85rem] border px-5 font-display text-2xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/70 sm:min-w-[11rem]",
                    isActive
                      ? "border-[#d28dce] bg-[#8d4fafcc] text-[#fff0c8] shadow-[inset_0_0_18px_rgba(255,216,160,0.18),0_0_18px_rgba(216,124,221,0.28)]"
                      : "border-[#7d5a65] bg-[#07091ed8] text-[#f5e6c5] hover:border-[#d28dce]/80 hover:bg-[#21123a]",
                  ].join(" ")}
                >
                  <span className="mr-2 text-[#ffd67e]">{CATEGORY_ICONS[group.icon]}</span>
                  {group.title}
                </button>
              );
            })}
          </div>
        </section>

        <section className="relative mx-auto grid max-w-[130rem] gap-6 lg:grid-cols-[1.05fr_1.05fr_0.95fr]">
          <div className="min-h-[44rem] rounded-b-[1rem] border border-t-0 border-[#9d6d67] bg-[#07091ee8] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.46),inset_0_0_28px_rgba(113,74,150,0.13)]">
            <div className="grid gap-4">
              {activeGroup.items.map((item) => {
                const isSelected = item.name === selectedItem.name;

                return (
                  <article
                    key={item.name}
                    className={[
                      "relative grid grid-cols-[6.6rem_1fr] items-center gap-4 rounded-[1rem] border p-3 transition sm:grid-cols-[7.8rem_1fr_auto]",
                      isSelected
                        ? "border-[#ffd67e] bg-[#241239e8] shadow-[0_0_24px_rgba(255,214,126,0.34),inset_0_0_20px_rgba(216,124,221,0.14)]"
                        : "border-[#9d6d67]/70 bg-[#050716d8] hover:border-[#d28dce]/70",
                    ].join(" ")}
                  >
                    {isSelected && (
                      <span className="absolute -top-3 left-4 rounded-full border border-[#d28dce] bg-[#8750a6] px-4 py-0.5 font-display text-xl text-[#fff0c8] shadow-[0_0_18px_rgba(216,124,221,0.45)]">
                        ✦ Selected ✦
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => chooseItem(activeGroup, item)}
                      className="contents text-left"
                      aria-label={`Customize ${item.name}`}
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt=""
                          aria-hidden="true"
                          className="h-[6.4rem] w-[6.4rem] object-contain drop-shadow-[0_14px_20px_rgba(0,0,0,0.45)] sm:h-[7.4rem] sm:w-[7.4rem]"
                          draggable="false"
                        />
                      )}
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2 font-display text-3xl leading-none text-[#f8dfb2] sm:text-4xl">
                          {item.name}
                          {item.charm && (
                            <span className="text-3xl text-[#f7c56d]">
                              {ITEM_CHARMS[item.charm]}
                            </span>
                          )}
                        </span>
                        <span className="mt-2 block max-w-[19rem] text-lg leading-6 text-[#dfd5d0]">
                          {item.description}
                        </span>
                      </span>
                    </button>
                    <div className="col-span-2 grid gap-3 sm:col-span-1 sm:justify-items-end">
                      <span className="font-display text-3xl text-[#f8dfb2]">
                        {item.price}
                      </span>
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="rounded-full border border-[#d28dce] bg-[#7c3ea4] px-5 py-2 font-display text-xl text-[#fff0c8] shadow-[inset_0_0_18px_rgba(255,255,255,0.12),0_10px_22px_rgba(0,0,0,0.26)] transition hover:-translate-y-0.5 hover:bg-[#9354b8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a5f7]/80"
                      >
                        Add to Cauldron ✦
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 rounded-[0.9rem] border border-[#9d6d67]/70 bg-[#080819d8] px-5 py-3">
              <p className="font-display text-2xl leading-tight text-[#f8dfb2]">
                ✦ All drinks can be made hot, iced, or sparkling!
              </p>
              <span className="hidden font-display text-4xl text-[#ffd67e] sm:block">☾</span>
            </div>
          </div>

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
                                onClick={() => setOption(key, value)}
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
                              onClick={() => toggleTopping(topping.label)}
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
              onClick={() => addToCart()}
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
                  {cartItems.length}
                </span>
              </div>
              <h2 className="font-display text-5xl leading-none text-[#f8dfb2]">
                ♣ Your Cauldron ♣
              </h2>
              <p className="mt-2 font-display text-2xl text-[#f8dfb2]">
                Review your magical order.
              </p>
            </div>

            <div className="mt-5 border-y border-[#9d6d67]/70 py-3">
              {cartItems.length === 0 ? (
                <p className="py-10 text-center font-display text-3xl text-[#e4a0f1]">
                  Your cauldron is waiting.
                </p>
              ) : (
                <div className="grid gap-3">
                  {cartItems.map((cartItem) => (
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
                          onClick={() => removeFromCart(cartItem.id)}
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
                src={brewingBoba}
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
        </section>

        <section className="relative mx-auto mt-6 grid max-w-[100rem] gap-4 rounded-[1rem] border border-[#9d6d67] bg-[#07091ee8] px-6 py-4 shadow-[0_18px_42px_rgba(0,0,0,0.38)] md:grid-cols-4">
          {[
            ["☾", "Made with real ingredients and lots of love."],
            ["⚗", "No shortcuts here. Every drink is handcrafted."],
            ["★", "Cozy vibes guaranteed with every sip."],
            ["♣", "Thank you for supporting our magical little cafe!"],
          ].map(([icon, text]) => (
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
