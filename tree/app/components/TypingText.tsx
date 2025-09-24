"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  text: string;
  speedMs?: number; // per character
  className?: string;
  showCursor?: boolean;
};

export default function TypingText({ text, speedMs = 90, className, showCursor = true }: TypingTextProps) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    setDisplay("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
      }
    }, Math.max(10, speedMs));
    return () => window.clearInterval(id);
  }, [text, speedMs]);

  return (
    <span className={className} aria-label={text} aria-live="polite">
      {display}
      {showCursor && <span className="blink">|</span>}
    </span>
  );
}
