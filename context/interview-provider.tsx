"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface InterviewContextProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  numQuestions: number;
  setNumQuestions: (numQuestions: number) => void;
  interviewLevel: string;
  setInterviewLevel: (interviewLevel: string) => void;
}

const InterviewContext = createContext<InterviewContextProps | undefined>(
  undefined
);

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  return context;
};

interface InterviewProviderProps {
  children: ReactNode;
}

export const InterviewProvider: React.FC<InterviewProviderProps> = ({
  children,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [interviewLevel, setInterviewLevel] = useState<string>("basic");

  return (
    <InterviewContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        selectedSkills,
        setSelectedSkills,
        inputValue,
        setInputValue,
        numQuestions,
        setNumQuestions,
        interviewLevel,
        setInterviewLevel,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};
