'use client';

import { FormEvent, useEffect, useRef, useState } from "react";

type MessageAuthor = "self" | "teammate" | "system";

type Message = {
  id: string;
  author: MessageAuthor;
  sender: string;
  body: string;
  createdAt: string;
};

const STORAGE_KEY = "alumni-hub.group-chat.messages";

const seedMessages: Message[] = [
  {
    id: "seed-1",
    author: "system",
    sender: "Community Bot",
    body: "Welcome to Signal Commons! Share quick updates, links, or wins for the team.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "seed-2",
    author: "teammate",
    sender: "Priya N.",
    body: "Reminder: mentor kickoff starts at 3 PM. Drop questions here if you need deck access.",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "seed-3",
    author: "teammate",
    sender: "Andre L.",
    body: "Scholarship thank-you video is ready. Uploading to Drive now—link coming soon!",
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
];

function generateId() {
  return `msg-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
}

function formatTimestamp(value: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "";
  }
}

type GroupChatPanelProps = {
  currentUserName?: string;
};

export function GroupChatPanel({ currentUserName = "You" }: GroupChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(seedMessages);
  const [draft, setDraft] = useState("");
  const [isResponding, setIsResponding] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const replyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch (error) {
      console.error("Unable to load stored chat messages", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("Unable to persist chat messages", error);
    }
  }, [messages]);

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (el) {
      requestAnimationFrame(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      });
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) {
        clearTimeout(replyTimeoutRef.current);
      }
    };
  }, []);

  function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) {
      return;
    }

    const outgoing: Message = {
      id: generateId(),
      author: "self",
      sender: currentUserName,
      body: trimmed,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, outgoing]);
    setDraft("");
    setIsResponding(true);

    if (replyTimeoutRef.current) {
      clearTimeout(replyTimeoutRef.current);
    }

    replyTimeoutRef.current = setTimeout(() => {
      const autoReply: Message = {
        id: generateId(),
        author: "teammate",
        sender: "Community Bot",
        body: "Thanks for the update! We'll surface it in the daily digest and loop in the right folks.",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, autoReply]);
      setIsResponding(false);
    }, 1500);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,_1fr)_300px]">
      <section className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-xl">
        <header className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Signal Commons channel</h2>
            <p className="text-xs text-slate-300/80">Share progress, celebrate wins, and unblock teammates in real time.</p>
          </div>
          <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-medium text-emerald-200">
            {isResponding ? "Typing…" : `${messages.length} messages`}
          </span>
        </header>

        <div
          ref={scrollAreaRef}
          className="h-80 overflow-y-auto rounded-2xl border border-white/5 bg-black/30 p-4"
        >
          <ul className="space-y-4">
            {messages.map((message) => {
              const isSelf = message.author === "self";
              const bubbleStyles = isSelf
                ? "ml-auto bg-indigo-500/90 text-white"
                : message.author === "system"
                ? "mx-auto bg-white/10 text-indigo-100"
                : "mr-auto bg-white text-slate-900";

              const containerAlign = isSelf ? "items-end text-right" : "items-start";

              return (
                <li key={message.id} className={`flex flex-col ${containerAlign}`}>
                  <span className={`text-xs font-medium ${isSelf ? "text-indigo-200" : "text-slate-300"}`}>
                    {message.sender}
                  </span>
                  <div className={`mt-1 max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow ${bubbleStyles}`}>
                    <p className="whitespace-pre-line leading-relaxed">{message.body}</p>
                  </div>
                  <time className={`mt-1 text-[10px] uppercase tracking-wide text-slate-400 ${isSelf ? "self-end" : ""}`}>
                    {formatTimestamp(message.createdAt)}
                  </time>
                </li>
              );
            })}
          </ul>
        </div>

        <form onSubmit={handleSend} className="mt-4 space-y-3">
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={3}
            placeholder="Share an update, ask a question, or paste a link…"
            className="w-full resize-none rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] text-slate-400">
              Messages stay local to your browser during preview mode.
            </p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 disabled:opacity-70"
              disabled={!draft.trim()}
            >
              Send
            </button>
          </div>
        </form>
      </section>

      <aside className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-sm text-white/90">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-200">Channel roster</h3>
          <ul className="mt-3 space-y-2 text-slate-200">
            <li className="flex items-center justify-between">
              <span>Priya Narayanan</span>
              <span className="text-xs text-emerald-200">online</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Andre Lewis</span>
              <span className="text-xs text-emerald-200">online</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Camille Ortiz</span>
              <span className="text-xs text-slate-400">away</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Community Bot</span>
              <span className="text-xs text-emerald-200">listening</span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-slate-200/90">
          <h4 className="text-sm font-semibold text-white">Tips</h4>
          <ul className="mt-3 list-disc space-y-2 pl-4 text-xs text-slate-300/90">
            <li>Use @mentions to highlight teammates (coming soon).</li>
            <li>Attach files by dropping them directly into the composer.</li>
            <li>Enable notifications under settings to get desktop alerts.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
