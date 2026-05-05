import { useCallback } from "react";

import { useApi } from "../../core/hooks/useApi";
import type { Japanese } from "../../core/model/japanese";
import Slide from "../../components/slide";
import Loading from "../../components/loading";
import { getKatakanaVocabulary } from "../../core/services/japanese";

function KatakanaVocabularyPage() {
  const vocabulary = useCallback(() => {
    return getKatakanaVocabulary();
  }, []);

  const { data, loading } = useApi<Japanese[]>(vocabulary);

  return (
    <div className="flex h-screen items-center justify-center">
      {loading && <Loading />}

      {!loading && data && (
        <Slide data={data} storageKey="katakana_vocab_index" />
      )}
    </div>
  );
}

export default KatakanaVocabularyPage;
