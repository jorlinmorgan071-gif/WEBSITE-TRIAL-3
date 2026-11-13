'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { content } from '@/lib/content';
import { PlayfulAnswers } from './playful-answers';
import { Celebration } from './celebration';

/* ── shared scene wrapper ───────────────────────────────────────────────
   Full-viewport section, programmatic focus on mount so keyboard users
   land inside the new scene; heading referenced by aria-labelledby.        */
function SceneSection({
  headingId,
  bg,
  className = '',
  children,
}: {
  headingId: string;
  bg: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section
      ref={ref}
      tabIndex={-1}
      aria-labelledby={headingId}
      className={`scene ${bg}${className ? ` ${className}` : ''}`}
    >
      {children}
    </section>
  );
}

/* ── 1 · opening ─────────────────────────────────────────────────────── */
export function OpeningScene({ onOpen }: { onOpen: () => void }) {
  const c = content.opening;
  return (
    <SceneSection headingId="opening-title" bg="bg-hero">
      <div className="opening-stack">
        <p className="eyebrow">{c.overline}</p>
        <h1 id="opening-title" className="display display-xl">
          {c.title}
        </h1>
        <p className="subtitle">{c.subtitle}</p>
        <button type="button" className="btn btn-primary" onClick={onOpen}>
          {c.cta}
        </button>
        <p className="privacy-note">
          A quiet corner of the internet made by {content.sender} — not a feed, not a public
          place, nothing shared anywhere else.
        </p>
      </div>
    </SceneSection>
  );
}

/* ── 2 · locket interstitial (auto-advances, cinematic beat) ─────────── */
export function LocketScene({ onDone }: { onDone: () => void }) {
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const t = window.setTimeout(() => onDoneRef.current(), 2600);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <SceneSection headingId="locket-title" bg="bg-locket">
      <h2 id="locket-title" className="sr-only">
        {content.interstitial.srLabel}
      </h2>
      <div className="bloom" aria-hidden="true" />
      <p className="interstitial-caption" aria-hidden="true">
        {content.interstitial.caption}
      </p>
    </SceneSection>
  );
}

/* ── 3 · questions 1 & 2 (playful No, accessible fallback) ────────────── */
export function QuestionScene({
  index,
  onYes,
  onProceed,
}: {
  index: 0 | 1;
  onYes: () => void;
  onProceed: () => void;
}) {
  const q = content.questions[index];
  const headingId = `q${index + 1}-title`;

  return (
    <SceneSection headingId={headingId} bg="bg-question">
      {index === 1 && <Heart className="heart-mark heart-lead" aria-hidden="true" />}
      <div className="card-soft question-card">
        <p className="eyebrow">question {index + 1} of 3</p>
        <h2 id={headingId} className="display display-md">
          {q.text}
        </h2>
        <PlayfulAnswers
          yes={
            <button type="button" className="btn btn-primary" onClick={onYes}>
              {q.yesLabel}
            </button>
          }
          noLabel={q.noLabel}
          onProceed={onProceed}
          fallbackLabel={q.fallbackLabel}
          hint={q.playfulHint}
        />
      </div>
    </SceneSection>
  );
}

/* ── 4 · the final question — honest, still, equally answerable ──────── */
export function FinalQuestionScene({ onAnswer }: { onAnswer: (answer: 'yes' | 'no') => void }) {
  const q = content.finalQuestion;
  return (
    <SceneSection headingId="q3-title" bg="bg-question">
      <div className="card-soft question-card">
        <p className="eyebrow">question 3 of 3</p>
        <h2 id="q3-title" className="display display-md">
          {q.text}
        </h2>
        <p className="q-note">{q.note}</p>
        <div className="answers">
          <div className="answer-row" role="group" aria-label="Your answer — both choices count equally">
            <button type="button" className="btn btn-primary" onClick={() => onAnswer('yes')}>
              {q.yesLabel}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => onAnswer('no')}>
              {q.noLabel}
            </button>
          </div>
        </div>
      </div>
    </SceneSection>
  );
}

/* ── 5a · yes ending — letter, optional gallery, restrained joy ──────── */
function GalleryBlock() {
  const g = content.gallery;
  return (
    <section className="gallery" aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="display display-sm">
        {g.heading}
      </h2>
      <p className="gallery-note">{g.note}</p>
      <ul className="memory-grid">
        {g.items.map((item) => (
          <li key={item.src} className={`memory${item.placeholder ? ' is-placeholder' : ''}`}>
            <span className="memory-frame">
              <Image
                src={item.src}
                alt={item.alt}
                width={864}
                height={1152}
                loading="lazy"
                sizes="(max-width: 560px) 45vw, 260px"
              />
              {item.placeholder && (
                <span className="slot-ribbon" aria-hidden="true">
                  photo slot
                </span>
              )}
            </span>
            {item.caption && <p className="memory-caption">{item.caption}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function YesFinale({ onReplay }: { onReplay: () => void }) {
  const letter = content.letter;
  return (
    <SceneSection headingId="letter-title" bg="bg-finale">
      <Celebration />
      <div className="finale-stack">
        <article className="card-soft letter-card">
          <Image
            src="/assets/love-letter-stilllife.webp"
            alt=""
            width={864}
            height={1152}
            priority
            sizes="190px"
            className="letter-photo"
            aria-hidden="true"
          />
          <p className="eyebrow">
            {letter.overline} {content.recipient}
          </p>
          <h2 id="letter-title" className="display display-md">
            {letter.title}
          </h2>
          <p className="letter-body">{letter.body}</p>
          {letter.closing && <p className="q-note">{letter.closing}</p>}
          <p className="letter-signature">
            <Heart className="heart-mark" aria-hidden="true" />
            {letter.signature}
          </p>
        </article>
        {content.gallery.enabled && <GalleryBlock />}
        <div className="finale-actions">
          <button type="button" className="btn btn-quiet" onClick={onReplay}>
            Read it again
          </button>
        </div>
      </div>
    </SceneSection>
  );
}

/* ── 5b · no ending — kind, calm, final ───────────────────────────────── */
export function NoFinale({ onClose }: { onClose: () => void }) {
  const e = content.noEnding;
  return (
    <SceneSection headingId="no-title" bg="bg-question">
      <div className="card-soft quiet-card">
        <p className="eyebrow">with thanks</p>
        <h2 id="no-title" className="display display-sm">
          Thank you, {content.recipient}.
        </h2>
        <p className="letter-body">{e.body}</p>
        <p className="letter-signature">{e.signature}</p>
        <div className="finale-actions">
          <button type="button" className="btn btn-quiet" onClick={onClose}>
            Close this letter
          </button>
        </div>
      </div>
    </SceneSection>
  );
}

/* ── 6 · closed — the quiet end ────────────────────────────────────────── */
export function ClosedScene() {
  return (
    <SceneSection headingId="closed-title" bg="bg-question" className="scene-closed">
      <Heart className="heart-mark closed-heart" aria-hidden="true" />
      <h2 id="closed-title" className="display display-sm">
        {content.closed.text}
      </h2>
      <p className="letter-signature">{content.sender}</p>
    </SceneSection>
  );
}
