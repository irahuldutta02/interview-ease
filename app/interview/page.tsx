"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Send, SquareArrowRight } from "lucide-react";
import { useState } from "react";

type Questions = {
  id: number;
  question: string;
  answer?: string;
  idealAnswer?: string;
  mark?: number;
  outOf?: number;
};

export default function InterviewPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [allQuestions, setAllQuestions] = useState<Questions[]>([
    {
      id: 1,
      question:
        "Can you explain how you would handle a challenging situation with a difficult team member?",
    },
    {
      id: 2,
      question: "What is your biggest professional achievement?",
    },
    {
      id: 3,
      question: "What are your strengths and weaknesses?",
    },
    {
      id: 4,
      question: "Why do you want to work at our company?",
    },
    {
      id: 5,
      question: "Where do you see yourself in 5 years?",
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording logic
  };

  const handleSubmit = () => {
    // Here you would implement the answer submission logic
    console.log(allQuestions);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-3xl mx-auto pt-16">
        <Card className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-muted-foreground mb-2">
              Question {currentQuestion} of {allQuestions.length}
            </h2>
            <h1 className="text-2xl font-bold">
              {allQuestions.find((q) => q.id === currentQuestion)?.question}
            </h1>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button
                variant={isRecording ? "destructive" : "secondary"}
                onClick={toggleRecording}
                className="flex items-center gap-2"
              >
                {isRecording ? (
                  <>
                    <MicOff className="h-4 w-4" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4" />
                    Start Recording
                  </>
                )}
              </Button>
              {isRecording && (
                <div className="flex items-center gap-2">
                  <span className="animate-pulse text-destructive">●</span>
                  <span className="text-sm text-muted-foreground">
                    Recording...
                  </span>
                </div>
              )}
            </div>

            <Textarea
              value={allQuestions[currentQuestion - 1]?.answer || ""}
              onChange={(e) => {
                const updatedQuestions = allQuestions.map((q) =>
                  q.id === currentQuestion
                    ? { ...q, answer: e.target.value }
                    : q
                );
                setAllQuestions(updatedQuestions);
              }}
              disabled={isRecording}
              placeholder="Type your answer here..."
              className="min-h-[200px] resize-none"
            />

            <div className="flex justify-end gap-4 flex-wrap">
              {currentQuestion > 1 && (
                <Button
                  onClick={handlePreviousQuestion}
                  className="flex items-center gap-2"
                >
                  <SquareArrowRight className="h-4 w-4 transform rotate-180" />
                  Previous Question
                </Button>
              )}

              {currentQuestion < allQuestions.length && (
                <Button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2"
                  disabled={!allQuestions[currentQuestion - 1].answer}
                >
                  Next Question
                  <SquareArrowRight className="h-4 w-4" />
                </Button>
              )}
              {currentQuestion === allQuestions.length && (
                <Button
                  onClick={handleSubmit}
                  className="flex items-center gap-2"
                  disabled={!allQuestions[currentQuestion - 1].answer}
                >
                  Submit Answer
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
