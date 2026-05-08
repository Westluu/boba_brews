import type { MenuGroup, MenuItem } from "../data/menu";

export type MenuItemMatch = {
  group: MenuGroup;
  item: MenuItem;
};

export const isDrinkGroup = (group: MenuGroup) => group.kind === "drink";

export const findGroupForItem = (
  groups: MenuGroup[],
  item: MenuItem,
): MenuGroup | undefined =>
  groups.find((group) =>
    group.items.some((candidate) => candidate.name === item.name),
  );

export const findMenuItemByName = (
  groups: MenuGroup[],
  itemName: string,
): MenuItemMatch | undefined => {
  for (const group of groups) {
    const item = group.items.find((candidate) => candidate.name === itemName);

    if (item) {
      return { group, item };
    }
  }

  return undefined;
};
