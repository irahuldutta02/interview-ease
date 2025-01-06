"use client";

import { Button } from "react-day-picker";
import { Card } from "../ui/card";
import { House, RotateCcw } from "lucide-react";
import { redirect } from "next/navigation";

export default function NoQuestionError({ refetch }: { refetch: () => void }) {
  return (
    <>
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
    </>
  );
}
