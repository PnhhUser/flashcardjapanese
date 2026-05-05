import { useCallback } from "react";
import { getHiragana } from "../../core/services/japanese";
import { useApi } from "../../core/hooks/useApi";
import type { Japanese } from "../../core/model/japanese";
import Slide from "../../components/slide";
import Loading from "../../components/loading";

function HiraganaSyllablePage() {
  const hiragana = useCallback(() => {
    return getHiragana();
  }, []);

  const { data, loading } = useApi<Japanese[]>(hiragana);

  return (
    <div className="flex h-screen items-center justify-center">
      {loading && <Loading />}

      {!loading && data && (
        <Slide data={data} storageKey="hiragana_syllable_index" />
      )}
    </div>
  );
}

export default HiraganaSyllablePage;
