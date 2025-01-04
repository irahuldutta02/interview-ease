"use client";

import { Questions } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export const useGetQuestion = (
  numQuestions: number,
  interviewLevel: string,
  selectedSkills: string[]
) => {
  const [allQuestions, setAllQuestions] = useState<Questions[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post("/api/generate-questions", {
        numQuestions,
        interviewLevel,
        selectedSkills,
      });

      setAllQuestions(res?.data?.data);
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

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { allQuestions, setAllQuestions, refetch, loading, error };
};
