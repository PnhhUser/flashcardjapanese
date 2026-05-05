import { Navigate, Route, Routes } from "react-router";
import App from "./App";
import HiraganaSyllablePage from "./pages/hiragana-syllable";
import NotFoundPage from "./NotFoundPage";
import HiraganaVocabularyPage from "./pages/hiragana-vocabulary";
import KatakanaVocabularyPage from "./pages/katakana-vocabulary";
import KanjiVocabularyPage from "./pages/kanji-vocabulary";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/hiragana-syllable" replace />} />

        <Route path="hiragana-syllable" element={<HiraganaSyllablePage />} />
        <Route
          path="hiragana-vocabulary"
          element={<HiraganaVocabularyPage />}
        />
        <Route
          path="katakana-vocabulary"
          element={<KatakanaVocabularyPage />}
        />
        <Route path="kanji-vocabulary" element={<KanjiVocabularyPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
