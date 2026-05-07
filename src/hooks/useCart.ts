import { useMemo, useRef, useState } from "react";
import {
  calculateCartTotals,
  toCartItem,
  type AddCartInput,
  type CartItem,
} from "../domain/order";

export type { CartItem } from "../domain/order";

export function useCart(initial: AddCartInput[] = []) {
  const nextIdRef = useRef(initial.length + 1);
  const [items, setItems] = useState<CartItem[]>(() =>
    initial.map((entry, index) => toCartItem(index + 1, entry)),
  );

  const addItem = (input: AddCartInput) => {
    setItems((current) => [
      ...current,
      toCartItem(nextIdRef.current++, input),
    ]);
  };

  const removeItem = (id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const totals = useMemo(() => calculateCartTotals(items), [items]);

  return { items, addItem, removeItem, ...totals };
}
