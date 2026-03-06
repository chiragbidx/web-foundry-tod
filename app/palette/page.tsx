"use client";
import React, { useState } from "react";

// Helper: Generate a random hex color
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

export default function PaletteGenerator() {
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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans">
      <main className="w-full max-w-2xl py-16 px-6 sm:px-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
          HueNest Palette Generator
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300 mb-6 max-w-md text-center">
          Instantly create beautiful color palettes for your next project. Click &quot;Generate&quot; for a fresh palette, then tap a color to copy its hex code. Built with Next.js 16, React 19, and Tailwind CSS.
        </p>
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
              className="flex flex-col items-center justify-center p-0 border-none shadow-sm rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
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
      </main>
    </div>
  );
}