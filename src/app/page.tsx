// src/app/page.tsx
"use client";

import Player from "@/components/player/Player";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 p-32">
      <Player />
    </main>
  );
}
