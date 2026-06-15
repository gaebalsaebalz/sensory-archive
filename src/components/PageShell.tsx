import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function PageShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/20 border-b border-white/20">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="text-black font-semibold">
            J's Archive of Senses
          </Link>

          <div className="flex gap-6 text-black text-sm">
            <Link to="/visual">시각 / Visual</Link>
            <Link to="/audio">청각 / Auditory</Link>
            <Link to="/taste">미각 / Taste</Link>
            <Link to="/scent">후각 / Scent</Link>
            <Link to="/about">About</Link>
            <Link to="/guestbook">방명록 / Guestbook</Link>
          </div>
        </nav>
      </header>

      <main className="min-h-screen bg-[#F4EEE4] text-black">
        {children}
      </main>
    </>
  );
}