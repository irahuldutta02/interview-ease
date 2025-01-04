"use client";

import { Questions } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export const useGetQuestion = (
  name: string,
  email: string,
  numQuestions: number,
  interviewLevel: string,
  selectedSkills: string[]
) => {
  const [allQuestions, setAllQuestions] = useState<Questions[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setError(null);
      setLoading(true);

      const res = await axios.post("/api/generate-questions", {
        name,
        email,
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
