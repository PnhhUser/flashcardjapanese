import { apiClient } from "../api/client";
import type { ApiResponse } from "../model/api";
import type { Japanese } from "../model/japanese";

export const getHiragana = async () => {
  const res = await apiClient.get<ApiResponse<Japanese[]>>("/jp/hiragana");

  return res.data;
};

export const getHiraganaVocabulary = async () => {
  const res = await apiClient.get<ApiResponse<Japanese[]>>(
    "/jp/hiragana-vocabulary",
  );

  return res.data;
};

export const getKatakanaVocabulary = async () => {
  const res = await apiClient.get<ApiResponse<Japanese[]>>(
    "/jp/katakana-vocabulary",
  );

  return res.data;
};

export const getKanjiVocabulary = async () => {
  const res = await apiClient.get<ApiResponse<Japanese[]>>(
    "/jp/kanji-vocabulary",
  );

  return res.data;
};
