"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToSection } from "@/lib/scroll";

// ── Terminal typing animation ──────────────────────────────────────
type TermLine =
  | { type: "prompt"; command: string }
  | { type: "output"; lines: string[] }
  | { type: "output-grid"; items: string[] }
  | { type: "output-status"; icon: string; color: string; text: string }
  | { type: "idle" };

const SCRIPT: TermLine[] = [
  { type: "prompt", command: "ls services/" },
  {
    type: "output-grid",
    items: [
      "webDevelopment.ts",
      "mobileApp.tsx",
      "backendAPI.go",
      "devOpsCloud.yml",
    ],
  },
  { type: "prompt", command: "npm run deploy" },
  {
    type: "output-status",
    icon: "⚠",
    color: "text-yellow-500",
    text: "Building production bundle...",
  },
  {
    type: "output-status",
    icon: "✔",
    color: "text-brand",
    text: "Build successful.",
  },
  {
    type: "output-status",
    icon: "✔",
    color: "text-brand",
    text: "Deployed to edge network.",
  },
  { type: "prompt", command: "cat team.json" },
  {
    type: "output",
    lines: [
      '{',
      '  "founders": ["Muh. Nuril", "Bahrul Ilmi"],',
      '  "status": "open_for_projects",',
      '  "stack": "fullstack"',
      '}',
    ],
  },
  { type: "idle" },
];

const CHAR_DELAY = 18;   // ms per character (fast)
const LINE_PAUSE = 120;  // ms pause between output lines

function TerminalAnimation() {
  const [rendered, setRendered] = useState<React.ReactNode[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const cancelled = useRef(false);

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => {
      const id = setTimeout(resolve, ms);
      // if component unmounts, resolve immediately
      if (cancelled.current) {
        clearTimeout(id);
        resolve();
      }
    });

  const run = useCallback(async (runId: number) => {
    setRendered([]);

    for (const line of SCRIPT) {
      if (cancelled.current) return;

      if (line.type === "prompt") {
        // Type each character of the command
        const prefix = (
          <span className="text-brand" key="p">
            hoodtech@dev:~$
          </span>
        );
        let typed = "";
        for (const ch of line.command) {
          if (cancelled.current) return;
          typed += ch;
          const snap = typed; // capture
          const typingKey = `__typing_${line.command}`;
          setRendered((prev) => {
            const next = [...prev];
            // remove last "typing" line if exists then re-add
            if (next.length > 0 && (next[next.length - 1] as React.ReactElement)?.key === typingKey) {
              next.pop();
            }
            next.push(
              <div className="text-fg-primary" key={typingKey}>
                {prefix} {snap}
              </div>
            );
            return next;
          });
          await sleep(CHAR_DELAY);
        }
        // finalize: replace typing line with permanent one
        const final = typed;
        const typingKey = `__typing_${line.command}`;
        setRendered((prev) => {
          const next = [...prev];
          if (next.length > 0 && (next[next.length - 1] as React.ReactElement)?.key === typingKey) {
            next.pop();
          }
          next.push(
            <div className="text-fg-primary" key={`cmd-${final}-${runId}-${Date.now()}`}>
              {prefix} {final}
            </div>
          );
          return next;
        });
        await sleep(LINE_PAUSE);
      }

      if (line.type === "output-grid") {
        setRendered((prev) => [
          ...prev,
          <div
            className="grid grid-cols-2 gap-2 text-fg-muted"
            key={`grid-${runId}-${Date.now()}`}
          >
            {line.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>,
        ]);
        await sleep(LINE_PAUSE);
      }

      if (line.type === "output-status") {
        setRendered((prev) => [
          ...prev,
          <div className="text-fg-muted" key={`status-${runId}-${Date.now()}-${line.text}`}>
            <span className={line.color}>{line.icon}</span> {line.text}
          </div>,
        ]);
        await sleep(LINE_PAUSE * 2);
      }

      if (line.type === "output") {
        for (const l of line.lines) {
          if (cancelled.current) return;
          setRendered((prev) => [
            ...prev,
            <div className="text-fg-muted" key={`out-${runId}-${Date.now()}-${l}`}>
              {l}
            </div>,
          ]);
          await sleep(LINE_PAUSE * 0.6);
        }
        await sleep(LINE_PAUSE);
      }

      if (line.type === "idle") {
        // show blinking prompt
        setRendered((prev) => [
          ...prev,
          <div className="flex items-center gap-2 mt-1" key={`idle-prompt-${runId}`}>
            <span className="text-brand">hoodtech@dev:~$</span>
            <span className="w-2 h-4 bg-fg-primary animate-pulse" />
          </div>,
        ]);
      }
    }
  }, []);

  useEffect(() => {
    cancelled.current = false;
    let timeoutId: NodeJS.Timeout;
    let currentRunId = 0;

    const loop = async () => {
      if (cancelled.current) return;
      await run(currentRunId++);
      if (cancelled.current) return;
      
      // Wait for 5 seconds before restarting the animation
      timeoutId = setTimeout(() => {
        loop();
      }, 5000);
    };

    loop();

    return () => {
      cancelled.current = true;
      clearTimeout(timeoutId);
    };
  }, [run]);

  // cursor blink independent of animation
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="p-6 text-sm flex flex-col gap-1.5 h-[420px] font-mono overflow-hidden">
      {rendered}
    </div>
  );
}

// ── Hero Component ─────────────────────────────────────────────────
export default function Hero() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="pt-32 pb-20 px-6 min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-6"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 border border-brand/30 bg-brand/5 px-3 py-1 rounded-full text-brand text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            STATUS: AVAILABLE_FOR_PROJECTS
          </motion.div>

          <motion.div variants={itemVariants} className="text-5xl md:text-6xl font-bold leading-tight">
            <h1 className="text-fg-primary">{t("hero_title_1")}</h1>
            <h1 className="text-fg-muted">{t("hero_title_2")}</h1>
            <h1 className="text-fg-muted">{t("hero_title_3")}</h1>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="inline-flex h-12 items-center justify-center bg-brand text-bg-primary px-6 font-bold hover:bg-brand-dark transition-colors cursor-pointer"
            >
              $ start-a-project <ChevronRight className="ml-2 w-4 h-4" />
            </a>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("work");
              }}
              className="inline-flex h-12 items-center justify-center border border-border-subtle bg-bg-secondary px-6 text-fg-primary hover:border-brand/50 transition-colors cursor-pointer"
            >
              view ./portfolio
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Terminal Window */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="hidden lg:block w-full border border-border-subtle rounded-lg overflow-hidden bg-bg-secondary shadow-2xl"
        >
          {/* Terminal Header */}
          <div className="h-10 bg-bg-primary border-b border-border-subtle flex items-center px-4 justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="text-xs text-fg-muted">hoodtech - zsh - 96x26</div>
            <div className="w-10" />
          </div>

          {/* Animated Terminal Body */}
          <TerminalAnimation />
        </motion.div>
      </div>
    </section>
  );
}
