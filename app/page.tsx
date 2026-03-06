"use client";
import React, { useState } from "react";
import Image from "next/image";

const randomHex = () =>
  "#" +
  Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")
    .toUpperCase();

const DEFAULT_PALETTE_SIZE = 5;

function generatePalette(size = DEFAULT_PALETTE_SIZE) {
  return Array.from({ length: size }, randomHex);
}

export default function Home() {
  const [palette, setPalette] = useState(() => generatePalette());
  const [copied, setCopied] = useState<string | null>(null);

  function handleGenerate() {
    setPalette(generatePalette());
    setCopied(null);
  }

  function handleCopy(hex: string) {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1600);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-24 px-4 sm:px-12 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert mb-6"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50">
            HueNest: Instantly Create Beautiful Color Palettes
          </h1>
          <p className="max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Use this simple tool to generate color palettes for your next project. Tap &quot;Generate&quot; for a fresh palette, then click any color to copy its hex code. Palette generator is built with Next.js 16, React 19, and Tailwind CSS.
          </p>
        </div>

        {/* Palette Generator Section */}
        <section className="flex flex-col items-center mt-10 w-full">
          <div className="flex gap-2 mb-8">
            <button
              className="px-6 py-2 rounded-full bg-zinc-900 text-white dark:bg-zinc-200 dark:text-black font-medium hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              onClick={handleGenerate}
              type="button"
              aria-label="Generate new color palette"
            >
              Generate
            </button>
            <a
              className="px-6 py-2 rounded-full border border-zinc-300 dark:border-zinc-800 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-200 transition-colors font-medium"
              href="mailto:hi@chirag.co"
              aria-label="Contact owner"
            >
              Contact
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full mb-6">
            {palette.map((hex, idx) => (
              <button
                key={hex + idx}
                className="relative flex flex-col items-center justify-center p-0 border-none shadow-sm rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                style={{ background: hex, minHeight: 120 }}
                aria-label={`Copy ${hex} to clipboard`}
                onClick={() => handleCopy(hex)}
                tabIndex={0}
              >
                <span
                  className={`mt-2 px-2 py-1 rounded text-xs font-mono ${
                    hex === "#FFFFFF" || hex === "#FFF" || hex === "#fff"
                      ? "text-zinc-900"
                      : "text-white"
                  } bg-black/40`}
                  style={{
                    background:
                      hex.toLowerCase() === "#ffffff" ||
                      hex.toLowerCase() === "#fff"
                        ? "#eee"
                        : "rgba(0,0,0,0.4)",
                    color:
                      hex.toLowerCase() === "#ffffff" ||
                      hex.toLowerCase() === "#fff"
                        ? "#111"
                        : "#fff",
                  }}
                >
                  {hex}
                </span>
                {copied === hex && (
                  <span className="absolute mt-1 text-xs bg-zinc-900 text-white dark:bg-white dark:text-black rounded px-2 py-0.5 shadow transition">
                    Copied!
                  </span>
                )}
              </button>
            ))}
          </div>
          <footer className="text-xs text-zinc-500 dark:text-zinc-400 mt-4">
            &copy; {new Date().getFullYear()} HueNest &middot; Built by Chirag Dodiya (
            <a className="underline hover:text-zinc-700" href="mailto:hi@chirag.co">
              hi@chirag.co
            </a>
            )
          </footer>
        </section>

        {/* Original Main Page Call-to-actions */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-10">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}