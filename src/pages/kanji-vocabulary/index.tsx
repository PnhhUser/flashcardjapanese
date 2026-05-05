import { useCallback } from "react";

import { useApi } from "../../core/hooks/useApi";
import type { Japanese } from "../../core/model/japanese";
import Slide from "../../components/slide";
import Loading from "../../components/loading";
import { getKanjiVocabulary } from "../../core/services/japanese";

function KanjiVocabularyPage() {
  const vocabulary = useCallback(() => {
    return getKanjiVocabulary();
  }, []);

  const { data, loading } = useApi<Japanese[]>(vocabulary);

  return (
    <div className="flex h-screen items-center justify-center">
      {loading && <Loading />}

      {!loading && data && <Slide data={data} storageKey="kanji_vocab_index" />}
    </div>
  );
}

export default KanjiVocabularyPage;
