"use client";

import { Card } from "../ui/card";

export default function EvaluationLoader() {
  return (
    <>
      <div className="max-w-3xl mx-auto pt-12 animate-pulse">
        <Card className="p-6 mb-4">
          <div className="mb-8">
            <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>{" "}
            {/* Question number */}
            <div className="h-6 w-1/2 bg-gray-300 rounded"></div>{" "}
            {/* Question text */}
          </div>

          <div className="space-y-4">
            <div className="h-4 w-1/4 bg-yellow-200 rounded"></div>{" "}
            {/* Your Answer label */}
            <div className="h-6 w-full bg-gray-200 rounded"></div>{" "}
            {/* Placeholder for Your Answer */}
          </div>

          <div className="space-y-4 mt-2">
            <div className="h-4 w-1/4 bg-green-200 rounded"></div>{" "}
            {/* Ideal Answer label */}
            <div className="h-6 w-full bg-gray-200 rounded"></div>{" "}
            {/* Placeholder for Ideal Answer */}
          </div>

          <div className="space-y-4 mt-2">
            <div className="h-4 w-1/4 bg-blue-200 rounded"></div>{" "}
            {/* Ideal Answer label */}
            <div className="h-6 w-full bg-gray-200 rounded"></div>{" "}
            {/* Placeholder for Ideal Answer */}
          </div>
        </Card>
      </div>
    </>
  );
}
