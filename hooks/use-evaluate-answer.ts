"use client";

import { Questions } from "@/types";
import axios from "axios";
import { useState } from "react";

export const useEvaluateAnswer = (allQuestions: Questions[]) => {
  const [evaluatedAnswers, setEvaluatedAnswers] = useState<Questions[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const evaluateAnswers = async (currentQuestionId: number) => {
    try {
      setLoading(true);
      setError(null);

      const currentQuestion = allQuestions.filter(
        (question) => question.id === currentQuestionId
      );

      const res = await axios.post("/api/evaluate-answers", {
        allQuestions: currentQuestion,
      });

      const answer = res?.data?.data[0];
      const answerId = answer?.id;

      let newEvaluatedAnswers = evaluatedAnswers.filter(
        (answer) => answer.id !== answerId
      );

      newEvaluatedAnswers = [...newEvaluatedAnswers, answer];

      newEvaluatedAnswers.sort((a, b) => a.id - b.id);

      setEvaluatedAnswers(newEvaluatedAnswers);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    evaluatedAnswers,
    setEvaluatedAnswers,
    evaluateAnswers,
    loading,
    error,
  };
};
