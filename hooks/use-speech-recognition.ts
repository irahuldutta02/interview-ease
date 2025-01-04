import { Questions } from "@/types";
import { useEffect } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition | undefined;
  }
}

interface Props {
  isRecording: boolean;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
  allQuestions: Questions[];
  currentQuestion: number;
  setAllQuestions: React.Dispatch<React.SetStateAction<Questions[]>>;
}

const useSpeechRecognition = ({
  isRecording,
  setIsRecording,
  allQuestions,
  currentQuestion,
  setAllQuestions,
}: Props) => {
  useEffect(() => {
    if (isRecording && window.webkitSpeechRecognition) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");

        const updatedQuestions = allQuestions.map((q) =>
          q.id === currentQuestion
            ? {
                ...q,
                answer: q.answer ? q.answer + " " + transcript : transcript,
              }
            : q
        );
        setAllQuestions(updatedQuestions);
      };

      return () => {
        recognition.stop();
      };
    }
  }, [
    isRecording,
    allQuestions,
    currentQuestion,
    setAllQuestions,
    setIsRecording,
  ]);
};

export default useSpeechRecognition;
