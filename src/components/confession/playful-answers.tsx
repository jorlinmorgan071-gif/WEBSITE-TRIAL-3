'use client';

import { useState, type ReactNode } from 'react';

interface PlayfulAnswersProps {
  /** the Yes control (always reachable, never moves) */
  yes: ReactNode;
  /** what a (playfully dodged) No eventually offers — proceeds, never a real answer */
  onProceed: () => void;
  /** visible, keyboard-accessible fallback, shown after the first dodge and kept */
  fallbackLabel: string;
  /** small lighthearted line shown after the first dodge */
  hint: string;
  /** the No button label */
  noLabel: string;
}

/**
 * The playful No — a lighthearted dodge, never a trap (build brief §2/§6-D):
 *  - the Yes button is always available and never moves;
 *  - after the very first dodge an accessible fallback appears and stays;
 *  - the No button stays focusable and keyboard-operable at all times;
 *  - NEVER use this for the final question (Q3) — both answers there are real.
 */
export function PlayfulAnswers({ yes, onProceed, fallbackLabel, hint, noLabel }: PlayfulAnswersProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dodges, setDodges] = useState(0);

  function dodgeNoButton() {
    const maxX = Math.min(110, window.innerWidth * 0.22);
    const maxY = 70;
    setPos({
      x: (Math.random() * 2 - 1) * maxX,
      y: (Math.random() * 2 - 1) * maxY,
    });
    setDodges((d) => d + 1);
  }

  return (
    <div className="answers">
      <div className="answer-row">
        {yes}
        <span className="no-slot">
          <button
            type="button"
            className="btn btn-ghost no-dodge"
            onPointerEnter={dodgeNoButton}
            onPointerDown={dodgeNoButton}
            onClick={dodgeNoButton}
            style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
            aria-describedby="playful-no-note"
          >
            {noLabel}
          </button>
          <span id="playful-no-note" className="sr-only">
            This No button likes to wander — it is only playful. The Yes button never moves, and a
            skip button appears below after the first dodge.
          </span>
        </span>
      </div>
      {dodges > 0 && (
        <div className="answer-fallback">
          <p className="playful-hint" aria-live="polite">
            {hint}
          </p>
          <button type="button" className="btn btn-quiet" onClick={onProceed}>
            {fallbackLabel}
          </button>
        </div>
      )}
    </div>
  );
}
