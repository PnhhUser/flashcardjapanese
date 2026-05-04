export interface Japanese {
  id: string;
  kanaType: number;
  meaning: string;
  note: string;
  reading: string;
  romaji: string;
  term: string;
  type: JapaneseType;
  typeface: Typeface;
}

export const Typeface = {
  Hiragana: 1,
  Katakana: 2,
  Kanji: 3,
} as const;

export type Typeface = (typeof Typeface)[keyof typeof Typeface];

export const JapaneseType = {
  Character: 1,
  Vocabulary: 2,
} as const;

export type JapaneseType = (typeof JapaneseType)[keyof typeof JapaneseType];
