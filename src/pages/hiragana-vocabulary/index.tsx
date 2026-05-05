import { useCallback } from "react";
import { getHiraganaVocabulary } from "../../core/services/japanese";
import { useApi } from "../../core/hooks/useApi";
import type { Japanese } from "../../core/model/japanese";
import Slide from "../../components/slide";
import Loading from "../../components/loading";

function HiraganaVocabularyPage() {
  const vocabulary = useCallback(() => {
    return getHiraganaVocabulary();
  }, []);

  const { data, loading } = useApi<Japanese[]>(vocabulary);

  return (
    <div className="flex h-screen items-center justify-center">
      {loading && <Loading />}

      {!loading && data && (
        <Slide data={data} storageKey="hiragana_vocab_index" />
      )}
    </div>
  );
}

export default HiraganaVocabularyPage;
