import { AxiosResponse } from "axios";

import { McqResponseType } from "@/components/MCQSection/Context/MCQContextTypes";

import { api, authenticated } from ".";

export const getMcqs = async (
  paramsX: Record<string, any>,
): Promise<AxiosResponse<McqResponseType>> => {
  const { mock_test_id, ...params } = paramsX;
  return authenticated(api).get(`/mcq/questions/${mock_test_id}/`, {
    params,
  });
};

export const getMcqAnswers = async (params: Record<string, any>) => {
  return authenticated(api).get(`/mcq/answers/`, {
    params,
  });
};

export const createMcqUserScore = async (data: Record<string, any>) => {
  return authenticated(api).post(`/mcq/submit/`, data);
};

export const getAllTestsList = () => {
  return api.get("/mcq/mock-tests/");
};

export const getDailyChallenge = () => {
  return authenticated(api).get("/mcq/daily-challenge/");
};

export const submitDailyChallengeScore = (data: Record<string, any>) => {
  return authenticated(api).post("/mcq/daily-challenge/submit/", data);
};
