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

  const reveal = easeOutCubic(clamp((progress - 0.06) / 0.64));
  const wrapProgress = easeOutCubic(clamp((progress - 0.36) / 0.48));
  const explosionCharge = easeOutCubic(clamp((progress - 0.72) / 0.22));
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
  const cupRadiusX = cupLayout.width * 0.66;
  const cupRadiusY = cupLayout.height * 0.42;
  const loopLeftX = cupCenterX - cupRadiusX;
  const loopRightX = cupCenterX + cupRadiusX;
  const loopTopY = cupCenterY - cupRadiusY;
  const loopBottomY = cupCenterY + cupRadiusY;
  const approachX = mix(sourceX, cupCenterX, 0.52);
  const approachY = mix(sourceY, loopBottomY, 0.44);
  const orbitRadiusX = cupRadiusX * mix(0.88, 1.08, explosionCharge);
  const orbitRadiusY = cupRadiusY * mix(0.68, 0.9, explosionCharge);
  const orbitPath = [
    `M ${(cupCenterX - orbitRadiusX).toFixed(1)} ${cupCenterY.toFixed(1)}`,
    `a ${orbitRadiusX.toFixed(1)} ${orbitRadiusY.toFixed(1)} 0 1 0 ${(orbitRadiusX * 2).toFixed(1)} 0`,
    `a ${orbitRadiusX.toFixed(1)} ${orbitRadiusY.toFixed(1)} 0 1 0 ${(-orbitRadiusX * 2).toFixed(1)} 0`,
  ].join(" ");

  const trailPath = [
    `M ${sourceX.toFixed(1)} ${sourceY.toFixed(1)}`,
    `C ${(sourceX - cupLayout.width * 0.3).toFixed(1)} ${(sourceY - cupLayout.height * 0.9).toFixed(1)},`,
    `${(approachX - cupLayout.width * 0.9).toFixed(1)} ${(approachY - cupLayout.height * 0.55).toFixed(1)},`,
    `${loopLeftX.toFixed(1)} ${cupCenterY.toFixed(1)}`,
    `C ${loopLeftX.toFixed(1)} ${loopTopY.toFixed(1)}, ${loopRightX.toFixed(1)} ${loopTopY.toFixed(1)}, ${loopRightX.toFixed(1)} ${cupCenterY.toFixed(1)}`,
    `C ${loopRightX.toFixed(1)} ${loopBottomY.toFixed(1)}, ${loopLeftX.toFixed(1)} ${loopBottomY.toFixed(1)}, ${loopLeftX.toFixed(1)} ${cupCenterY.toFixed(1)}`,
    `C ${loopLeftX.toFixed(1)} ${(cupCenterY - cupRadiusY * 0.72).toFixed(1)}, ${(cupCenterX + cupRadiusX * 0.42).toFixed(1)} ${(cupCenterY - cupRadiusY * 0.52).toFixed(1)}, ${cupCenterX.toFixed(1)} ${(cupCenterY + cupRadiusY * 0.18).toFixed(1)}`,
  ].join(" ");

  const sparkles = Array.from({ length: 14 }, (_, index) => {
    const particleProgress = clamp(reveal * 1.18 - index * 0.055);
    const angle =
      particleProgress * Math.PI * 2.25 +
      wrapProgress * Math.PI * 6 +
      index * 0.74;
    const drift = Math.sin(index * 1.7) * cupLayout.width * 0.08;
    const x = mix(
      sourceX,
      cupCenterX + Math.cos(angle) * orbitRadiusX,
      particleProgress,
    );
    const y = mix(
      sourceY,
      cupCenterY + Math.sin(angle) * orbitRadiusY,
      particleProgress,
    );
    const size = mix(1.4, 4.6, (index % 5) / 4);

    return {
      opacity: clamp(particleProgress * 1.4) * fade * (1 + explosionCharge),
      r: size * mix(1, 1.45, explosionCharge),
      x: x + drift * particleProgress,
      y: y - Math.sin(particleProgress * Math.PI) * cupLayout.height * 0.28,
    };
  });

  return (
    <svg
      aria-hidden="true"
      className="spell-trail"
      viewBox={`0 0 ${containerWidth} ${containerHeight}`}
    >
      <defs>
        <linearGradient id="spellTrailGradient" x1="0%" x2="100%" y1="100%" y2="0%">
          <stop offset="0%" stopColor="#6e4ecb" stopOpacity="0.08" />
          <stop offset="42%" stopColor="#efb66f" />
          <stop offset="72%" stopColor="#fff0a8" />
          <stop offset="100%" stopColor="#fff8d7" />
        </linearGradient>
        <filter id="spellTrailGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feColorMatrix
            in="blur"
            result="warmGlow"
            values="1 0 0 0 0.98 0 0.82 0 0 0.46 0 0 0.5 0 0.16 0 0 0 0.78 0"
          />
          <feMerge>
            <feMergeNode in="warmGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d={trailPath}
        fill="none"
        filter="url(#spellTrailGlow)"
        opacity={opacity * 0.42}
        pathLength={1}
        stroke="#8f62dd"
        strokeDasharray={1}
        strokeDashoffset={1 - reveal}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={cupLayout.width * 0.22}
      />
      <path
        d={trailPath}
        fill="none"
        filter="url(#spellTrailGlow)"
        opacity={opacity}
        pathLength={1}
        stroke="url(#spellTrailGradient)"
        strokeDasharray={1}
        strokeDashoffset={1 - reveal}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={cupLayout.width * 0.075}
      />
      <path
        d={trailPath}
        fill="none"
        opacity={opacity * 0.88}
        pathLength={1}
        stroke="#fff7cc"
        strokeDasharray={1}
        strokeDashoffset={1 - reveal}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={Math.max(cupLayout.width * 0.018, 5)}
      />

      {[0, 1, 2].map((index) => (
        <path
          key={`orbit-${index}`}
          d={orbitPath}
          fill="none"
          filter="url(#spellTrailGlow)"
          opacity={opacity * wrapProgress * mix(0.42, 0.78, explosionCharge)}
          pathLength={1}
          stroke={index === 1 ? "#fff4b8" : "#efb66f"}
          strokeDasharray={`${mix(0.16, 0.3, explosionCharge)} ${mix(0.1, 0.05, explosionCharge)}`}
          strokeDashoffset={-(wrapProgress * 3.4 + index * 0.18)}
          strokeLinecap="round"
          strokeWidth={cupLayout.width * mix(0.026, 0.045, explosionCharge)}
          transform={`rotate(${
            wrapProgress * 980 + index * 58
          } ${cupCenterX} ${cupCenterY})`}
        />
      ))}

      {[0, 1].map((index) => (
        <circle
          key={`burst-${index}`}
          cx={cupCenterX}
          cy={cupCenterY}
          fill="none"
          filter="url(#spellTrailGlow)"
          opacity={opacity * explosionCharge * (0.52 - index * 0.18)}
          r={cupLayout.width * (0.46 + explosionCharge * (0.48 + index * 0.2))}
          stroke={index === 0 ? "#fff6c8" : "#b98dff"}
          strokeWidth={cupLayout.width * (0.038 - index * 0.01)}
        />
      ))}

      {sparkles.map((sparkle, index) => (
        <circle
          key={`sparkle-${index}`}
          className="spell-trail-sparkle"
          cx={sparkle.x}
          cy={sparkle.y}
          fill={index % 3 === 0 ? "#d9c3ff" : "#fff3bb"}
          opacity={sparkle.opacity}
          r={sparkle.r}
        />
      ))}
    </svg>
  );
}

export default SpellTrail;
