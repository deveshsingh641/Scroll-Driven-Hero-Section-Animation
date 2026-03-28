"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  value: string;
  label: string;
};

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const lettersRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const visualWrapRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);

  const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  const letters = useMemo(
    () => ["W", "E", "L", "C", "O", "M", "E", "I", "T", "Z", "F", "I", "Z", "Z"],
    [],
  );

  const stats = useMemo<Stat[]>(
    () => [
      { value: "96%", label: "Scroll-linked motion smoothness" },
      { value: "78%", label: "Transform-only animation coverage" },
      { value: "99%", label: "Pinned hero stability on scroll" },
    ],
    [],
  );

  useLayoutEffect(() => {
    const heroEl = heroRef.current;
    const lettersEl = lettersRef.current;
    const statsEl = statsRef.current;
    const visualWrapEl = visualWrapRef.current;
    const visualEl = visualRef.current;

    if (!heroEl || !lettersEl || !statsEl || !visualWrapEl || !visualEl) return;

    const ctx = gsap.context(() => {
      const letterEls = Array.from(
        lettersEl.querySelectorAll<HTMLElement>("[data-letter]"),
      );
      const statEls = Array.from(statsEl.querySelectorAll<HTMLElement>("[data-stat]"));

      gsap.set(letterEls, { y: 18, opacity: 0 });
      gsap.set(statEls, { y: 16, opacity: 0 });
      gsap.set(visualWrapEl, { opacity: 0, scale: 0.98 });

      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      introTl
        .to(letterEls, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.04,
        })
        .to(
          visualWrapEl,
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
          },
          "-=0.35",
        )
        .to(
          statEls,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.12,
          },
          "-=0.25",
        );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "+=200%",
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
        },
      });

      scrollTl
        .fromTo(
          visualEl,
          { xPercent: -12, yPercent: 10, rotate: -6, scale: 0.98 },
          { xPercent: 28, yPercent: -12, rotate: 10, scale: 1.08, ease: "none" },
          0,
        )
        .to(
          lettersEl,
          {
            y: -14,
            opacity: 0.15,
            ease: "none",
          },
          0,
        )
        .to(
          statsEl,
          {
            y: -10,
            opacity: 0,
            ease: "none",
          },
          0,
        );
    }, heroEl);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-950" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-24">
        <h1
          aria-label="WELCOME ITZ FIZZ"
          className="text-center text-[clamp(32px,5vw,64px)] font-semibold tracking-[0.18em] text-zinc-950 dark:text-zinc-50"
        >
          <span className="sr-only">WELCOME ITZ FIZZ</span>
          <div ref={lettersRef} className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {letters.map((ch, idx) => (
              <span
                key={`${ch}-${idx}`}
                data-letter
                className="inline-block will-change-transform"
              >
                {ch}
              </span>
            ))}
          </div>
        </h1>

        <div
          ref={statsRef}
          className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-4 text-center sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-stat
              className="rounded-2xl border border-zinc-200/70 bg-white/70 px-5 py-4 backdrop-blur dark:border-white/10 dark:bg-white/5"
            >
              <div className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={visualWrapRef}
        className="pointer-events-none absolute inset-x-0 bottom-[10vh] z-0 mx-auto flex max-w-6xl items-center justify-center px-6"
      >
        <div className="relative w-full max-w-4xl">
          <div className="absolute -inset-x-8 -inset-y-12 rounded-[48px] bg-gradient-to-r from-zinc-100 to-white opacity-80 blur-2xl dark:from-zinc-900 dark:to-zinc-950" />
          <div ref={visualRef} className="relative will-change-transform">
            <Image
              src={`${publicBasePath}/hero-visual.svg`}
              alt="Stylized car visual"
              width={1600}
              height={650}
              priority
              className="mx-auto block h-auto w-full select-none"
              draggable={false}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center">
        <div className="rounded-full border border-zinc-200 bg-white/70 px-4 py-2 text-xs tracking-wide text-zinc-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
          SCROLL
        </div>
      </div>
    </section>
  );
}
