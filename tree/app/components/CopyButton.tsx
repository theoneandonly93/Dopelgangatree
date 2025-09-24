"use client";

import { useState } from "react";

type CopyButtonProps = {
  value: string;
  className?: string;
  label?: string;
};

export default function CopyButton({ value, className, label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // no-op
    }
  };
  return (
    <button
      type="button"
      onClick={onCopy}
      className={className || "border border-black rounded px-2 py-1 text-xs hover:bg-black hover:text-white transition-colors"}
      aria-label={`Copy to clipboard: ${value}`}
    >
      {copied ? "Copied" : label}
    </button>
  );
}
