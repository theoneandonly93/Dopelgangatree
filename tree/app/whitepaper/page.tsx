export const metadata = {
  title: "Dopelganga Whitepaper",
  description: "Dopelganga Network White Paper Draft v1"
};

export default function WhitepaperPage() {
  return (
    <main className="prose prose-sm sm:prose lg:prose-lg max-w-3xl mx-auto px-4 py-12 dark:prose-invert">
      <p className="text-xs uppercase tracking-wider font-mono text-gray-500 mb-2">Draft v1</p>
      <h1 className="mb-6">Dopelganga Network White Paper (Draft v1)</h1>

      <h2>1. Introduction</h2>
      <p>
        Dopelganga is a Solana Layer-2 network and ecosystem that merges finance, connectivity, and consumer social apps. It is powered by two core tokens:
      </p>
      <ul>
        <li><strong>$DOPE</strong> — the mainnet currency that fuels transactions, validator rewards, and app usage.</li>
        <li><strong>$DWT (Dope Wallet Token)</strong> — the community bootstrap token, distributed early to reward adoption and integrate into the Dopelganga Wallet.</li>
      </ul>
      <p>
        The vision is to create a high-throughput, community-owned network that bridges financial utility with real consumer engagement through chat, governance, and events.
      </p>

      <h2>2. Token Utility</h2>
      <ul>
        <li><strong>$DWT</strong> — unlocks wallet features, qualifies for early airdrops, and ties early adopters into the $DOPE economy.</li>
        <li><strong>$DOPE</strong> — powers transactions across the Dopelganga mainnet, fees, validator staking, and the Dopelganga Chat dApp.</li>
      </ul>

      <h2>3. Ecosystem Components</h2>
      <ul>
        <li><strong>Dopelganga Wallet</strong> — lightweight Solana wallet with integrated airdrops and future app integrations.</li>
        <li><strong>Dopelganga Chat</strong> — decentralized messaging with token-based access and community interaction.</li>
        <li><strong>Governance Layer</strong> — token-based voting on network parameters and ecosystem decisions.</li>
        <li><strong>Community Events</strong> — IRL and online initiatives (like “Shill & Chill”) that reward activity and drive organic growth.</li>
      </ul>

      <h2>4. Roadmap</h2>
      <h3>Q4 2025</h3>
      <ul>
        <li>Finalize Wallet MVP with $DWT integration.</li>
        <li>Launch revamped website: <code>dchat-os85.vercel.app</code>.</li>
        <li>Release a public roadmap, token teaser, and product demo.</li>
      </ul>
      <h3>Q1 2026</h3>
      <ul>
        <li>Release full Dopelganga Wallet with $DOPE/$DWT support.</li>
        <li>Distribute airdrops to early $DWT holders.</li>
        <li>Begin development of Dopelganga Chat prototype powered by $DOPE.</li>
      </ul>
      <h3>Q2 2026</h3>
      <ul>
        <li>Launch $DOPE mainnet.</li>
        <li>Release Dopelganga Chat Beta (token-gated features, wallet integration).</li>
        <li>Onboard first validator cohort.</li>
      </ul>
      <h3>Q3 2026</h3>
      <ul>
        <li>Expand ecosystem governance (token-based proposals, DAO tooling).</li>
        <li>Host community events like the follow-up “Shill & Chill”.</li>
        <li>Roll out broader integrations with Solana DeFi and consumer dApps.</li>
      </ul>

      <h2>5. Growth Strategy</h2>
      <ul>
        <li><strong>Community First:</strong> reward early adopters through $DWT distribution and events.</li>
        <li><strong>Network Effects:</strong> chat, wallet, and governance are tightly bound by $DOPE utility.</li>
        <li><strong>Visibility:</strong> meme-driven branding (ghost mascot, Dopelganga identity) alongside professional rollouts (white paper, roadmap, demos).</li>
      </ul>

      <h2>6. Closing Notes</h2>
      <p>
        The Dopelganga Network aims to be more than another chain — it’s a cultural hub that mixes memes, finance, and real-world engagement. By merging wallets, mainnet infrastructure, and social layers, the project creates multiple entry points for adoption and growth.
      </p>

      <div className="mt-12 pt-6 border-t text-xs text-gray-500">© {new Date().getFullYear()} Dopelganga Network • Draft subject to revision</div>
    </main>
  );
}
