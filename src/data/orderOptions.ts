export type OptionKey = "size" | "ice" | "sweetness" | "temperature";

export type BrewOptions = {
  ice: string;
  size: string;
  sweetness: string;
  temperature: string;
  toppings: string[];
};

export type Topping = {
  label: string;
  price: number;
};

export const DEFAULT_OPTIONS: BrewOptions = {
  size: "Regular",
  ice: "Light Ice",
  sweetness: "75%",
  temperature: "Cold",
  toppings: ["Boba"],
};

export const OPTION_GROUPS: Record<OptionKey, string[]> = {
  size: ["Small", "Regular", "Large"],
  ice: ["No Ice", "Light Ice", "Regular Ice"],
  sweetness: ["25%", "50%", "75%", "100%"],
  temperature: ["Cold", "Hot", "Sparkling"],
};

export const OPTION_LABELS: Record<OptionKey, { label: string; icon: string }> = {
  size: { label: "Size", icon: "▯" },
  ice: { label: "Ice", icon: "✻" },
  sweetness: { label: "Sweetness", icon: "✦" },
  temperature: { label: "Temperature", icon: "♨" },
};

export const TOPPINGS: Topping[] = [
  { label: "Boba", price: 0.75 },
  { label: "Jelly", price: 0.5 },
  { label: "Popping Pearls", price: 0.75 },
  { label: "Cream Foam", price: 0.75 },
];

export const TAX_RATE = 0.08625;
