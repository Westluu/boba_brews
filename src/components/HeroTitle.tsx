function HeroTitle() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-start px-6 pt-28 sm:px-12 sm:pt-36 lg:px-20 lg:pt-40">
      <div className="hero-title-pop max-w-[42rem]">
        <h1 className="font-display text-[clamp(4.5rem,10vw,9rem)] leading-[0.86] tracking-tight text-cream [text-shadow:0_0_24px_rgba(245,230,197,0.16),0_10px_40px_rgba(0,0,0,0.55)]">
          <span className="block">Boba&apos;s</span>
          <span className="block">Brews</span>
        </h1>

        <p className="mt-4 max-w-[24rem] font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-tight tracking-[0.03em] text-magic-light [text-shadow:0_4px_20px_rgba(0,0,0,0.45)]">
          Curious drinks for curious creatures
        </p>
      </div>
    </div>
  );
}

export default HeroTitle;
