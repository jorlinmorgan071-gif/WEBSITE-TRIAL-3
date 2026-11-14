/**
 * ─────────────────────────────────────────────────────────────────────────
 *  THE CONFESSION — editable content slots
 *
 *  Morgan: everything you may want to personalize lives in THIS file.
 *  1. Edit the letter, the endings, the playful hints — keep them yours.
 *  2. Gallery: drop your real photos into `public/assets/` (gallery-01.webp
 *     style names are fine), set `placeholder: false` on each item and add
 *     your approved captions. Remove the placeholder note when done.
 *  3. Music: replace `public/assets/romantic-piano.mp3` with a track you
 *     have the right to use, or leave the generated one.
 *  4. Do not invent shared memories here — write only what is true.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface GalleryItem {
  /** Path under `public/`, root-relative, e.g. "/assets/gallery-01.webp"
   *  (the base path for sub-path hosting is added automatically) */
  src: string;
  /** Alt text describing the photo for screen readers */
  alt: string;
  /** Optional visible caption under the photo (Morgan-approved only) */
  caption: string | null;
  /** true = styled as a clearly-marked slot awaiting a real photo */
  placeholder: boolean;
}

export const content = {
  recipient: "Euralia",
  sender: "Morgan",

  opening: {
    overline: "A private letter, just for you",
    title: "A little something, just for you.",
    subtitle:
      "Not a website, really — more of a letter. A few quiet questions, and something I have been carrying with me.",
    cta: "Open my letter",
  },

  interstitial: {
    srLabel: "Opening your letter",
    caption: "opening…",
  },

  /** Questions 1 and 2 — the playful “No” gag (accessible fallback included) */
  questions: [
    {
      text: "I have something I've been wanting to ask you... Are you ready to hear it?",
      yesLabel: "Yes",
      noLabel: "No",
      playfulNo: true,
      playfulHint: "That button seems a little shy today.",
      fallbackLabel: "Okay, let me hear it",
    },
    {
      text: "Do you love me too?",
      yesLabel: "Yes",
      noLabel: "No",
      playfulNo: true,
      playfulHint: "It's alright — you can just tell me.",
      fallbackLabel: "Skip this playful bit",
    },
  ],

  /** Question 3 — the real question. Yes and No are equal, final and respected. */
  finalQuestion: {
    text: "Would you want us to start planning a family together next year?",
    note: "Take your time. Either answer is okay — and either answer will be respected.",
    yesLabel: "Yes",
    noLabel: "No",
  },

  /** The love letter shown after a Yes (placeholder copy — make it yours) */
  letter: {
    overline: "for you,",
    title: "A letter for you",
    body:
      "Euralia, I wanted to make this moment feel a little different because you matter to me. " +
      "I made this small space to ask you something honestly, with care and with no pressure. " +
      "Whatever your answer is, thank you for hearing me out.",
    signature: "— Morgan",
    /** Small line above the signature — optional, set to null to hide */
    closing: null,
  },

  /** The kind, quiet ending shown after a No. No confetti, no retry, no pressure. */
  noEnding: {
    body:
      "Thank you for being honest with me, Euralia. I respect your answer, " +
      "and I'm glad you felt able to tell me. No pressure, and no hard feelings.",
    signature: "— Morgan",
  },

  /** Quiet screen after closing the kind ending */
  closed: {
    text: "Take care,",
  },

  /** Optional memory gallery (shown only in the Yes ending) */
  gallery: {
    enabled: true,
    heading: "A place for our memories",
    /** Morgan — remove this note once you add real photos */
    note: "Gentle placeholder frames, waiting for real photos — see the README.",
    items: [
      {
        src: "/assets/gallery-01.webp",
        alt: "Placeholder memory frame: a sunlit windowsill with a small vase of baby's-breath flowers",
        caption: null,
        placeholder: true,
      },
      {
        src: "/assets/gallery-02.webp",
        alt: "Placeholder memory frame: two coffee cups and macarons on a cafe table by a window",
        caption: null,
        placeholder: true,
      },
      {
        src: "/assets/gallery-03.webp",
        alt: "Placeholder memory frame: a park bench beneath blossom branches with scattered petals",
        caption: null,
        placeholder: true,
      },
    ] as GalleryItem[],
  },
} as const;

export type Content = typeof content;
