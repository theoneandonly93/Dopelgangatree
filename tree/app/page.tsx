"use client";


import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DopelField from "./components/DopelField";
import TypingText from "./components/TypingText";
import CopyButton from "./components/CopyButton";

const ADMIN_PASSWORD = "letmein"; // Change this to your desired admin password

type Link = {
  label: string;
  url: string;
  icon: string;
};

const initialLinks: Link[] = [
  {
    label: "DopelgangaChat",
    url: "https://dopelganga.com",
    icon: "/github.svg",
  },
  // Add more links as needed
];

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [showSaved, setShowSaved] = useState(false);
  // Save links to localStorage
  const handleSave = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("dopel_links", JSON.stringify(links));
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    }
  };

  const handleBack = () => {
    setIsAdmin(false);
  };

  // Auto-load links from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("dopel_links");
      if (saved) setLinks(JSON.parse(saved));
    }
    // reading from localStorage only on client
  }, []);

  // Auto-save links to localStorage on every change
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("dopel_links", JSON.stringify(links));
    }
  }, [links]);

  // Load links from localStorage on mount (for SSR safety)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("dopel_links");
      if (saved) setLinks(JSON.parse(saved));
    }
    // reading from localStorage only on client
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLogin(false);
      setPassword("");
      setLoginError("");
    } else {
      setLoginError("Incorrect password");
    }
  };

  // Edit state for links
  const [editIndex, setEditIndex] = useState(-1);
  const [editLabel, setEditLabel] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [addLabel, setAddLabel] = useState("");
  const [addUrl, setAddUrl] = useState("");

  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    setEditLabel(links[idx].label);
    setEditUrl(links[idx].url);
  };
  const handleEditSave = () => {
    setLinks((links: Link[]) => links.map((l: Link, i: number) => i === editIndex ? { ...l, label: editLabel, url: editUrl } : l));
    setEditIndex(-1);
    setEditLabel("");
    setEditUrl("");
  };
  const handleEditCancel = () => {
    setEditIndex(-1);
    setEditLabel("");
    setEditUrl("");
  };
  const handleDelete = (idx: number) => {
    setLinks((links: Link[]) => links.filter((_: Link, i: number) => i !== idx));
  };
  const handleAdd = () => {
    if (addLabel.trim() && addUrl.trim()) {
      setLinks([...links, { label: addLabel, url: addUrl, icon: "/github.svg" }]);
      setAddLabel("");
      setAddUrl("");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white text-black font-sans px-3">
      {/* Floating dopel background */}
      <DopelField />
      <div className="relative z-20 w-full max-w-md flex flex-col items-center gap-8 p-6 sm:p-8">
        <div className="flex justify-end w-full">
          <button
            aria-label="Admin login"
            className="hover:opacity-70 transition"
            style={{ width: 28, height: 28 }}
            onClick={() => setShowLogin(true)}
          >
            <Image src="/door.svg" alt="Admin login" width={24} height={24} />
          </button>
        </div>
  <Image src="/dopel.svg" alt="Logo" width={80} height={80} className="mb-2" />
  <h1 className="text-5xl sm:text-6xl font-extrabold leading-none mb-1">
    <TypingText text="$DOPE" />
  </h1>
  <div className="flex items-center gap-2 mb-1 text-xs sm:text-sm text-gray-700">
    <span className="font-mono break-all">938Yuj2CpqP3BB2nPJXc8iwYDKQws3TPwmLvSHg8pump</span>
    <CopyButton value="938Yuj2CpqP3BB2nPJXc8iwYDKQws3TPwmLvSHg8pump" label="Copy CA" />
  </div>
  <h2 className="text-3xl font-bold mb-2">THE TWIN.</h2>
        <div className="flex flex-col gap-4 w-full">
          {links.map((link: Link, idx: number) => (
            <div key={link.label + idx} className="flex items-center gap-3 border border-black rounded-lg px-4 py-3 text-lg font-medium group bg-white">
              <Image src={link.icon} alt={link.label} width={24} height={24} />
              {isAdmin && editIndex === idx ? (
                <>
                  <input
                    className="border border-black rounded px-2 py-1 text-base mr-2 max-w-[45%] sm:max-w-none"
                    value={editLabel}
                    onChange={e => setEditLabel(e.target.value)}
                    style={{ width: 90 }}
                  />
                  <input
                    className="border border-black rounded px-2 py-1 text-base mr-2 max-w-[45%] sm:max-w-none"
                    value={editUrl}
                    onChange={e => setEditUrl(e.target.value)}
                    style={{ width: 180 }}
                  />
                  <button className="text-green-700 font-bold mr-1" onClick={handleEditSave}>Save</button>
                  <button className="text-gray-500" onClick={handleEditCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-black hover:text-white transition-colors px-2 py-1 rounded break-words"
                  >
                    {link.label}
                  </a>
                  {isAdmin && (
                    <>
                      <button className="ml-2 text-blue-700" onClick={() => handleEdit(idx)}>Edit</button>
                      <button className="ml-1 text-red-600" onClick={() => handleDelete(idx)}>Delete</button>
                    </>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        {isAdmin && (
          <>
            <div className="flex flex-col sm:flex-row gap-2 mt-4 w-full">
              <input
                className="border border-black rounded px-3 py-2 flex-1 min-w-0"
                placeholder="Label"
                value={addLabel}
                onChange={e => setAddLabel(e.target.value)}
              />
              <input
                className="border border-black rounded px-3 py-2 flex-1 min-w-0"
                placeholder="URL"
                value={addUrl}
                onChange={e => setAddUrl(e.target.value)}
              />
              <button
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                onClick={handleAdd}
              >
                Add
              </button>
              <button
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900 sm:ml-2"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-600 sm:ml-2"
                onClick={handleBack}
              >
                Back
              </button>
            </div>
            {showSaved && (
              <div className="text-green-700 text-sm mt-2">Saved</div>
            )}
            <div className="text-green-700 text-sm mt-2">Admin mode enabled</div>
          </>
        )}
      </div>
      {showLogin && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 min-w-[260px]">
            <h2 className="text-xl font-bold">Admin Login</h2>
            <input
              type="password"
              placeholder="Enter password"
              className="border border-black rounded px-3 py-2 outline-none"
              autoFocus
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setLoginError("");
              }}
              onKeyDown={e => {
                if (e.key === "Enter") handleLogin();
              }}
            />
            {loginError && <div className="text-red-600 text-sm">{loginError}</div>}
            <div className="flex gap-2 justify-end">
              <button
                className="px-3 py-1 rounded border border-black hover:bg-black hover:text-white transition-colors"
                onClick={() => {
                  setShowLogin(false);
                  setPassword("");
                  setLoginError("");
                }}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 rounded bg-black text-white hover:bg-gray-800 transition-colors"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
  <div className="relative z-20 mt-10 flex items-center gap-3 text-sm flex-wrap justify-center">
        <Link
          href="/privacy"
          className="border border-black rounded px-4 py-2 hover:bg-black hover:text-white transition-colors"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          className="border border-black rounded px-4 py-2 hover:bg-black hover:text-white transition-colors"
        >
          Terms
        </Link>
      </div>
    </div>
  );
}
