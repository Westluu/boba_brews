import catAbout from "../assets/about/cat-about.png";
import menuBackground from "../assets/menu/background.jpg";

function AboutPage() {
  return (
    <div className="relative min-h-screen bg-black text-cream">
      <div
        className="relative min-h-screen overflow-hidden px-4 pb-8 pt-28 sm:px-7"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(2,3,15,0.2), rgba(2,3,15,0.34)), url(${menuBackground})`,
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundColor: "#02030f",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_35%,rgba(118,67,171,0.18),transparent_34%),linear-gradient(90deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.04)_48%,rgba(0,0,0,0.36)_100%)]" />

        <section className="relative z-10 mx-auto grid max-w-[120rem] items-center gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(30rem,0.98fr)]">
          <div className="relative flex min-h-[24rem] items-end justify-center lg:min-h-[35rem] lg:justify-end">
            <img
              src={catAbout}
              alt="Boba the wizard cat sipping bubble tea beside a moonlit window"
              className="pointer-events-none w-full max-w-[34rem] object-contain drop-shadow-[0_28px_52px_rgba(0,0,0,0.58)] sm:max-w-[41rem] lg:max-w-[50rem]"
              draggable="false"
            />
          </div>

          <div className="mx-auto max-w-[42rem] pb-4 text-center lg:mx-0 lg:pb-0 lg:text-left">
            <div className="flex items-end justify-center gap-4 lg:justify-start">
              <span
                aria-hidden="true"
                className="font-display text-5xl text-[#ffd67e] sm:text-6xl"
              >
                ☾
              </span>
              <h1 className="font-display text-6xl leading-none text-[#f8dfb2] [text-shadow:0_0_18px_rgba(248,223,178,0.2),0_10px_34px_rgba(0,0,0,0.62)] sm:text-8xl lg:text-9xl">
                About Us
              </h1>
            </div>

            <p className="mt-4 font-display text-2xl leading-tight text-[#dca6ee] sm:text-3xl">
              Curious drinks brewed with a little magic
            </p>

            <div className="mx-auto mt-7 flex max-w-[36rem] items-center gap-4 lg:mx-0">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#b9857d] to-[#b9857d]" />
              <span className="font-display text-3xl text-[#ffd67e]">✦</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#b9857d] to-[#b9857d]" />
            </div>

            <div className="mt-8 grid gap-6 font-display text-2xl leading-9 text-[#f5e6c5] sm:text-3xl sm:leading-10">
              <p>
                We're a cozy little cafe where tea meets stardust. Every drink
                is crafted with care, inspired by the wonders of the night sky
                and a love for all things sweet, dreamy, and magical.
              </p>
              <p>
                From our signature brews to our tiny treats, we hope each sip
                and bite brings a moment of joy to your day.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default AboutPage;
