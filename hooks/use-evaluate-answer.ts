"use client";

import { Questions } from "@/types";
import axios from "axios";
import { useState } from "react";

export const useEvaluateAnswer = (allQuestions: Questions[]) => {
  const [evaluatedAnswers, setEvaluatedAnswers] = useState<Questions[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const evaluateAnswers = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post("/api/evaluate-answers", {
        allQuestions,
      });

      setEvaluatedAnswers(res?.data?.data);
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
