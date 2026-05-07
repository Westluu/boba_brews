import type { MenuGroup, MenuItem } from "../data/menu";

export const isDrinkGroup = (group: MenuGroup) => group.kind === "drink";

export const findGroupForItem = (
  groups: MenuGroup[],
  item: MenuItem,
): MenuGroup | undefined =>
  groups.find((group) =>
    group.items.some((candidate) => candidate.name === item.name),
  );
