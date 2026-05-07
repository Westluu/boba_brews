import type { MenuItem } from "../data/menu";
import { TOPPINGS, type BrewOptions } from "../data/orderOptions";

const SIZE_PRICE_ADJUSTMENTS: Record<string, number> = {
  Small: -0.25,
  Regular: 0,
  Large: 0.75,
};

const TOPPING_PRICE_BY_LABEL = new Map(
  TOPPINGS.map((topping) => [topping.label, topping.price]),
);

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(amount);

export const priceAsNumber = (price: string) =>
  Number(price.replace(/[^0-9.]/g, "")) || 0;

export function getDrinkPrice(item: MenuItem, options: BrewOptions) {
  const basePrice = priceAsNumber(item.price);
  const sizePrice = SIZE_PRICE_ADJUSTMENTS[options.size] ?? 0;
  const toppingPrice = options.toppings.reduce((total, topping) => {
    return total + (TOPPING_PRICE_BY_LABEL.get(topping) ?? 0);
  }, 0);

  return Math.max(0, basePrice + sizePrice + toppingPrice);
}

export function getTreatPrice(item: MenuItem) {
  return priceAsNumber(item.price);
}
