import { useMemo, useRef, useState } from "react";
import type { MenuItem } from "../data/menu";
import { TAX_RATE, type BrewOptions } from "../data/orderOptions";

export type CartItem = {
  id: number;
  item: MenuItem;
  options: BrewOptions | null;
  price: number;
};

type AddCartInput = {
  item: MenuItem;
  options: BrewOptions | null;
  price: number;
};

export function useCart(initial: AddCartInput[] = []) {
  const nextIdRef = useRef(initial.length + 1);
  const [items, setItems] = useState<CartItem[]>(() =>
    initial.map((entry, index) => ({ id: index + 1, ...entry })),
  );

  const addItem = (input: AddCartInput) => {
    setItems((current) => [
      ...current,
      { id: nextIdRef.current++, ...input },
    ]);
  };

  const removeItem = (id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const totals = useMemo(() => {
    const subtotal = items.reduce((total, item) => total + item.price, 0);
    const tax = subtotal * TAX_RATE;
    return { subtotal, tax, total: subtotal + tax };
  }, [items]);

  return { items, addItem, removeItem, ...totals };
}
