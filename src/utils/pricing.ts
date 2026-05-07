import type { MenuItem } from "../data/menu";
import { TOPPINGS, type BrewOptions } from "../data/orderOptions";

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(amount);

export const priceAsNumber = (price: string) =>
  Number(price.replace(/[^0-9.]/g, "")) || 0;

export function getDrinkPrice(item: MenuItem, options: BrewOptions) {
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

export function getTreatPrice(item: MenuItem) {
  return priceAsNumber(item.price);
}
