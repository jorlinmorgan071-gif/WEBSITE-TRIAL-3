'use client';

import { useRef, useState } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { asset } from '@/lib/assets';

/**
 * Optional piano music — user-initiated only, never autoplays.
 * Visible play/mute toggle; handles unavailable audio gracefully.
 */
export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [musicOn, setMusicOn] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn) {
      audio.pause();
      setMusicOn(false);
      return;
    }
    try {
      // started strictly by this user gesture (click / keyboard activation)
      await audio.play();
      setMusicOn(true);
      setUnavailable(false);
    } catch {
      // missing file, blocked codec, or device limitation — stay silent
      setMusicOn(false);
      setUnavailable(true);
    }
  }

  return (
    <div className="music-wrap">
      <audio ref={audioRef} src={asset('/assets/romantic-piano.mp3')} loop preload="none" />
      <button
        type="button"
        onClick={toggleMusic}
        aria-pressed={musicOn}
        aria-label={musicOn ? 'Mute the piano music' : 'Play soft piano music'}
        title={musicOn ? 'Mute the piano music' : 'Play soft piano music'}
        className={`music-toggle${musicOn ? ' is-playing' : ''}`}
      >
        {musicOn ? <VolumeX aria-hidden="true" /> : <Music aria-hidden="true" />}
      </button>
      {unavailable && (
        <span role="status" aria-live="polite" className="music-note">
          music unavailable
        </span>
      )}
    </div>
  );
}
