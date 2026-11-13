'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { content } from '@/lib/content';
import { Petals } from '@/components/confession/petals';
import { MusicToggle } from '@/components/confession/music-toggle';
import {
  OpeningScene,
  LocketScene,
  QuestionScene,
  FinalQuestionScene,
  YesFinale,
  NoFinale,
  ClosedScene,
} from '@/components/confession/scenes';

/**
 * THE CONFESSION — a guided sequence from an opening to three questions to a
 * thoughtful ending. All state stays in memory: nothing is written to the URL,
 * storage, or any server.
 */
type SceneKey = 'opening' | 'locket' | 'q1' | 'q2' | 'q3' | 'yes' | 'no' | 'closed';

const SCENE_ANNOUNCE: Record<SceneKey, string> = {
  opening: `${content.opening.title} ${content.opening.cta}.`,
  locket: content.interstitial.srLabel,
  q1: `Question 1. ${content.questions[0].text}`,
  q2: `Question 2. ${content.questions[1].text}`,
  q3: `Question 3. ${content.finalQuestion.text} Both yes and no are equally available.`,
  yes: `A letter for you. ${content.letter.body}`,
  no: content.noEnding.body,
  closed: content.closed.text,
};

export default function Home() {
  const [active, setActive] = useState<SceneKey>('opening');
  const [mounted, setMounted] = useState<SceneKey[]>(['opening']);
  const [announcement, setAnnouncement] = useState('');
  const activeRef = useRef<SceneKey>('opening');
  const cleanupTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (cleanupTimer.current) window.clearTimeout(cleanupTimer.current);
    };
  }, []);

  const go = useCallback((next: SceneKey) => {
    if (next === activeRef.current) return;
    activeRef.current = next;

    // mount the new scene (old ones stay mounted through the crossfade,
    // keeping their internal state so the fade-out looks continuous)
    setMounted((m) => (m.includes(next) ? m : [...m, next]));
    setActive(next);
    setAnnouncement(SCENE_ANNOUNCE[next]);

    if (cleanupTimer.current) window.clearTimeout(cleanupTimer.current);
    cleanupTimer.current = window.setTimeout(() => {
      setMounted((m) => m.filter((k) => k === next));
      cleanupTimer.current = null;
    }, 900);
  }, []);

  function renderScene(key: SceneKey) {
    switch (key) {
      case 'opening':
        return <OpeningScene onOpen={() => go('locket')} />;
      case 'locket':
        return <LocketScene onDone={() => go('q1')} />;
      case 'q1':
        return <QuestionScene index={0} onYes={() => go('q2')} onProceed={() => go('q2')} />;
      case 'q2':
        return <QuestionScene index={1} onYes={() => go('q3')} onProceed={() => go('q3')} />;
      case 'q3':
        return (
          <FinalQuestionScene
            onAnswer={(answer) => go(answer === 'yes' ? 'yes' : 'no')}
          />
        );
      case 'yes':
        return <YesFinale onReplay={() => go('opening')} />;
      case 'no':
        return <NoFinale onClose={() => go('closed')} />;
      case 'closed':
        return <ClosedScene />;
    }
  }

  return (
    <main className="stage">
      <Petals />
      <MusicToggle />
      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>
      {mounted.map((key) => {
        const isActive = key === active;
        return (
          <div
            key={key}
            className={`scene-mount${isActive ? ' is-active' : ' is-leaving'}`}
            inert={!isActive}
          >
            {renderScene(key)}
          </div>
        );
      })}
    </main>
  );
}
