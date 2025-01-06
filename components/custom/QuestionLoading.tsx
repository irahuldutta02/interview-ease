"use client";

import { Card } from "../ui/card";

export default function QuestionLoading() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
        <div className="max-w-3xl mx-auto pt-16">
          <Card className="p-6">
            <div className="mb-8 space-y-4 animate-pulse">
              {/* Question Progress Placeholder */}
              <div className="h-5 w-32 bg-muted-foreground rounded"></div>
              {/* Question Title Placeholder */}
              <div className="h-8 w-full bg-muted-foreground rounded"></div>
            </div>

            <div className="space-y-6">
              {/* Recording Button Placeholder */}
              <div className="flex items-center justify-between animate-pulse">
                <div className="h-10 w-40 bg-muted-foreground rounded"></div>
              </div>

              {/* Answer Textarea Placeholder */}
              <div className="h-48 bg-muted-foreground rounded animate-pulse"></div>

              {/* Navigation Buttons Placeholder */}
              <div className="flex justify-end gap-4 flex-wrap animate-pulse">
                <div className="h-10 w-32 bg-muted-foreground rounded"></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
