"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInterview } from "@/context/interview-provider";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  const { name, setName, email, setEmail } = useInterview();

  const { toast } = useToast();

  const handleNext = () => {
    if (name && email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        redirect("/skills");
      } else {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Missing Details",
        description: "Please enter your name and email.",
        variant: "destructive",
      });
    }
  };

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

          <Button onClick={handleNext} disabled={!name || !email}>
            Start Interview <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}
