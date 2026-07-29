"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, X, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type OutputLine = {
  type: "system" | "user" | "response" | "error";
  content: React.ReactNode;
};

export default function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<OutputLine[]>([
    {
      type: "system",
      content: "Welcome to Hoodtech OS v1.0.0.\nType 'help' for a list of available commands.",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    // Add user input to history
    setHistory((prev) => [...prev, { type: "user", content: `hoodtech@dev:~$ ${cmd}` }]);

    let response: React.ReactNode = "";

    switch (trimmed) {
      case "help":
        response = (
          <div className="flex flex-col gap-1 text-fg-muted">
            <div><span className="text-brand">whoami</span> - Tampilkan identitas Anda</div>
            <div><span className="text-brand">skills</span> - Tampilkan tech stack utama kami</div>
            <div><span className="text-brand">sudo hire hoodtech</span> - Mulai project baru</div>
            <div><span className="text-brand">clear</span> - Bersihkan terminal</div>
            <div><span className="text-brand">exit</span> - Tutup terminal</div>
          </div>
        );
        break;
      case "whoami":
        response = "You are a future client of Hoodtech. Ready to scale your business? Type 'sudo hire hoodtech'.";
        break;
      case "skills":
        response = "React, Next.js, Vue, Node.js, Go, Python, AWS, Docker, AI Integration.";
        break;
      case "sudo hire hoodtech":
        response = (
          <div className="text-brand">
            [OK] Inisiasi proyek baru...<br />
            [OK] Silakan gulir ke bagian 'Mulai proyek bersama kami' atau hubungi muhammadnuril155@gmail.com
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "exit":
        setIsOpen(false);
        setInput("");
        return;
      case "":
        setInput("");
        return;
      default:
        setHistory((prev) => [
          ...prev,
          { type: "error", content: `bash: ${cmd}: command not found` },
        ]);
        setInput("");
        return;
    }

    setHistory((prev) => [...prev, { type: "response", content: response }]);
    setInput("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand text-bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-brand/20 transition-all ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Open Terminal"
      >
        <Terminal size={24} />
      </motion.button>

      {/* Terminal Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-[500px] h-[400px] border border-border-subtle bg-bg-primary rounded-lg overflow-hidden shadow-2xl flex flex-col font-mono text-sm"
          >
            {/* Header */}
            <div className="h-10 bg-bg-secondary border-b border-border-subtle flex items-center justify-between px-4 cursor-default">
              <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center group">
                  <X size={8} className="opacity-0 group-hover:opacity-100 text-red-900" />
                </button>
                <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 flex items-center justify-center group">
                  <Minimize2 size={8} className="opacity-0 group-hover:opacity-100 text-yellow-900" />
                </button>
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-xs text-fg-muted">interactive-cli.sh</div>
              <div className="w-10" />
            </div>

            {/* Body */}
            <div className="flex-1 p-4 overflow-y-auto" onClick={() => inputRef.current?.focus()}>
              <div className="flex flex-col gap-2">
                {history.map((line, i) => (
                  <div
                    key={i}
                    className={`${line.type === 'system' ? 'text-fg-muted whitespace-pre-wrap' :
                        line.type === 'error' ? 'text-red-400' :
                          line.type === 'user' ? 'text-fg-primary' : 'text-fg-muted'
                      }`}
                  >
                    {line.content}
                  </div>
                ))}
              </div>

              {/* Input Line */}
              <form onSubmit={onSubmit} className="flex items-center gap-2 mt-2">
                <span className="text-brand shrink-0">hoodtech@dev:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-fg-primary shadow-none focus:ring-0 p-0"
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
