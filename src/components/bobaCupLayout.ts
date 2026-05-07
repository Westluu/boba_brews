const VIDEO_WIDTH = 1280;
const VIDEO_HEIGHT = 720;
const CUP_ANCHOR_X = 0.625;
const CUP_ANCHOR_Y = 0.77;
const CUP_WIDTH_RATIO = 0.24;
const CUP_ASPECT_RATIO = 453 / 600;

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);
const mix = (start: number, end: number, progress: number) =>
  start + (end - start) * progress;

export type BobaCupLayout = {
  left: number;
  top: number;
  width: number;
  height: number;
  tilt: number;
};

export function getBobaCupLayout(
  containerHeight: number,
  containerWidth: number,
  spellProgress: number,
): BobaCupLayout | null {
  if (containerWidth === 0 || containerHeight === 0) {
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
  const startCupWidth = Math.min(
    Math.max(renderedWidth * CUP_WIDTH_RATIO, 192),
    352,
  );
  const targetCupWidth = Math.min(Math.max(containerWidth * 0.34, 260), 470);
  const floatProgress = easeOutCubic(clamp((spellProgress - 0.08) / 0.68));
  const cupWidth = mix(startCupWidth, targetCupWidth, floatProgress);
  const targetLeft = containerWidth * 0.5;
  const targetCenterY = containerHeight * 0.5;
  const targetAnchorTop = targetCenterY + (cupWidth * CUP_ASPECT_RATIO) / 2;
  const cupLeft = mix(anchorLeft, targetLeft, floatProgress);
  const cupTop = mix(anchorTop, targetAnchorTop, floatProgress);
  const cupTilt = mix(-3, 2, floatProgress);

  return {
    left: cupLeft,
    top: cupTop,
    width: cupWidth,
    height: cupWidth * CUP_ASPECT_RATIO,
    tilt: cupTilt,
  };
}
