"use client";

import { Input } from "@/components/ui/input";
import { useInterview } from "@/context/interview-provider";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { name, setName, email, setEmail } = useInterview();

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 flex flex-col items-center">
            <Image
              src="/interview_ease_logo.png"
              alt="Interview Ease Logo"
              width={100}
              height={100}
              className="rounded-lg"
            />
            <span className="mt-2 text-xl font-semibold">InterviewEase</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            AI-Powered Interview Practice
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Practice your interview skills with our AI-powered platform. Get
            real-time feedback and improve your chances of landing your dream
            job.
          </p>

          <div className="max-w-md mx-auto space-y-4 mb-8">
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Link
            href={name && email ? "/skills" : "#"}
            className={`inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors ${
              name && email
                ? "hover:bg-primary/90"
                : "opacity-50 cursor-not-allowed"
            }`}
          >
            Start Interview <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
