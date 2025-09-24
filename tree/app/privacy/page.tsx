import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Dopelganga",
  description: "Privacy policy for Dopelganga.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black px-3">
      <div className="w-full max-w-2xl p-6 sm:p-8 leading-relaxed">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy for Dopelganga Chat</h1>
        <p className="text-sm text-gray-700 mb-6">
          <strong>Effective Date:</strong> 9/24/2025<br />
          <strong>Last Updated:</strong> 9/24/2025
        </p>

        <p className="mb-6">
          Dopelganga Chat is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and share your information when you use our decentralized chat application (“App”) built on Solana.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Wallet Information (public addresses, never private keys/seed phrases)</li>
          <li>Profile Information (username, avatar, bio)</li>
          <li>Authentication Data (email via Google, Magic login)</li>
          <li>Messages and Media (encrypted, ephemeral by design)</li>
          <li>Device Information (browser, device type, IP)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Enable chat, snaps, stories, calls</li>
          <li>Token transactions and rewards</li>
          <li>Security and troubleshooting</li>
          <li>Feature improvement</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">3. Data Storage and Security</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Some data stored on Solana blockchain or decentralized storage</li>
          <li>Supabase used for profile and session storage</li>
          <li>TLS encryption in transit, end-to-end encryption for certain features</li>
          <li>Users are responsible for securing their own private keys</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">4. Sharing of Information</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Never sold</li>
          <li>Shared only with your consent, trusted providers, or when legally required</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">5. Your Choices</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Connect/disconnect wallets anytime</li>
          <li>Update/delete profiles</li>
          <li>Ephemeral content expires unless preserved</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">6. Children’s Privacy</h2>
        <p>Not for children under 13 (or under 16 where required).</p>

        <h2 className="text-xl font-semibold mt-6 mb-3">7. International Users</h2>
        <p>GDPR, CCPA rights apply depending on jurisdiction.</p>

        <h2 className="text-xl font-semibold mt-6 mb-3">8. Changes to This Policy</h2>
        <p>We may update this Policy; changes will be communicated in-app.</p>

        <h2 className="text-xl font-semibold mt-6 mb-3">9. Contact Us</h2>
        <p>
          📧 <a className="underline" href="mailto:dopelgangachain@gmail.com">dopelgangachain@gmail.com</a><br />
          🌐 <a className="underline" href="https://dopelganga.com" target="_blank" rel="noopener noreferrer">dopelganga.com</a>
        </p>
      </div>
    </main>
  );
}
