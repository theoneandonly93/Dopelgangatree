"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type DopelFieldProps = {
  count?: number;
  minSize?: number; // px
  maxSize?: number; // px
};

type Item = {
  top: number; // percentage 0-100
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  bobDuration: number; // seconds
  opacity: number; // 0-1
};

export default function DopelField({ count, minSize = 20, maxSize = 56 }: DopelFieldProps) {
  const [mounted, setMounted] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  useEffect(() => {
    setMounted(true);
    const onResize = () => setWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const computedCount = useMemo(() => {
    if (typeof count === "number") return count;
    if (width === null) return 16;
    if (width < 640) return 14;
    if (width < 1024) return 20;
    return 28;
  }, [count, width]);

  const items: Item[] = useMemo(() => {
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    return Array.from({ length: computedCount }).map(() => ({
      top: rand(2, 98),
      size: Math.round(rand(minSize, maxSize)),
      duration: rand(14, 32),
      delay: rand(0, 20),
      bobDuration: rand(3.5, 7.5),
      opacity: rand(0.15, 0.35),
    }));
  }, [computedCount, minSize, maxSize]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((it, i) => (
        <div key={i} className="absolute left-[-12vw]" style={{ top: `${it.top}%` }}>
          <div
            className="dopel-drift"
            style={{ animationDuration: `${it.duration}s`, animationDelay: `${it.delay}s` }}
          >
            <div
              className="dopel-bob"
              style={{ animationDuration: `${it.bobDuration}s`, animationDelay: `${it.delay / 2}s`, opacity: it.opacity }}
            >
              <Image src="/dopel.svg" alt="" width={it.size} height={it.size} priority={false} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
