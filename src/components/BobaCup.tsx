import bobaCup from "../assets/boba.png";

const VIDEO_WIDTH = 1280;
const VIDEO_HEIGHT = 720;
const CUP_ANCHOR_X = 0.625;
const CUP_ANCHOR_Y = 0.77;
const CUP_WIDTH_RATIO = 0.24;

type BobaCupProps = {
  containerHeight: number;
  containerWidth: number;
  visible: boolean;
};

function BobaCup({
  containerHeight,
  containerWidth,
  visible,
}: BobaCupProps) {
  if (!visible || containerWidth === 0 || containerHeight === 0) {
    return null;
  }

  const scale = Math.max(
    containerWidth / VIDEO_WIDTH,
    containerHeight / VIDEO_HEIGHT,
  );
  const renderedWidth = VIDEO_WIDTH * scale;
  const renderedHeight = VIDEO_HEIGHT * scale;
  const offsetLeft = containerWidth - renderedWidth;
  const offsetTop = (containerHeight - renderedHeight) / 2;
  const anchorLeft = offsetLeft + renderedWidth * CUP_ANCHOR_X;
  const anchorTop = offsetTop + renderedHeight * CUP_ANCHOR_Y;
  const cupWidth = Math.min(Math.max(renderedWidth * CUP_WIDTH_RATIO, 192), 352);

  return (
    <a
      href="#order"
      aria-label="Order boba"
      className="boba-cup absolute z-10 block cursor-pointer outline-none"
      style={{
        left: `${anchorLeft}px`,
        top: `${anchorTop}px`,
        transform: "translate(-50%, -100%) rotate(-3deg)",
        width: `${cupWidth}px`,
      }}
    >
      <img
        src={bobaCup}
        alt=""
        className="h-auto w-full object-contain"
        draggable="false"
      />
    </a>
  );
}

export default BobaCup;
