import type { MenuItem } from "../../data/menu";

type MenuItemArtProps = {
  item: MenuItem;
};

function MenuItemArt({ item }: MenuItemArtProps) {
  if (!item.image) {
    return (
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#b9876d] bg-[#14091bdd] font-display text-2xl text-[#f8dfb2] sm:h-[5.8rem] sm:w-[5.8rem] sm:text-3xl">
        ✦
      </div>
    );
  }

  return (
    <img
      src={item.image}
      alt=""
      aria-hidden="true"
      className="h-16 w-16 shrink-0 object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.42)] sm:h-[5.8rem] sm:w-[5.8rem]"
      loading="lazy"
      draggable="false"
    />
  );
}

export default MenuItemArt;
