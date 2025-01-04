"use client";

import { Questions } from "@/types";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

export default function Report({
  allQuestions,
}: {
  allQuestions: Questions[];
}) {
  console.log({ allQuestions });

  return (
    <>
      {allQuestions.map((question, index) => (
        <div key={index} className="max-w-3xl mx-auto pt-16">
          <Card className="p-6">
            <div className="mb-8">
              <h2 className="text-xs sm:text-lg font-semibold text-muted-foreground mb-2">
                Question {index + 1} of {allQuestions?.length}{" "}
                <Badge className="ml-2" variant="secondary">
                  Overall Score : 5/10
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
                {question?.answer}
              </p>
            </div>
          </Card>
        </div>
      ))}
    </>
  );
}
