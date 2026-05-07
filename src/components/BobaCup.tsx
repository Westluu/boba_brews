import type { CSSProperties } from "react";
import bobaCup from "../assets/boba.png";
import { getBobaCupLayout } from "./bobaCupLayout";

type BobaCupProps = {
  containerHeight: number;
  containerWidth: number;
  spellProgress: number;
  visible: boolean;
};

function BobaCup({
  containerHeight,
  containerWidth,
  spellProgress,
  visible,
}: BobaCupProps) {
  const layout = getBobaCupLayout(
    containerHeight,
    containerWidth,
    spellProgress,
  );

  if (!visible || !layout) {
    return null;
  }

  return (
    <a
      href="#menu"
      aria-label="Reveal the menu"
      className="boba-cup absolute z-10 block cursor-pointer outline-none"
      style={{
        left: `${layout.left}px`,
        top: `${layout.top}px`,
        transform: `translate(-50%, -100%) rotate(${layout.tilt}deg)`,
        width: `${layout.width}px`,
      } as CSSProperties}
    >
      <img
        src={bobaCup}
        alt=""
        className="boba-cup-image relative z-10 h-auto w-full object-contain"
        draggable="false"
      />
    </a>
  );
}

export default BobaCup;
