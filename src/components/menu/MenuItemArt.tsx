import type { MenuItem } from "../../data/menu";

type MenuItemArtProps = {
  item: MenuItem;
};

function MenuItemArt({ item }: MenuItemArtProps) {
  if (!item.image) {
    return (
      <div className="flex h-[5.8rem] w-[5.8rem] shrink-0 items-center justify-center rounded-full border border-[#b9876d] bg-[#14091bdd] font-display text-3xl text-[#f8dfb2]">
        ✦
      </div>
    );
  }

  return (
    <img
      src={item.image}
      alt=""
      aria-hidden="true"
      className="h-[5.8rem] w-[5.8rem] shrink-0 object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.42)]"
      loading="lazy"
      draggable="false"
    />
  );
}

export default MenuItemArt;
