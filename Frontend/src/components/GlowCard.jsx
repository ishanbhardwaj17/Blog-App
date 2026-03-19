import { useState } from "react";

export default function GlowCard({ children }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMove}
      className="group relative p-6 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden transition duration-300 hover:scale-[1.02]"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.15), transparent 40%)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}