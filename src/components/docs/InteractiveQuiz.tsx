"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Check, X, Award, HelpCircle, ArrowRight, RotateCcw } from "lucide-react";
import { MCQ } from "@/lib/types";

interface InteractiveQuizProps {
  topicSlug: string;
  mcqs: MCQ[];
  onSubmitScore?: (score: number, total: number) => void;
}

export function InteractiveQuiz({ topicSlug, mcqs, onSubmitScore }: InteractiveQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!mcqs || mcqs.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground border border-dashed rounded-xl">
        No quiz questions available for this topic.
      </div>
    );
  }

  const activeQuestion = mcqs[currentIdx];

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleSubmit = () => {
    if (selectedOpt === null || isSubmitted) return;
    setIsSubmitted(true);
    const correct = selectedOpt === activeQuestion.answerIndex;
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    const nextIdx = currentIdx + 1;
    if (nextIdx < mcqs.length) {
      setCurrentIdx(nextIdx);
      setSelectedOpt(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
      if (onSubmitScore) {
        onSubmitScore(score, mcqs.length);
      }
      
      // Trigger confetti if score is passing (e.g. >= 70%)
      const pct = (score / mcqs.length) * 100;
      if (pct >= 70) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-xl mx-auto my-8 border border-border rounded-2xl bg-card shadow-lg p-6 space-y-6">
      {/* Quiz Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center space-x-2 text-blue-500">
          <HelpCircle size={20} />
          <span className="font-bold text-foreground">Interactive Knowledge Check</span>
        </div>
        <div className="text-xs font-semibold bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
          Question {currentIdx + 1} of {mcqs.length}
        </div>
      </div>

      {!quizFinished ? (
        <div className="space-y-6">
          {/* Question Text */}
          <h3 className="text-base font-bold text-foreground leading-normal">
            {activeQuestion.question}
          </h3>

          {/* Options Grid */}
          <div className="space-y-3">
            {activeQuestion.options.map((option, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === activeQuestion.answerIndex;
              
              let optStyle = "border-border hover:bg-muted/50 text-foreground";
              if (isSelected && !isSubmitted) {
                optStyle = "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold";
              } else if (isSubmitted) {
                if (isCorrect) {
                  optStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold";
                } else if (isSelected && !isCorrect) {
                  optStyle = "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-400";
                } else {
                  optStyle = "border-border opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isSubmitted}
                  className={`w-full flex items-center justify-between p-3.5 border rounded-xl text-left text-sm transition-all duration-150 ${optStyle}`}
                >
                  <span>{option}</span>
                  {isSubmitted && isCorrect && <Check size={16} className="text-emerald-500" />}
                  {isSubmitted && isSelected && !isCorrect && <X size={16} className="text-rose-500" />}
                </button>
              );
            })}
          </div>

          {/* Action button */}
          <div className="flex justify-end pt-2">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOpt === null}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center space-x-1.5 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all"
              >
                <span>{currentIdx + 1 === mcqs.length ? "Finish Quiz" : "Next Question"}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>

          {/* Explanation Area */}
          {isSubmitted && (
            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-1.5 animate-in fade-in duration-200">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Explanation
              </div>
              <p className="text-xs text-foreground leading-normal font-medium">
                {activeQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Results Screen */
        <div className="text-center py-6 space-y-6">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
              <Award size={48} className="animate-bounce" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">Quiz Completed!</h3>
            <p className="text-sm text-muted-foreground">
              You scored <span className="font-bold text-foreground">{score}</span> out of <span className="font-bold text-foreground">{mcqs.length}</span> (
              {Math.round((score / mcqs.length) * 100)}%)
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-muted rounded-full h-3 max-w-xs mx-auto overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                (score / mcqs.length) >= 0.7 ? "bg-emerald-500" : "bg-amber-500"
              }`}
              style={{ width: `${(score / mcqs.length) * 100}%` }}
            />
          </div>

          <div className="pt-4 flex justify-center space-x-3">
            <button
              onClick={handleRestart}
              className="flex items-center space-x-1.5 px-5 py-2 border border-border bg-card hover:bg-muted text-sm font-semibold rounded-xl transition-all"
            >
              <RotateCcw size={16} />
              <span>Retry Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
