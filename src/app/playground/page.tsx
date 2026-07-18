"use client";

import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Terminal, Code2, Sparkles, Copy, Check } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatWidget } from "@/components/ai/ChatWidget";

type FileTab = "html" | "css" | "js";

const TEMPLATES = {
  counter: {
    html: `<div class="card">
  <h2>Interactive Counter</h2>
  <p id="counter">0</p>
  <button id="btn">Increment</button>
</div>`,
    css: `body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0f172a;
  color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  margin: 0;
}
.card {
  background: #1e293b;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  text-align: center;
  border: 1px solid #334155;
  width: 250px;
}
h2 {
  font-size: 1.25rem;
  margin-top: 0;
}
p {
  font-size: 3rem;
  font-weight: bold;
  margin: 1rem 0;
  color: #3b82f6;
}
button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: opacity 0.2s;
}
button:hover {
  opacity: 0.9;
}`,
    js: `const btn = document.getElementById('btn');
const counter = document.getElementById('counter');
let count = 0;

btn.addEventListener('click', () => {
  count++;
  counter.textContent = count;
});`
  },
  card: {
    html: `<div class="glass-card">
  <div class="glow"></div>
  <h3>Tech World Academy</h3>
  <p>Learn coding concepts interactively with line-by-line documentation, quizzes, and live play sandboxes.</p>
  <span class="badge">Aesthetics Level Max</span>
</div>`,
    css: `body {
  font-family: system-ui, sans-serif;
  background: radial-gradient(circle at center, #1e1b4b, #090514);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  margin: 0;
}
.glass-card {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 1.5rem;
  width: 300px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #e2e8f0;
}
.glow {
  position: absolute;
  top: -20%;
  left: -20%;
  width: 140%;
  height: 140%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 60%);
  pointer-events: none;
}
h3 {
  margin-top: 0;
  font-size: 1.5rem;
  background: linear-gradient(to right, #60a5fa, #a5b4fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
p {
  font-size: 0.875rem;
  line-height: 1.6;
  color: #94a3b8;
}
.badge {
  display: inline-block;
  background: rgba(99, 102, 241, 0.2);
  color: #a5b4fc;
  border: 1px solid rgba(99, 102, 241, 0.3);
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-weight: bold;
}`,
    js: `console.log("Interactive card loaded!");`
  }
};

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<FileTab>("html");
  const [html, setHtml] = useState(TEMPLATES.counter.html);
  const [css, setCss] = useState(TEMPLATES.counter.css);
  const [js, setJs] = useState(TEMPLATES.counter.js);
  const [srcDoc, setSrcDoc] = useState("");
  const [copied, setCopied] = useState(false);

  // Trigger compilation on run click
  const runCode = () => {
    const compiled = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>
            try {
              ${js}
            } catch (err) {
              console.error(err);
              document.body.innerHTML += '<div style="color: #ef4444; padding: 1rem; border: 1px dashed #ef4444; font-family: monospace; font-size: 12px; margin-top: 1rem;"><strong>Runtime Error:</strong> ' + err.message + '</div>';
            }
          </script>
        </body>
      </html>
    `;
    setSrcDoc(compiled);
  };

  // Compile initially on mount
  useEffect(() => {
    runCode();
  }, []);

  const loadTemplate = (name: keyof typeof TEMPLATES) => {
    setHtml(TEMPLATES[name].html);
    setCss(TEMPLATES[name].css);
    setJs(TEMPLATES[name].js);
    
    // Auto compile template
    const compiled = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <style>${TEMPLATES[name].css}</style>
        </head>
        <body>
          ${TEMPLATES[name].html}
          <script>${TEMPLATES[name].js}</script>
        </body>
      </html>
    `;
    setSrcDoc(compiled);
  };

  const resetCode = () => {
    setHtml("");
    setCss("");
    setJs("");
    setSrcDoc("");
  };

  const copyCurrentCode = async () => {
    const textToCopy = activeTab === "html" ? html : activeTab === "css" ? css : js;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 flex flex-col bg-background h-[calc(100vh-4rem)] sticky top-16">
          {/* Toolbar Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-muted/20">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                <Code2 size={16} />
              </div>
              <div>
                <h1 className="text-sm font-bold text-foreground">Client Code Sandbox</h1>
                <p className="text-[10px] text-muted-foreground">HTML5 / CSS3 / JavaScript Runtime Environment</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => loadTemplate("counter")}
                className="px-3 py-1.5 border border-border bg-card hover:bg-muted text-xs font-semibold rounded-lg text-muted-foreground hover:text-foreground transition-all"
              >
                Counter App
              </button>
              <button
                onClick={() => loadTemplate("card")}
                className="px-3 py-1.5 border border-border bg-card hover:bg-muted text-xs font-semibold rounded-lg text-muted-foreground hover:text-foreground transition-all"
              >
                Glass Card
              </button>
              <span className="h-4 w-px bg-border mx-1" />
              <button
                onClick={resetCode}
                className="p-1.5 border border-border bg-card hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-all"
                title="Reset Playground"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={runCode}
                className="flex items-center space-x-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow shadow-blue-500/10 transition-all"
              >
                <Play size={12} className="fill-current" />
                <span>Run Code</span>
              </button>
            </div>
          </div>

          {/* Sandbox Split Screen */}
          <div className="flex-1 grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 overflow-hidden">
            
            {/* Left Panel: Editor Workspace */}
            <div className="border-b lg:border-b-0 lg:border-r border-border flex flex-col overflow-hidden bg-slate-950 text-slate-100">
              {/* Tab Navigation */}
              <div className="flex items-center justify-between border-b border-slate-900 bg-slate-950 px-4 py-1">
                <div className="flex items-center space-x-1">
                  {(["html", "css", "js"] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                        activeTab === tab
                          ? "bg-slate-900 text-blue-400 font-bold border-b border-blue-500"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button
                  onClick={copyCurrentCode}
                  className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
                  title="Copy current tab code"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Textarea Workspace */}
              <div className="flex-1 relative font-mono text-xs leading-relaxed p-4">
                {activeTab === "html" && (
                  <textarea
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                    className="absolute inset-0 w-full h-full bg-slate-950 p-4 border-0 focus:ring-0 resize-none font-mono text-xs text-slate-200 outline-none"
                    placeholder="<!-- Write HTML here -->"
                  />
                )}
                {activeTab === "css" && (
                  <textarea
                    value={css}
                    onChange={(e) => setCss(e.target.value)}
                    className="absolute inset-0 w-full h-full bg-slate-950 p-4 border-0 focus:ring-0 resize-none font-mono text-xs text-slate-200 outline-none"
                    placeholder="/* Write CSS here */"
                  />
                )}
                {activeTab === "js" && (
                  <textarea
                    value={js}
                    onChange={(e) => setJs(e.target.value)}
                    className="absolute inset-0 w-full h-full bg-slate-950 p-4 border-0 focus:ring-0 resize-none font-mono text-xs text-slate-200 outline-none"
                    placeholder="// Write JavaScript code here"
                  />
                )}
              </div>
            </div>

            {/* Right Panel: sandboxed Output Frame */}
            <div className="flex flex-col bg-slate-900 overflow-hidden">
              <div className="flex items-center justify-between border-b border-border bg-card px-4 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                <span>Output Screen</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="flex-1 bg-white">
                {srcDoc ? (
                  <iframe
                    srcDoc={srcDoc}
                    title="Code Sandbox Runner"
                    sandbox="allow-scripts"
                    className="w-full h-full border-0 bg-white"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-900 p-8 text-center space-y-3">
                    <Terminal size={32} className="text-slate-600 animate-pulse" />
                    <div>
                      <p className="text-sm font-bold text-slate-300">Sandbox Empty</p>
                      <p className="text-xs text-slate-500 mt-1 max-w-[200px] mx-auto">Click 'Run Code' or select a template to inspect output.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <ChatWidget activeTopic="Code Sandbox" />
    </div>
  );
}
