import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Dopelganga",
  description: "Terms of service for Dopelganga.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black px-3">
      <div className="w-full max-w-2xl p-6 sm:p-8 leading-relaxed">
        <h1 className="text-3xl font-bold mb-2">Terms of Service for Dopelganga Chat</h1>
        <p className="text-sm text-gray-700 mb-6">
          <strong>Effective Date:</strong> 9/24/2025<br />
          <strong>Last Updated:</strong> 9/24/2025
        </p>

        <p className="mb-6">
          Welcome to Dopelganga Chat. By accessing or using our decentralized application Dopelganga, you agree to these Terms of Service.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">1. Eligibility</h2>
        <p>You must be at least 13 years old (16 where required) to use the App.</p>

        <h2 className="text-xl font-semibold mt-6 mb-3">2. Accounts and Wallets</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>You are responsible for securing your wallet credentials, seed phrase, or keystore.</li>
          <li>Wallets connected to Dopelganga Chat may be used for tokens, rewards, and transactions.</li>
          <li>We are not responsible for lost keys or unauthorized access.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">3. User Conduct</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Use the App for unlawful, abusive, or fraudulent activities.</li>
          <li>Harass, impersonate, or exploit other users.</li>
          <li>Attempt to hack, reverse engineer, or disrupt the App.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">4. Content</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>You retain ownership of your content.</li>
          <li>You grant us limited rights to transmit, store, and display your content solely for App functionality.</li>
          <li>Ephemeral content may disappear automatically but can be preserved if you choose.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">5. Tokens and Rewards</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Dopelganga tokens may be used for invites, chats, tips, or other in-app utilities.</li>
          <li>All transactions on Solana are final and irreversible.</li>
          <li>Tokens do not represent equity, ownership, or securities.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">6. Calls and Media</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Calls and facetime-like features rely on WebRTC.</li>
          <li>We are not responsible for connectivity issues or data charges.</li>
          <li>You must not record or share calls without consent.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">7. Disclaimers and Limitations</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>The App is provided “as is” without warranties.</li>
          <li>We are not liable for lost data, tokens, or service interruptions.</li>
          <li>Use of blockchain networks carries inherent risks.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">8. Termination</h2>
        <p>We may suspend or terminate accounts that violate these Terms.</p>

        <h2 className="text-xl font-semibold mt-6 mb-3">9. Governing Law</h2>
        <p>These Terms are governed by the laws of the United States.</p>

        <h2 className="text-xl font-semibold mt-6 mb-3">10. Contact Us</h2>
        <p>
          📧 <a className="underline" href="mailto:dopelgangachain@gmail.com">dopelgangachain@gmail.com</a><br />
          🌐 <a className="underline" href="https://dopelganga.com" target="_blank" rel="noopener noreferrer">dopelganga.com</a>
        </p>
      </div>
    </main>
  );
}
