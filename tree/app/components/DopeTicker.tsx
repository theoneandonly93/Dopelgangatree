"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Stats = {
  priceUsd?: number;
  marketCapUsd?: number;
  volume24hUsd?: number;
  source: "birdeye" | "dexscreener" | "mixed" | "unknown";
};

const MINT = "938Yuj2CpqP3BB2nPJXc8iwYDKQws3TPwmLvSHg8pump";
// Prefer env var, but fall back to the provided key if not set
const BIRDEYE_KEY = process.env.NEXT_PUBLIC_BIRDEYE_API_KEY || "b1d3c0d600e14940aea7845534ee6396";
const BE_HEADERS: HeadersInit | undefined = BIRDEYE_KEY
  ? {
      "X-API-KEY": BIRDEYE_KEY,
      "accept": "application/json",
      "x-chain": "solana",
    }
  : undefined;

function formatUsd(n?: number) {
  if (n == null || Number.isNaN(n)) return "-";
  if (n < 1) return `$${n.toFixed(6)}`;
  if (n < 1000) return `$${n.toFixed(2)}`;
  const units = ["", "K", "M", "B", "T"] as const;
  let idx = 0;
  let val = n;
  while (val >= 1000 && idx < units.length - 1) {
    val /= 1000;
    idx++;
  }
  return `$${val.toFixed(2)}${units[idx]}`;
}

function formatInt(n?: number) {
  if (n == null || Number.isNaN(n)) return "-";
  return new Intl.NumberFormat().format(n);
}

export default function DopeTicker() {
  const [stats, setStats] = useState<Stats>({ source: "unknown" });
  const [tick, setTick] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const refreshMs = 1_000; // 1s

  const fetchBirdeyePrice = async (): Promise<number | undefined> => {
    if (!BE_HEADERS) return undefined;
    try {
      const url = `https://public-api.birdeye.so/defi/price?address=${MINT}&ui_amount_mode=raw`;
      const res = await fetch(url, { headers: BE_HEADERS });
      if (!res.ok) throw new Error(`Birdeye price: ${res.status}`);
      const json = await res.json();
      const d = json?.data;
      const val = d?.value ?? d?.price ?? d?.priceUsd;
      const n = typeof val === "string" ? Number(val) : val;
      return typeof n === "number" && !Number.isNaN(n) ? n : undefined;
    } catch (_) {
      return undefined;
    }
  };

  const fetchBirdeyeOverview = async (): Promise<Partial<Stats> | null> => {
    if (!BE_HEADERS) return null;
    try {
      const url = `https://public-api.birdeye.so/defi/token_overview?address=${MINT}&chain=solana`;
      const res = await fetch(url, { headers: BE_HEADERS });
      if (!res.ok) throw new Error(`Birdeye overview: ${res.status}`);
      const json = await res.json();
      const d = json?.data;
      if (!d) return null;
      return {
        marketCapUsd: typeof d?.marketcap === "number" ? d.marketcap : (typeof d?.mc === "number" ? d.mc : undefined),
        volume24hUsd: typeof d?.v24hUsd === "number" ? d.v24hUsd : (typeof d?.volume24h === "number" ? d.volume24h : undefined),
      };
    } catch (_) {
      return null;
    }
  };

  const fetchFromDexscreener = async (): Promise<Partial<Stats> | null> => {
    try {
      const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${MINT}`);
      if (!res.ok) throw new Error(`DexScreener: ${res.status}`);
      const json = await res.json();
      const pairs: any[] = json?.pairs || [];
      if (!pairs.length) return null;
      // Prefer a Solana pair with highest liquidity
      const solPairs = pairs.filter((p) => p?.chainId === "solana");
      const best = (solPairs.length ? solPairs : pairs).sort((a, b) => (b?.liquidity?.usd || 0) - (a?.liquidity?.usd || 0))[0];
      const priceUsd = Number(best?.priceUsd) || undefined;
      const marketCapUsd = Number(best?.marketCap) || Number(best?.fdv) || undefined;
      const volume24hUsd = Number(best?.volume?.h24 ?? best?.volume24h ?? best?.txns?.h24?.buys + best?.txns?.h24?.sells) || undefined;
      return { priceUsd, marketCapUsd, volume24hUsd };
    } catch (_) {
      return null;
    }
  };

  const update = async () => {
    // Try Birdeye first if key present
    const [bePrice, beOverview] = await Promise.all([
      fetchBirdeyePrice(),
      fetchBirdeyeOverview(),
    ]);
    const fromDex = await fetchFromDexscreener();

    let merged: Stats = { source: "unknown" };
    if ((bePrice != null || beOverview) && fromDex) {
      merged = {
        priceUsd: bePrice ?? fromDex.priceUsd,
        marketCapUsd: beOverview?.marketCapUsd ?? fromDex.marketCapUsd,
        volume24hUsd: beOverview?.volume24hUsd ?? fromDex.volume24hUsd,
        source: "mixed",
      };
    } else if (bePrice != null || beOverview) {
      merged = { priceUsd: bePrice, ...beOverview, source: "birdeye" } as Stats;
    } else if (fromDex) {
      merged = { ...fromDex, source: "dexscreener" } as Stats;
    }
    setStats(merged);
    setTick((t) => t + 1);
  };

  useEffect(() => {
    update();
    intervalRef.current = window.setInterval(update, refreshMs);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const leftText = useMemo(() => {
    return `PRICE ${stats.priceUsd != null ? stats.priceUsd.toFixed(stats.priceUsd < 1 ? 6 : 2) : "-"}  MC ${formatUsd(stats.marketCapUsd)}`;
  }, [stats.priceUsd, stats.marketCapUsd]);
  const rightText = useMemo(() => {
    return `V24 ${formatUsd(stats.volume24hUsd)}`;
  }, [stats.volume24hUsd]);

  return (
    <>
      {/* Top-left ticker */}
      <div className="pointer-events-none fixed top-2 left-3 z-40 text-[11px] sm:text-xs font-mono digital tracking-widest text-black/70 dark:text-white/70 select-none">
        <span className="bg-white/70 dark:bg-black/30 backdrop-blur px-2 py-1 rounded shadow-sm">{leftText}</span>
      </div>
      {/* Top-right ticker */}
      <div className="pointer-events-none fixed top-2 right-3 z-40 text-[11px] sm:text-xs font-mono digital tracking-widest text-black/70 dark:text-white/70 select-none">
        <span className="bg-white/70 dark:bg-black/30 backdrop-blur px-2 py-1 rounded shadow-sm">{rightText}</span>
      </div>
    </>
  );
}
