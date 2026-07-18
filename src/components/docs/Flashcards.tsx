"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCw, Layers } from "lucide-react";
import { Flashcard } from "@/lib/types";

interface FlashcardsProps {
  cards: Flashcard[];
}

export function Flashcards({ cards }: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!cards || cards.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground border border-dashed rounded-xl">
        No flashcards available for this topic.
      </div>
    );
  }

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const activeCard = cards[currentIndex];

  return (
    <div className="max-w-md mx-auto my-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm font-semibold text-blue-500">
          <Layers size={18} />
          <span>Active Recall Flashcards</span>
        </div>
        <div className="text-xs text-muted-foreground font-medium">
          Card {currentIndex + 1} of {cards.length}
        </div>
      </div>

      {/* Card Container (3D Flip Effect) */}
      <div
        className="h-64 w-full cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: "1000px" }}
      >
        <div
          className={`relative h-full w-full rounded-2xl border border-border transition-all duration-500 transform-gpu shadow-lg ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front of Card */}
          <div
            className="absolute inset-0 h-full w-full rounded-2xl bg-card p-6 flex flex-col justify-between"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Question
            </div>
            <div className="text-lg font-bold text-foreground text-center py-4 leading-relaxed">
              {activeCard.front}
            </div>
            <div className="flex items-center justify-center space-x-1.5 text-xs text-blue-500 font-medium">
              <RefreshCw size={12} className="animate-spin-slow" />
              <span>Click to reveal answer</span>
            </div>
          </div>

          {/* Back of Card */}
          <div
            className="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 flex flex-col justify-between text-white rotate-y-180"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="text-xs font-bold text-blue-100 uppercase tracking-widest">
              Correct Answer
            </div>
            <div className="text-base font-semibold text-center py-4 leading-relaxed">
              {activeCard.back}
            </div>
            <div className="flex items-center justify-center space-x-1.5 text-xs text-blue-200 font-medium">
              <RefreshCw size={12} />
              <span>Click to flip back</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="flex items-center space-x-1 px-4 py-2 rounded-xl border border-border bg-card hover:bg-muted text-sm font-semibold transition-all"
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>
        <button
          onClick={handleNext}
          className="flex items-center space-x-1 px-4 py-2 rounded-xl border border-border bg-card hover:bg-muted text-sm font-semibold transition-all"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Tailwind specific custom styles for rotate-y */}
      <style jsx global>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
