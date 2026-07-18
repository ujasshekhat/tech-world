"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  explanation?: string[];
}

export function CodeBlock({ code, language, explanation }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div className="my-6 rounded-xl border border-border bg-slate-900 shadow-xl overflow-hidden text-slate-100">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-950">
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
          <Terminal size={14} className="text-blue-400" />
          <span className="uppercase">{language}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all duration-150"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-slate-800">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                <td className="w-8 pr-4 text-right text-slate-600 select-none border-r border-slate-800 text-xs">
                  {idx + 1}
                </td>
                <td className="pl-4 whitespace-pre">
                  {line || " "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Explanations */}
      {explanation && explanation.length > 0 && (
        <div className="border-t border-slate-800 bg-slate-950/50 p-4 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Line-by-Line Execution Guide
          </div>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
            {explanation.map((exp, idx) => (
              <li key={idx} className="leading-normal">
                {exp}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
