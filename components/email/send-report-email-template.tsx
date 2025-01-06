import { Questions } from "@/types";
import * as React from "react";

interface EmailTemplateProps {
  name: string;
  evaluatedAnswers: Questions[];
}

export const SendReportEmailTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ name, evaluatedAnswers }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      color: "#333",
      maxWidth: "600px",
      margin: "0 auto",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      backgroundColor: "#f9f9f9",
    }}
  >
    {/* Header Section */}
    <div style={{ textAlign: "center", marginBottom: "40px" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://img.icons8.com/fluency/48/artificial-intelligence--v1.png"
        alt="InterviewEase Logo"
        style={{ width: "48px", height: "48px", marginBottom: "10px" }}
      />
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          margin: "0",
        }}
      >
        InterviewEase
      </h1>
      <p style={{ fontSize: "14px", color: "#555" }}>
        AI-Powered Interview Evaluation
      </p>
    </div>

    {/* Email Body */}
    <div style={{ marginBottom: "20px" }}>
      <h1
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Hi {name},
      </h1>
      <p style={{ fontSize: "16px", color: "#555", marginBottom: "20px" }}>
        Here is the evaluation report of your interview practice.
      </p>
    </div>

    {/* Questions Section */}
    {evaluatedAnswers.map((question, index) => (
      <div
        key={index}
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: "#fff",
          marginBottom: "20px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#555",
              marginBottom: "10px",
            }}
          >
            Question {index + 1} of {evaluatedAnswers.length}{" "}
            <span
              style={{
                marginLeft: "8px",
                padding: "4px 8px",
                borderRadius: "4px",
                backgroundColor:
                  (question?.score ?? 0) < 7 ? "#F87171" : "#34D399",
                color: "#000",
              }}
            >
              Overall Score: {question?.score}/10
            </span>
          </h2>
          <h1
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {question?.question}
          </h1>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <p>
            <span
              style={{
                fontWeight: "bold",
                color: "#F59E0B",
              }}
            >
              Your Answer:
            </span>{" "}
            {question?.answer}
          </p>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <p>
            <span
              style={{
                fontWeight: "bold",
                color: "#10B981",
              }}
            >
              Ideal Answer:
            </span>{" "}
            {question?.idealAnswer}
          </p>
        </div>

        <div>
          <p>
            <span
              style={{
                fontWeight: "bold",
                color: "#3B82F6",
              }}
            >
              Feedback:
            </span>{" "}
            {question?.feedback}
          </p>
        </div>
      </div>
    ))}

    {/* Footer Section */}
    <div style={{ textAlign: "center", marginTop: "40px", color: "#777" }}>
      <p style={{ fontSize: "14px" }}>
        Thank you for using InterviewEase. We’re here to help you improve!
      </p>
      <p style={{ fontSize: "12px", marginTop: "10px" }}>
        &copy; {new Date().getFullYear()} InterviewEase. All rights reserved.
      </p>
    </div>
  </div>
);
