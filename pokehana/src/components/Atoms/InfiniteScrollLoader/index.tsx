import Image from "next/image";
import { useEffect, useState } from "react";

export default function InfiniteScrollLoader() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse((p) => !p), 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div
        className={`relative w-14 h-14 ${
          pulse ? "scale-110" : "scale-100"
        } transition-transform duration-500`}
      >
        <Image
          src="/img/pokeball.svg"
          alt="Loading Pokeball"
          fill
          className="animate-spin-slow"
        />
        <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 blur-md animate-pulse" />
      </div>
      <p className="mt-2 text-sm text-gray-500">Healing Pokémon...</p>
    </div>
  );
}
