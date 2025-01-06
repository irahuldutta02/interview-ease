"use client";

import { Questions } from "@/types";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { useInterview } from "@/context/interview-provider";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Report({
  evaluatedAnswers,
  handleMoreQuestions,
}: {
  evaluatedAnswers: Questions[];
  handleMoreQuestions: () => void;
}) {
  const { name, email } = useInterview();
  const { toast } = useToast();

  const [emailSending, setEmailSending] = useState(false);

  const handleEmailReport = async () => {
    try {
      setEmailSending(true);
      const body = {
        name: name,
        email: email,
        evaluatedAnswers: evaluatedAnswers,
      };

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast({
          title: "Email Sent",
          description: "Your report has been sent to your email.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <>
      {evaluatedAnswers.map((question, index) => (
        <div key={index} className="max-w-3xl mx-auto pt-12">
          <Card className="p-6">
            <div className="mb-8">
              <h2 className="text-xs sm:text-lg font-semibold text-muted-foreground mb-2">
                Question {index + 1} of {evaluatedAnswers?.length}{" "}
                <Badge
                  className={`ml-2 ${
                    (question?.score ?? 0) < 7
                      ? "bg-red-400 text-black"
                      : "bg-green-400 text-black"
                  }`}
                  variant="secondary"
                >
                  Overall Score : {question?.score}/10
                </Badge>
              </h2>
              <h1 className="text-sm sm:text-xl font-bold">
                {question?.question}
              </h1>
            </div>

            <div className="space-y-4">
              <p>
                <span className="font-semibold text-yellow-500">
                  Your Answer:
                </span>{" "}
                {question?.answer}
              </p>
            </div>

            <div className="space-y-4 mt-2">
              <p>
                <span className="font-semibold text-green-500">
                  Ideal Answer:
                </span>{" "}
                {question?.idealAnswer}
              </p>
            </div>

            <div className="space-y-4 mt-2">
              <p>
                <span className="font-semibold text-blue-500">Feedback:</span>{" "}
                {question?.feedback}
              </p>
            </div>
          </Card>
        </div>
      ))}

      <div className="flex justify-center mt-8 gap-4 flex-wrap">
        <button
          onClick={handleEmailReport}
          className="bg-primary-foreground text-white py-2 px-4 rounded-md"
          disabled={emailSending}
        >
          {emailSending ? "Sending Email..." : "Email Report"}
        </button>
        <button
          onClick={handleMoreQuestions}
          className="bg-primary-foreground text-white py-2 px-4 rounded-md"
        >
          More Questions
        </button>
      </div>
    </>
  );
}
