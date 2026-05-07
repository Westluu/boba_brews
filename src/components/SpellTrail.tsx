import type { BobaCupLayout } from "./bobaCupLayout";

type SpellTrailProps = {
  cauldronRise: number;
  containerHeight: number;
  containerWidth: number;
  cupLayout: BobaCupLayout | null;
  progress: number;
  visible: boolean;
};

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);
const mix = (start: number, end: number, progress: number) =>
  start + (end - start) * progress;

const getCauldronBottom = (containerWidth: number) =>
  Math.min(Math.max(containerWidth * -0.07, -88), -32);

const SPARKLE_PATH =
  "M 0 -1 L 0.22 -0.22 L 1 0 L 0.22 0.22 L 0 1 L -0.22 0.22 L -1 0 L -0.22 -0.22 Z";

function SpellTrail({
  cauldronRise,
  containerHeight,
  containerWidth,
  cupLayout,
  progress,
  visible,
}: SpellTrailProps) {
  if (!visible || !cupLayout || containerWidth === 0 || containerHeight === 0) {
    return null;
  }

  const reveal = easeOutCubic(clamp((progress - 0.06) / 0.66));
  const wispProgress = easeOutCubic(clamp((progress - 0.24) / 0.48));
  const explosionCharge = easeOutCubic(clamp((progress - 0.74) / 0.16));
  const fade = 1 - easeOutCubic(clamp((progress - 0.96) / 0.04));
  const opacity = reveal * fade;

  if (opacity <= 0.01) {
    return null;
  }

  const cauldronWidth = Math.min(544, containerWidth * 0.72);
  const cauldronHeight = cauldronWidth * 0.8;
  const cauldronTranslateY = (1 - cauldronRise) * cauldronHeight * 0.56;
  const cauldronTop =
    containerHeight - getCauldronBottom(containerWidth) - cauldronHeight;
  const sourceX = containerWidth * 0.5;
  const sourceY = cauldronTop + cauldronTranslateY + cauldronHeight * 0.32;

  const cupCenterX = cupLayout.left;
  const cupCenterY = cupLayout.top - cupLayout.height * 0.52;

  // Path is two phases: (1) a short sweeping arc from the cauldron up to the
  // bottom of the cup, then (2) a spring-like coil that climbs around the cup
  // body from bottom to top. Each loop is a foreshortened horizontal ellipse;
  // its centre drifts upward, so the wraps stack like a slinky on the cup.
  // The boba.png asset has transparent padding around the actual cup, so the
  // coil radii are tuned to hug the visible cup body, not the bounding box.
  const ORBIT_WRAPS = 4;
  const ORBIT_SAMPLES = 240;
  const coilRx = cupLayout.width * 0.18;
  const coilRy = cupLayout.height * 0.055;
  const coilBottomY = cupCenterY + cupLayout.height * 0.4;
  const coilTopY = cupCenterY - cupLayout.height * 0.13;

  const orbitPoint = (u: number) => {
    const theta = u * Math.PI * 2 * ORBIT_WRAPS;
    const cy = mix(coilBottomY, coilTopY, u);
    return {
      x: cupCenterX - coilRx * Math.cos(theta),
      y: cy + coilRy * Math.sin(theta),
    };
  };

  const approach = orbitPoint(0);
  const approachX = approach.x;
  const approachY = approach.y;
  const dyApproach = approachY - sourceY;
  const ctrl1X = sourceX - cupLayout.width * 0.32;
  const ctrl1Y = sourceY + dyApproach * 0.45;
  const ctrl2X = approachX - cupLayout.width * 0.22;
  const ctrl2Y = approachY + cupLayout.height * 0.32;

  const orbitSegments = [];
  let orbitLength = 0;
  let prevPoint = { x: approachX, y: approachY };
  for (let i = 1; i <= ORBIT_SAMPLES; i++) {
    const point = orbitPoint(i / ORBIT_SAMPLES);
    orbitLength += Math.hypot(point.x - prevPoint.x, point.y - prevPoint.y);
    orbitSegments.push(`L ${point.x.toFixed(1)} ${point.y.toFixed(1)}`);
    prevPoint = point;
  }

  // Approximate the bezier arc length so APPROACH_FRACTION matches the actual
  // path proportion — keeps trailing sparkles glued to the visible stroke head.
  const bezierAt = (u: number) => {
    const inv = 1 - u;
    return {
      x:
        inv * inv * inv * sourceX +
        3 * inv * inv * u * ctrl1X +
        3 * inv * u * u * ctrl2X +
        u * u * u * approachX,
      y:
        inv * inv * inv * sourceY +
        3 * inv * inv * u * ctrl1Y +
        3 * inv * u * u * ctrl2Y +
        u * u * u * approachY,
    };
  };
  let bezierLength = 0;
  let prevBezier = { x: sourceX, y: sourceY };
  for (let i = 1; i <= 24; i++) {
    const point = bezierAt(i / 24);
    bezierLength += Math.hypot(point.x - prevBezier.x, point.y - prevBezier.y);
    prevBezier = point;
  }

  const trailPath = [
    `M ${sourceX.toFixed(1)} ${sourceY.toFixed(1)}`,
    `C ${ctrl1X.toFixed(1)} ${ctrl1Y.toFixed(1)},`,
    `${ctrl2X.toFixed(1)} ${ctrl2Y.toFixed(1)},`,
    `${approachX.toFixed(1)} ${approachY.toFixed(1)}`,
    ...orbitSegments,
  ].join(" ");

  const APPROACH_FRACTION = bezierLength / (bezierLength + orbitLength) || 0.2;
  const samplePath = (t: number) => {
    if (t <= APPROACH_FRACTION) {
      return bezierAt(t / APPROACH_FRACTION);
    }
    return orbitPoint((t - APPROACH_FRACTION) / (1 - APPROACH_FRACTION));
  };

  const baseStrokeWidth = Math.max(cupLayout.width * 0.035, 6);

  const sparkles = Array.from({ length: 22 }, (_, index) => {
    const stagger = index / 21;
    const along = clamp(reveal * 1.18 - stagger * 0.22);
    const sample = samplePath(along);
    const drift =
      Math.sin(stagger * Math.PI * 2.4 + wispProgress * 4) *
      cupLayout.width *
      0.14;
    const lift = -Math.sin(stagger * Math.PI) * cupLayout.height * 0.18;
    const size =
      mix(3, 9, (index % 5) / 4) *
      mix(0.85, 1.25, explosionCharge) *
      mix(0.6, 1, along);
    const alpha = clamp(along * 1.4) * fade;
    const rotation = stagger * 220 + wispProgress * 90;
    return {
      alpha,
      rotation,
      size,
      x: sample.x + drift * along,
      y: sample.y + lift,
      warm: index % 4 !== 0,
    };
  });

  // Burst sparkles emerge from the cup at the end of the spell.
  const burstSparkles = Array.from({ length: 22 }, (_, index) => {
    const angle = (index / 22) * Math.PI * 2 + wispProgress * 0.6;
    const radius =
      cupLayout.width *
      mix(0.18, 1.05, explosionCharge) *
      (0.7 + ((index * 37) % 11) / 18);
    return {
      alpha: explosionCharge * fade,
      rotation: (angle * 180) / Math.PI,
      size: mix(4, 11, ((index * 13) % 7) / 6) * mix(0.6, 1.2, explosionCharge),
      warm: index % 5 !== 0,
      x: cupCenterX + Math.cos(angle) * radius,
      y: cupCenterY + Math.sin(angle) * radius,
    };
  });

  return (
    <svg
      aria-hidden="true"
      className="spell-trail"
      viewBox={`0 0 ${containerWidth} ${containerHeight}`}
    >
      <defs>
        <linearGradient id="spellTrailCore" x1="0%" x2="100%" y1="100%" y2="0%">
          <stop offset="0%" stopColor="#ffeaa6" stopOpacity="0.0" />
          <stop offset="20%" stopColor="#ffd47a" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#fff4c2" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="spellTrailWisp" x1="0%" x2="100%" y1="100%" y2="0%">
          <stop offset="0%" stopColor="#5a2bb3" stopOpacity="0" />
          <stop offset="40%" stopColor="#9d5dff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#d6b6ff" stopOpacity="0.8" />
        </linearGradient>
        <filter id="spellTrailGoldGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="spellTrailPurpleGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="spellSparkleGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer purple smoke halo */}
      <path
        d={trailPath}
        fill="none"
        filter="url(#spellTrailPurpleGlow)"
        opacity={opacity * 0.85}
        pathLength={1}
        stroke="url(#spellTrailWisp)"
        strokeDasharray={1}
        strokeDashoffset={1 - reveal}
        strokeLinecap="round"
        strokeWidth={baseStrokeWidth * 1.7}
      />

      {/* Warm gold mid-glow */}
      <path
        d={trailPath}
        fill="none"
        filter="url(#spellTrailGoldGlow)"
        opacity={opacity}
        pathLength={1}
        stroke="#ffb95e"
        strokeDasharray={1}
        strokeDashoffset={1 - reveal}
        strokeLinecap="round"
        strokeWidth={baseStrokeWidth * 1.05}
      />

      {/* Bright gradient core */}
      <path
        d={trailPath}
        fill="none"
        opacity={opacity}
        pathLength={1}
        stroke="url(#spellTrailCore)"
        strokeDasharray={1}
        strokeDashoffset={1 - reveal}
        strokeLinecap="round"
        strokeWidth={baseStrokeWidth * 0.5}
      />

      {/* White-hot center line */}
      <path
        d={trailPath}
        fill="none"
        opacity={opacity * 0.95}
        pathLength={1}
        stroke="#ffffff"
        strokeDasharray={1}
        strokeDashoffset={1 - reveal}
        strokeLinecap="round"
        strokeWidth={Math.max(baseStrokeWidth * 0.18, 2.5)}
      />

      {/* Wispy purple tendrils — thin dashed overlay for the "lightning" feel */}
      {[0, 1].map((index) => (
        <path
          key={`wisp-${index}`}
          d={trailPath}
          fill="none"
          filter="url(#spellTrailGoldGlow)"
          opacity={opacity * mix(0.45, 0.85, wispProgress)}
          pathLength={1}
          stroke={index === 0 ? "#b07cff" : "#e7c8ff"}
          strokeDasharray={`${mix(0.012, 0.04, wispProgress)} ${mix(0.05, 0.02, wispProgress)}`}
          strokeDashoffset={-(wispProgress * 1.6 + index * 0.27)}
          strokeLinecap="round"
          strokeWidth={baseStrokeWidth * (0.32 - index * 0.16)}
        />
      ))}

      {/* Trailing star sparkles */}
      {sparkles.map((sparkle, index) => (
        <g
          key={`sparkle-${index}`}
          className="spell-trail-sparkle"
          opacity={sparkle.alpha}
          transform={`translate(${sparkle.x.toFixed(1)} ${sparkle.y.toFixed(1)}) rotate(${sparkle.rotation.toFixed(1)}) scale(${sparkle.size.toFixed(2)})`}
        >
          <path d={SPARKLE_PATH} fill={sparkle.warm ? "#ffe27a" : "#e9c8ff"} />
        </g>
      ))}

      {/* Final burst — concentric ring + radiating sparkles */}
      {explosionCharge > 0 && (
        <>
          <circle
            cx={cupCenterX}
            cy={cupCenterY}
            fill="none"
            filter="url(#spellTrailPurpleGlow)"
            opacity={opacity * explosionCharge * 0.55}
            r={cupLayout.width * mix(0.3, 0.95, explosionCharge)}
            stroke="#b07cff"
            strokeWidth={cupLayout.width * 0.05}
          />
          <circle
            cx={cupCenterX}
            cy={cupCenterY}
            fill="none"
            filter="url(#spellTrailGoldGlow)"
            opacity={opacity * explosionCharge * 0.85}
            r={cupLayout.width * mix(0.18, 0.7, explosionCharge)}
            stroke="#fff0b3"
            strokeWidth={cupLayout.width * 0.03}
          />
          {burstSparkles.map((sparkle, index) => (
            <g
              key={`burst-${index}`}
              className="spell-trail-sparkle"
              filter="url(#spellSparkleGlow)"
              opacity={sparkle.alpha}
              transform={`translate(${sparkle.x.toFixed(1)} ${sparkle.y.toFixed(1)}) rotate(${sparkle.rotation.toFixed(1)}) scale(${sparkle.size.toFixed(2)})`}
            >
              <path
                d={SPARKLE_PATH}
                fill={sparkle.warm ? "#ffe27a" : "#e9c8ff"}
              />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

export default SpellTrail;
