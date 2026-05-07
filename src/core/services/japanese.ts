import { apiClient } from "../api/client";
import type { ApiResponse } from "../model/api";
import type { Japanese } from "../model/japanese";

const URL = "/v1/jp";

export const getHiragana = async () => {
  const res = await apiClient.get<ApiResponse<Japanese[]>>(`${URL}/hiragana`);

  return res.data;
};

export const getHiraganaVocabulary = async () => {
  const res = await apiClient.get<ApiResponse<Japanese[]>>(
    `${URL}/hiragana-vocabulary`,
  );

  return res.data;
};

export const getKatakanaVocabulary = async () => {
  const res = await apiClient.get<ApiResponse<Japanese[]>>(
    `${URL}/katana-vocabulary`,
  );

  return res.data;
};

export const getKanjiVocabulary = async () => {
  const res = await apiClient.get<ApiResponse<Japanese[]>>(
    `${URL}/kanji-vocabulary`,
  );

  return res.data;
};
