import type { ReactNode } from "react";
import catAbout from "../assets/about/cat-about.png";
import menuBackground from "../assets/menu/background.png";

const PROMISES = [
  {
    icon: "leaf",
    title: "Quality Ingredients",
    body: "We use high-quality tea, real fruit, and fresh ingredients in every drink.",
  },
  {
    icon: "potion",
    title: "Made with Care",
    body: "Every drink is handcrafted with love and a little bit of magic.",
  },
  {
    icon: "moon",
    title: "Cozy Experience",
    body: "A space to relax, unwind, and enjoy your favorite magical treats.",
  },
  {
    icon: "paw",
    title: "Community Focused",
    body: "We're here to bring people together and create sweet memories, one cup at a time.",
  },
] as const;

type PromiseIconName = (typeof PROMISES)[number]["icon"];

function PromiseIcon({ icon }: { icon: PromiseIconName }) {
  const icons: Record<PromiseIconName, ReactNode> = {
    leaf: (
      <svg viewBox="0 0 80 80" aria-hidden="true" className="h-20 w-20">
        <path
          d="M25 59c16-14 16-29 9-44 15 6 25 18 21 32-3 13-16 18-30 12Z"
          fill="#cbb7ff"
          stroke="#e5bc8a"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M21 62c12-16 22-27 34-36M22 49c9 1 15-2 20-8M30 34c5 3 11 4 18 2"
          fill="none"
          stroke="#4a267a"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
    ),
    potion: (
      <svg viewBox="0 0 80 80" aria-hidden="true" className="h-20 w-20">
        <path
          d="M32 12h16v10H32zM35 22h10v9l14 22c5 8-1 16-10 16H31c-9 0-15-8-10-16l14-22Z"
          fill="#8f5ee3"
          stroke="#e5bc8a"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M26 53c8 7 20 7 28 0l-8 12H34Z"
          fill="#d8b4fe"
        />
        <path
          d="M40 49c-8-5-12-10-9-15 3-4 8-2 9 2 1-4 6-6 9-2 3 5-1 10-9 15Z"
          fill="#f8dfb2"
        />
      </svg>
    ),
    moon: (
      <svg viewBox="0 0 80 80" aria-hidden="true" className="h-20 w-20">
        <path
          d="M55 58c-16 8-35-3-35-21 0-13 10-24 23-25-8 7-10 19-4 29 5 9 16 14 26 11-3 3-6 5-10 6Z"
          fill="#f8dfb2"
          stroke="#e5bc8a"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    ),
    paw: (
      <svg viewBox="0 0 80 80" aria-hidden="true" className="h-20 w-20">
        <path
          d="M23 41c-6 0-10-5-9-11 1-5 5-9 10-8 5 1 8 6 7 12-1 4-4 7-8 7Zm34 0c-4 0-7-3-8-7-1-6 2-11 7-12 5-1 9 3 10 8 1 6-3 11-9 11ZM34 28c-5 0-8-5-7-11 1-5 5-9 10-8 5 1 7 6 6 12-1 4-4 7-9 7Zm12 0c-5 0-8-3-9-7-1-6 1-11 6-12 5-1 9 3 10 8 1 6-2 11-7 11Z"
          fill="#d8b4fe"
          stroke="#e5bc8a"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M40 34c-12 0-22 11-22 23 0 8 6 12 13 8 6-3 12-3 18 0 7 4 13 0 13-8 0-12-10-23-22-23Z"
          fill="#b794f4"
          stroke="#e5bc8a"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  return (
    <div className="mx-auto flex h-20 w-20 items-center justify-center drop-shadow-[0_0_18px_rgba(192,132,252,0.45)]">
      {icons[icon]}
    </div>
  );
}

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

        {/* <section className="relative z-10 mx-auto mt-4 max-w-[96rem] rounded-[1rem] border border-[#d4a367] bg-[#171035e8] px-5 py-5 shadow-[0_24px_70px_rgba(0,0,0,0.48),inset_0_0_36px_rgba(192,132,252,0.08)] sm:px-8 sm:py-6 lg:mt-0">
          <h2 className="text-center font-display text-4xl leading-none text-[#d8b4fe] sm:text-5xl">
            <span className="mr-4 text-[#ffd67e]">✦</span>
            Our Promise
            <span className="ml-4 text-[#ffd67e]">✦</span>
          </h2>

          <div className="mt-6 grid gap-y-8 md:grid-cols-2 md:gap-y-10 lg:grid-cols-4">
            {PROMISES.map((promise) => (
              <article
                key={promise.title}
                className="px-5 text-center md:px-8 lg:border-l lg:border-dashed lg:border-[#d4a36799] lg:px-6 lg:first:border-l-0"
              >
                <PromiseIcon icon={promise.icon} />
                <h3 className="mt-4 font-display text-3xl leading-8 text-[#d8b4fe]">
                  {promise.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[18rem] font-display text-xl leading-7 text-[#f5e6c5] sm:text-2xl sm:leading-8">
                  {promise.body}
                </p>
              </article>
            ))}
          </div>
        </section> */}
      </div>
    </div>
  );
}

export default AboutPage;
