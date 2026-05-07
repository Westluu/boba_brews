type HeroTitleProps = {
  layered?: boolean;
};

function HeroTitle({ layered = true }: HeroTitleProps) {
  const content = (
    <div className="hero-title-pop hero-title-lockup">
      <h1 className="hero-title-heading font-display text-cream [text-shadow:0_0_24px_rgba(245,230,197,0.16),0_10px_40px_rgba(0,0,0,0.55)]">
        <span className="block">Boba&apos;s</span>
        <span className="block">Brews</span>
      </h1>

      <p className="hero-title-subtitle font-display leading-tight text-magic-light [text-shadow:0_4px_20px_rgba(0,0,0,0.45)]">
        Curious drinks for curious creatures
      </p>
    </div>
  );

  if (!layered) {
    return content;
  }

  return <div className="hero-title-layer">{content}</div>;
}

export default HeroTitle;
