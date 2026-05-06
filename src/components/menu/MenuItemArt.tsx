import type { MenuItem } from "../../data/menu";

type MenuItemArtProps = {
  item: MenuItem;
};

function CupArt({ accent }: { accent: string }) {
  return (
    <div className="relative h-[5.2rem] w-[4.4rem] shrink-0">
      <div className="absolute left-1/2 top-0 h-3 w-14 -translate-x-1/2 rounded-[50%] border border-[#efe0b6] bg-[#9d75c7]" />
      <div className="absolute left-1/2 top-2 h-[4.65rem] w-12 -translate-x-1/2 overflow-hidden rounded-b-[1rem] rounded-t-[0.25rem] border border-[#efe0b6] bg-[#f7e1be] shadow-[0_8px_18px_rgba(0,0,0,0.35)]">
        <div
          className="absolute inset-x-1 bottom-1 top-[0.85rem] rounded-b-[0.75rem]"
          style={{ background: accent }}
        />
        <div className="absolute left-1/2 top-5 h-5 w-5 -translate-x-1/2 rounded-[0.35rem] border border-[#f9e8bf] opacity-70" />
        <div className="absolute bottom-1.5 left-2 h-1.5 w-1.5 rounded-full bg-[#140a12]" />
        <div className="absolute bottom-1.5 left-5 h-1.5 w-1.5 rounded-full bg-[#140a12]" />
        <div className="absolute bottom-1.5 right-2 h-1.5 w-1.5 rounded-full bg-[#140a12]" />
        <div className="absolute bottom-3 left-3 h-1.5 w-1.5 rounded-full bg-[#140a12]" />
        <div className="absolute bottom-3 right-4 h-1.5 w-1.5 rounded-full bg-[#140a12]" />
      </div>
      <div className="absolute left-1/2 top-[-0.4rem] h-3 w-2 -translate-x-1/2 rounded-sm bg-[#f7d8af]" />
    </div>
  );
}

function PlateArt({ accent }: { accent: string }) {
  return (
    <div className="relative h-[5.2rem] w-[5rem] shrink-0">
      <div className="absolute bottom-2 left-1/2 h-10 w-16 -translate-x-1/2 rounded-[50%] border border-[#b78f96] bg-[#876f9f]" />
      <div className="absolute left-4 top-5 h-8 w-8 rotate-[-18deg] rounded-[0.75rem] border border-[#fee5b6] bg-[#ffd47d]" />
      <div
        className="absolute right-3 top-6 h-8 w-8 rotate-[14deg] rounded-[0.75rem] border border-[#fee5b6]"
        style={{ background: accent }}
      />
    </div>
  );
}

function MoonCookieArt({ accent }: { accent: string }) {
  return (
    <div className="relative h-[5.2rem] w-[5rem] shrink-0">
      <div
        className="absolute left-3 top-3 h-14 w-14 rounded-full border border-[#fee1a0]"
        style={{ background: accent }}
      />
      <div className="absolute left-7 top-1 h-14 w-14 rounded-full bg-[#060712]" />
      <span className="absolute left-6 top-8 h-1.5 w-1.5 rounded-full bg-[#9f7340]" />
      <span className="absolute left-9 top-5 h-1.5 w-1.5 rounded-full bg-[#9f7340]" />
      <span className="absolute left-8 top-11 h-1.5 w-1.5 rounded-full bg-[#9f7340]" />
    </div>
  );
}

function PuddingArt({ accent }: { accent: string }) {
  return (
    <div className="relative h-[5.2rem] w-[5rem] shrink-0">
      <div className="absolute bottom-2 left-1/2 h-14 w-14 -translate-x-1/2 overflow-hidden rounded-b-xl rounded-t-sm border border-[#f5dfbf] bg-[#f5dfbf]">
        <div className="absolute inset-x-0 top-0 h-5" style={{ background: accent }} />
        <div className="absolute left-2 top-1 text-[0.72rem] text-[#f7d889]">***</div>
      </div>
    </div>
  );
}

function PawArt({ accent }: { accent: string }) {
  return (
    <div className="relative h-[5.2rem] w-[5rem] shrink-0">
      <div
        className="absolute bottom-2 left-1/2 h-11 w-12 -translate-x-1/2 rounded-[1rem] border border-[#64351f]"
        style={{ background: accent }}
      />
      <div className="absolute bottom-5 left-7 h-5 w-5 rounded-full bg-[#6b3d2e]" />
      <div className="absolute left-4 top-5 h-4 w-4 rounded-full bg-[#6b3d2e]" />
      <div className="absolute left-8 top-4 h-4 w-4 rounded-full bg-[#6b3d2e]" />
      <div className="absolute right-4 top-5 h-4 w-4 rounded-full bg-[#6b3d2e]" />
    </div>
  );
}

function MenuItemArt({ item }: MenuItemArtProps) {
  if (item.art === "plate") {
    return <PlateArt accent={item.accent} />;
  }

  if (item.art === "moon-cookie") {
    return <MoonCookieArt accent={item.accent} />;
  }

  if (item.art === "pudding") {
    return <PuddingArt accent={item.accent} />;
  }

  if (item.art === "paw") {
    return <PawArt accent={item.accent} />;
  }

  return <CupArt accent={item.accent} />;
}

export default MenuItemArt;
