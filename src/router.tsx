import { Navigate, Route, Routes } from "react-router";
import App from "./App";
import Hiragana from "./pages/hiragana/hiragana";
import Katakana from "./pages/katakana/katakana";
import Syllable from "./pages/syllable/syllable";
import Vocabulary from "./pages/vocabulary/vocabulary";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/hiragana" replace />} />
        <Route path="hiragana" element={<Hiragana />} />
        <Route path="katakana" element={<Katakana />} />
      </Route>

      <Route path="hiragana/syllable" element={<Syllable />} />
      <Route path="hiragana/vocabulary" element={<Vocabulary />} />

      <Route path="katakana/syllable" element={<Syllable />} />
      <Route path="katakana/vocabulary" element={<Vocabulary />} />
    </Routes>
  );
};

export default AppRouter;
