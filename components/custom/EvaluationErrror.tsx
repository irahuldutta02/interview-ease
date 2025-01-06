"use client";

import { House } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "react-day-picker";
import { Card } from "../ui/card";

export default function EvaluationError({
  evaluationError,
}: {
  evaluationError: string;
}) {
  return (
    <>
      <div className="max-w-3xl mx-auto pt-16">
        <Card className="p-6 min-h-96 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold text-center text-destructive">
            Error evaluating answers
          </h1>
          <p className="text-center text-muted-foreground">{evaluationError}</p>
          <div className="flex justify-center mt-4 gap-3">
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
    </>
  );
}
