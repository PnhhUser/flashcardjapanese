import { apiClient } from "../api/client";
import type { ApiResponse } from "../model/api";
import type { Japanese } from "../model/japanese";

export const getHiragana = async () => {
  const res =
    await apiClient.get<ApiResponse<Japanese[]>>("/japanese/hiragana");

  return res.data;
};

export const getHiraganaVocabulary = async () => {
  const res = await apiClient.get<ApiResponse<Japanese[]>>(
    "/japanese/vocabulary",
  );

  return res.data;
};
