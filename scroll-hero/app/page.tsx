import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />

      <main className="mx-auto w-full max-w-6xl px-6 py-20">
        <h2 className="text-balance text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
          Scroll-driven hero section
        </h2>
        <p className="mt-3 max-w-2xl text-pretty text-zinc-600 dark:text-zinc-400">
          The hero above is pinned and its main visual transforms based on scroll
          progress (scrubbed), so the motion feels tied to you—not autoplay.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={`section-${idx}`}
              className="rounded-3xl border border-zinc-200/70 bg-white p-6 text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
            >
              <div className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                Section {idx + 1}
              </div>
              <div className="mt-2 text-sm leading-6">
                Placeholder content to create enough scroll distance for the
                pinned hero animation.
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
