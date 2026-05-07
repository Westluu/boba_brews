import type { MenuGroup, MenuItem } from "../data/menu";
import {
  DEFAULT_OPTIONS,
  TAX_RATE,
  type BrewOptions,
  type OptionKey,
} from "../data/orderOptions";
import { getDrinkPrice, getTreatPrice } from "../utils/pricing";

export type CartItem = {
  id: number;
  item: MenuItem;
  options: BrewOptions | null;
  price: number;
};

export type AddCartInput = {
  item: MenuItem;
  options: BrewOptions | null;
  price: number;
};

export type CartTotals = {
  subtotal: number;
  tax: number;
  total: number;
};

export const cloneBrewOptions = (options: BrewOptions): BrewOptions => ({
  ...options,
  toppings: [...options.toppings],
});

export const getDefaultBrewOptions = () => cloneBrewOptions(DEFAULT_OPTIONS);

export const setBrewOption = (
  options: BrewOptions,
  key: OptionKey,
  value: string,
): BrewOptions => ({
  ...options,
  [key]: value,
});

export const toggleBrewTopping = (
  options: BrewOptions,
  topping: string,
): BrewOptions => {
  const hasTopping = options.toppings.includes(topping);

  return {
    ...options,
    toppings: hasTopping
      ? options.toppings.filter((entry) => entry !== topping)
      : [...options.toppings, topping],
  };
};

export const isDrinkGroup = (group: MenuGroup) => group.kind === "drink";

export const findGroupForItem = (
  groups: MenuGroup[],
  item: MenuItem,
): MenuGroup | undefined =>
  groups.find((group) =>
    group.items.some((candidate) => candidate.name === item.name),
  );

export const createDrinkCartInput = (
  item: MenuItem,
  options: BrewOptions,
): AddCartInput => ({
  item,
  options: cloneBrewOptions(options),
  price: getDrinkPrice(item, options),
});

export const createTreatCartInput = (item: MenuItem): AddCartInput => ({
  item,
  options: null,
  price: getTreatPrice(item),
});

export const toCartItem = (id: number, input: AddCartInput): CartItem => ({
  id,
  ...input,
});

export const calculateCartTotals = (
  items: CartItem[],
  taxRate = TAX_RATE,
): CartTotals => {
  const subtotal = items.reduce((total, item) => total + item.price, 0);
  const tax = subtotal * taxRate;

  return { subtotal, tax, total: subtotal + tax };
};
