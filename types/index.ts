export interface Surah {
  id: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs?: Ayah[];
}

export interface Ayah {
  chapter: number;
  verse: number;
  text: string;
  translation: string;
}

export interface SearchResult {
  surahId: number;
  surahName: string;
  verseNumber: number;
  text: string;
  translation: string;
}

export interface UserSettings {
  arabicFont: string;
  arabicFontSize: number;
  translationFontSize: number;
  darkMode: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  total?: number;
}