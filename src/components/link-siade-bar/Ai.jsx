// src/pages/ai.jsx
import React, { useEffect, useRef, useState } from "react";

const AiPage = ({ apiUrl = "" }) => {
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", content: "Hi! How can I help you today? 😊", ts: Date.now() },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listRef = useRef(null);
  const textareaRef = useRef(null);

  // اسكرول تلقائي لآخر رسالة
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // تكبير/تصغير ارتفاع التيكست إريا مع الكتابة
  const autoGrow = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px"; // حد أقصى 160px
  };
  useEffect(() => { autoGrow(); }, [input]);

  // Mock للرد لو مفيش API
  const sendToMock = async (text) => {
    await new Promise((r) => setTimeout(r, 600));
    return `You said: "${text}". Here's a helpful tip: stay hydrated and get enough sleep 😄`;
  };

  // استدعاء الـ API الحقيقي (لو وفّرت عنوانه)
  const sendToApi = async (text) => {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    if (!res.ok) throw new Error("AI API error");
    const data = await res.json();
    // اتفق مع الباك: يرجّع { reply: "..." }
    return data.reply ?? "";
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    // ضيف رسالة المستخدم
    const userMsg = { id: Date.now(), role: "user", content: text, ts: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    autoGrow();
    setLoading(true);

    try {
      const reply = apiUrl ? await sendToApi(text) : await sendToMock(text);
      const aiMsg = { id: Date.now() + 1, role: "assistant", content: reply || "…", ts: Date.now() };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
      const errMsg = { id: Date.now() + 2, role: "assistant", content: "Sorry, something went wrong.", ts: Date.now() };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="relative -mx-4 sm:-m-6 p-0 sm:p-0 min-h-[calc(100vh-0px)] overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f0fdf4, #e6f7ef, #f8fdfb)" }}
    >
      {/* منطقة الرسائل */}
      <div
        ref={listRef}
        className="h-[calc(100vh-220px)] sm:h-[calc(100vh-240px)] overflow-y-auto p-4 sm:p-6 space-y-4"
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} role={m.role} text={m.content} />
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <Avatar role="assistant" />
            <div className="rounded-2xl rounded-tl-none bg-white border border-emerald-200 shadow-sm px-4 py-3">
              <span className="inline-flex gap-1">
                <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* شريط الإدخال (ثابت أسفل) */}
      <div className="sticky bottom-0 w-full bg-white/80 backdrop-blur border-t border-emerald-200 p-3 sm:p-4">
        <div className="mx-3 sm:mx-6 rounded-2xl border border-emerald-200 bg-white shadow-sm p-2 sm:p-3">
          <div className="flex items-end gap-2">
            <button
              type="button"
              className="hidden sm:inline-flex items-center justify-center h-10 w-10 rounded-xl border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition"
              title="Attach (UI فقط)"
            >
              <i className="bi bi-paperclip" />
            </button>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type your message…"
              rows={1}
              className="flex-1 resize-none outline-none bg-transparent px-2 py-2 text-gray-800 placeholder:text-gray-400"
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold
                          bg-gradient-to-r from-emerald-500 to-emerald-600 text-white
                          shadow-sm transition-all duration-300
                          hover:shadow-lg hover:-translate-y-0.5 active:scale-95
                          focus:outline-none focus:ring-2 focus:ring-emerald-400
                          ${loading || !input.trim() ? "opacity-60 cursor-not-allowed hover:translate-y-0 hover:shadow-none" : ""}`}
            >
              <i className="bi bi-send" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </div>

        <p className="mt-2 text-center text-xs text-gray-500">
          Press <kbd className="px-1.5 py-0.5 rounded border">Enter</kbd> to send —{" "}
          <kbd className="px-1.5 py-0.5 rounded border">Shift</kbd>+
          <kbd className="px-1.5 py-0.5 rounded border">Enter</kbd> for a new line.
        </p>
      </div>
    </div>
  );
};

/* ===== مكوّنات فرعية ===== */

const Avatar = ({ role }) => (
  <span
    className={`inline-flex h-9 w-9 items-center justify-center rounded-full border ${
      role === "assistant"
        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
        : "bg-gray-50 border-gray-200 text-gray-700"
    }`}
  >
    <i className={`bi ${role === "assistant" ? "bi-robot" : "bi-person-circle"}`} />
  </span>
);

const MessageBubble = ({ role, text }) => {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex items-start gap-3 max-w-[88%] ${isUser ? "flex-row-reverse" : ""}`}>
        <Avatar role={role} />
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm transform-gpu transition
            ${
              isUser
                ? "rounded-tr-none bg-emerald-600 text-white hover:brightness-105"
                : "rounded-tl-none bg-white text-gray-900 border border-emerald-200 hover:shadow-md"
            }`}
        >
          <p className="whitespace-pre-wrap leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
};

const Dot = ({ delay = "0ms" }) => (
  <span
    className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-bounce"
    style={{ animationDelay: delay }}
  />
);

export default AiPage;
