"use client";

import EvaluationError from "@/components/custom/EvaluationErrror";
import EvaluationLoader from "@/components/custom/EvaluationLoader";
import NoQuestionError from "@/components/custom/NoQuestionError";
import QuestionError from "@/components/custom/QuestionError";
import QuestionLoading from "@/components/custom/QuestionLoading";
import Report from "@/components/custom/Report";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useInterview } from "@/context/interview-provider";
import { useEvaluateAnswer } from "@/hooks/use-evaluate-answer";
import { useGetQuestion } from "@/hooks/use-get-question";
import useSpeechRecognition from "@/hooks/use-speech-recognition";

import {
  House,
  Mic,
  MicOff,
  RotateCcw,
  SendHorizontal,
  SquareArrowRight,
} from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function InterviewPage() {
  const { name, email, selectedSkills, numQuestions, interviewLevel } =
    useInterview();

  if (
    !name ||
    !email ||
    !numQuestions ||
    !interviewLevel ||
    selectedSkills.length === 0
  ) {
    redirect("/");
  }

  const { allQuestions, setAllQuestions, refetch, loading, error } =
    useGetQuestion(numQuestions, interviewLevel, selectedSkills);

  const {
    evaluatedAnswers,
    evaluateAnswers,
    setEvaluatedAnswers,
    loading: evaluationLoading,
    error: evaluationError,
  } = useEvaluateAnswer(allQuestions);

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRegenerate = () => {
    setIsRecording(false);
    setCurrentQuestion(1);
    setEvaluatedAnswers([]);
    setAllQuestions([]);
    refetch();
  };

  const handleNextQuestion = async () => {
    setIsRecording(false);
    setCurrentQuestion((prev) => prev + 1);
    await evaluateAnswers(currentQuestion);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleSubmit = async () => {
    setIsRecording(false);
    setSubmitted(true);
    await evaluateAnswers(currentQuestion);
  };

  const handleMoreQuestions = () => {
    redirect("/skills");
  };

  useSpeechRecognition({
    isRecording,
    setIsRecording,
    allQuestions,
    currentQuestion,
    setAllQuestions,
  });

  if (loading) {
    return <QuestionLoading />;
  }

  if (!loading && error) {
    return <QuestionError error={error} refetch={refetch} />;
  }

  if (!loading && !error && !allQuestions) {
    return <NoQuestionError refetch={refetch} />;
  }

  if (!loading && !error && allQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
        <div className="max-w-3xl mx-auto pt-16">
          <Card className="p-6 min-h-96 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold text-center">
              No questions found
            </h1>
            <p className="text-center text-muted-foreground">
              Please try again later
            </p>
            <div className="flex justify-center mt-4 gap-3">
              <Button
                className="flex items-center gap-2"
                onClick={() => refetch()}
              >
                <RotateCcw className="h-4 w-4" />
                Retry
              </Button>
              <Button
                className="flex items-center gap-2"
                onClick={() => redirect("/")}
              >
                <House className="h-4 w-4" />
                Home
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!loading && !error && allQuestions.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
        {!submitted && (
          <div className="max-w-3xl mx-auto pt-16">
            <Card className="p-6">
              <div className="mb-8">
                <h2 className="text-xs sm:text-lg font-semibold text-muted-foreground mb-2">
                  Question {currentQuestion} of {allQuestions.length}
                </h2>
                <h1 className="text-sm sm:text-xl font-bold">
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={handleRegenerate}
                          className="flex items-center gap-2"
                          variant="destructive"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Regenerate All Questions</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {currentQuestion < allQuestions.length && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={handleNextQuestion}
                            className="flex items-center gap-2"
                            disabled={
                              !allQuestions[currentQuestion - 1].answer ||
                              evaluationLoading
                            }
                          >
                            <SquareArrowRight className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Next Question</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {currentQuestion === allQuestions.length && (
                    <Button
                      variant="secondary"
                      onClick={handleSubmit}
                      className="flex items-center gap-2"
                      disabled={
                        !allQuestions[currentQuestion - 1].answer ||
                        evaluationLoading
                      }
                    >
                      Submit Answer
                      <SendHorizontal className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}

        {submitted && evaluationLoading && <EvaluationLoader />}

        {submitted && !evaluationLoading && evaluationError && (
          <EvaluationError evaluationError={evaluationError} />
        )}

        {submitted && !evaluationLoading && !evaluationError && (
          <Report
            evaluatedAnswers={evaluatedAnswers}
            handleMoreQuestions={handleMoreQuestions}
          />
        )}
      </div>
    );
  }
}
