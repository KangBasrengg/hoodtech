"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, X, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type OutputLine = {
  type: "system" | "user" | "response" | "error" | "ascii";
  content: React.ReactNode;
};

export default function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<OutputLine[]>([]);
  const [isBooting, setIsBooting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && history.length === 0) {
      setIsBooting(true);
      // Simulate Boot Sequence
      const bootSequence = [
        "Initializing Hoodtech OS kernel...",
        "Loading core modules... [OK]",
        "Mounting file systems... [OK]",
        "Starting network interface... [OK]",
        "Welcome to Hoodtech OS v1.0.0. Type 'help' to get started.",
      ];

      let i = 0;
      const interval = setInterval(() => {
        if (i < bootSequence.length) {
          setHistory(prev => [...prev, { type: "system", content: bootSequence[i] }]);
          i++;
        } else {
          clearInterval(interval);
          setIsBooting(false);
          inputRef.current?.focus();
        }
      }, 300);
      return () => clearInterval(interval);
    } else if (isOpen && !isBooting) {
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

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (trimmed === "exit") {
      setIsOpen(false);
      setInput("");
      return;
    }

    if (trimmed === "") {
      setInput("");
      return;
    }

    let response: React.ReactNode = "";
    let type: "response" | "ascii" | "error" = "response";

    switch (trimmed) {
      case "help":
        response = (
          <div className="flex flex-col gap-1 text-fg-muted mt-1">
            <div><span className="text-brand font-bold">whoami</span>     - Tampilkan identitas Anda</div>
            <div><span className="text-brand font-bold">skills</span>     - Tampilkan tech stack utama kami</div>
            <div><span className="text-brand font-bold">neofetch</span>   - Tampilkan informasi sistem</div>
            <div><span className="text-brand font-bold">sudo hire</span>  - Mulai project baru bersama kami</div>
            <div><span className="text-brand font-bold">clear</span>      - Bersihkan terminal</div>
            <div><span className="text-brand font-bold">exit</span>       - Tutup terminal</div>
          </div>
        );
        break;
      case "whoami":
        response = "You are a visionary ready to scale your business. Type 'sudo hire' to begin.";
        break;
      case "skills":
        response = (
          <div className="mt-1">
            <div className="text-brand">Frontend:</div><div className="text-fg-muted">React, Next.js, Vue, Tailwind CSS</div>
            <div className="text-brand mt-1">Backend:</div><div className="text-fg-muted">Node.js, Express, Go, Python</div>
            <div className="text-brand mt-1">Infra/Ops:</div><div className="text-fg-muted">AWS, Docker, Linux, CI/CD</div>
          </div>
        );
        break;
      case "neofetch":
      case "about":
        type = "ascii";
        response = (
          <div className="flex flex-col md:flex-row gap-4 mt-2 mb-2">
            <pre className="text-brand font-mono text-[10px] sm:text-[11px] leading-tight font-bold">
              {` _   _                 _ _            _     
| | | |               | | |          | |    
| |_| | ___   ___   __| | |_ ___  ___| |__  
|  _  |/ _ \\ / _ \\ / _\` | __/ _ \\/ __| '_ \\ 
| | | | (_) | (_) | (_| | ||  __/ (__| | | |
\\_| |_/\\___/ \\___/ \\__,_|\\__\\___|\\___|_| |_|`}
            </pre>
            <div className="flex flex-col text-sm text-fg-muted">
              <div><span className="text-brand font-bold">OS</span>: Hoodtech Web OS v1.0</div>
              <div><span className="text-brand font-bold">Host</span>: Next.js Vercel Edge</div>
              <div><span className="text-brand font-bold">Kernel</span>: React 18.x</div>
              <div><span className="text-brand font-bold">Uptime</span>: 99.99%</div>
              <div><span className="text-brand font-bold">Packages</span>: 142 (npm)</div>
              <div><span className="text-brand font-bold">Shell</span>: zsh 5.8</div>
              <div><span className="text-brand font-bold">Memory</span>: ∞ / Unlimited</div>
            </div>
          </div>
        );
        break;
      case "sudo hire":
      case "sudo hire hoodtech":
        response = (
          <div className="text-brand mt-1">
            [+] Initiating strategic partnership protocol...<br />
            [+] Access granted.<br />
            [!] Redirecting to WhatsApp securely...
          </div>
        );
        // Execute the redirect slightly after rendering
        setTimeout(() => {
          window.open("https://wa.me/6281227285146?text=Halo%20Hoodtech!%20Saya%20tertarik%20untuk%20memulai%20project%20bersama%20Anda.", "_blank");
        }, 1000);
        break;
      default:
        type = "error";
        response = `bash: ${cmd}: command not found. Type 'help' for available commands.`;
        break;
    }

    // Simulate slight delay for processing
    setTimeout(() => {
      setHistory((prev) => [...prev, { type, content: response }]);
    }, 150);
    setInput("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBooting) {
      handleCommand(input);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px 5px rgba(0,255,102,0.3)" }}
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
            className={`fixed ${isMaximized ? "inset-4 z-50" : "bottom-6 right-6 z-50 w-[90vw] max-w-[600px] h-[450px]"} border border-brand/30 bg-[#0a0a0a]/95 backdrop-blur-md rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,255,102,0.15)] flex flex-col font-mono text-sm`}
          >
            {/* Header */}
            <div className="h-10 bg-black/50 border-b border-brand/20 flex items-center justify-between px-4 cursor-default select-none">
              <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center group transition-colors">
                  <X size={8} className="opacity-0 group-hover:opacity-100 text-red-900" />
                </button>
                <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 flex items-center justify-center group transition-colors">
                  <Minimize2 size={8} className="opacity-0 group-hover:opacity-100 text-yellow-900" />
                </button>
                <button onClick={() => setIsMaximized(!isMaximized)} className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 flex items-center justify-center group transition-colors">
                  <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-green-900" />
                </button>
              </div>
              <div className="text-xs text-brand/70 font-semibold tracking-wider">hoodtech-cli.sh</div>
              <div className="w-10" />
            </div>

            {/* Body */}
            <div
              className="flex-1 p-4 overflow-y-auto glow-brand-text [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-brand/20 [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-brand/40"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="flex flex-col gap-1.5">
                {history.map((line, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    key={i}
                    className={`${line.type === 'system' ? 'text-fg-muted whitespace-pre-wrap' :
                      line.type === 'error' ? 'text-red-400' :
                        line.type === 'user' ? 'text-white font-semibold mt-2' :
                          line.type === 'ascii' ? 'text-brand' : 'text-fg-muted'
                      }`}
                  >
                    {line.content}
                  </motion.div>
                ))}
              </div>

              {/* Input Line */}
              {!isBooting && (
                <form onSubmit={onSubmit} className="flex items-center gap-2 mt-2">
                  <span className="text-brand font-bold shrink-0">hoodtech@dev:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white shadow-none focus:ring-0 p-0 caret-brand"
                    autoComplete="off"
                    spellCheck="false"
                  />
                </form>
              )}
              <div ref={bottomRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
